import {Connection} from "typeorm";
import {Player} from "../entity/Player.entity";
import {Game} from "../game/Game";
import {LogoutEvent} from "./LogoutEvent";

let allEvents = require('../game');

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});

export class Sockets {
    public static ormConnection: Connection;
    public static game: Game

    public static init(game: Game, ormConnection: Connection, debug: boolean = false) {
        this.game = game;
        this.ormConnection = ormConnection;

        io.on('connection', async (socket) => {
            this.broadCastPlayerCount();
            socket.emit("money", 3)
            console.log('a user connected');

            socket.on('disconnect', async () => {
                console.log('disconnected');
                const logoutEvent = new LogoutEvent(game, socket)
                if (logoutEvent.player) {
                    console.log(`Player ${logoutEvent.player.userName} disconnected`);
                }
                try {
                    if (!logoutEvent.player || !logoutEvent.player.isLoggedIn) {
                        return;
                    }
                    await logoutEvent.callback();
                } catch (e) {
                    console.log(e.message)
                }
            });

            // Register all event to their socket channels.
            Object.values(allEvents).forEach((eventConstructor: any) => {
                let eventInstance = new eventConstructor(game, socket)
                socket.on(eventInstance.event, async (args) => {
                    if (debug) {
                        console.log("Player", eventInstance.socket.userName, "activated", eventInstance.event, "with arguments", args);
                    }
                    try {
                        const shouldUpdate = await eventInstance.callback(args || {})
                        if (shouldUpdate) {
                            this.updatePlayer(eventInstance.player);
                        }
                        await game.databaseManager.savePlayer(eventInstance.player);
                    } catch (e) {
                        eventInstance.emitError(e.message);
                    }
                });
            })
        });


        server.listen(3000, () => {
            console.log('listening on *:3000');
        });
    }

    public static updatePlayer(player: Player) {
        io.emit('game-state', player.serialized_diff());
    }

    public static broadCastPlayerCount() {
        io.emit('player-count', this.game.playerManager.getPlayerCount())
    }
}
