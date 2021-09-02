import {Connection} from "typeorm";
import {Player} from "../entity/Player.entity";
import {Game} from "../game/Game";

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

    public static init(game: Game, ormConnection: Connection, debug: boolean = false) {
        this.ormConnection = ormConnection;

        io.on('connection', async (socket) => {
            socket.emit("money", 3)
            console.log('a user connected');

            const userName = 'isha'
            Object.values(allEvents).forEach((eventConstructor: any) => {

                let eventInstance = new eventConstructor(game, socket, userName)

                socket.on(eventInstance.event, async (args) => {
                    if (debug) {
                        console.log("Player", userName, "activated", eventInstance.event, "with arguments", args);
                    }
                    await eventInstance.callback(args || {})

                    const player = game.playerManager.getPlayer(userName);
                    await game.databaseManager.savePlayer(player);
                    return ormConnection.manager.save(player)
                });
            })

        });

        server.listen(3000, () => {
            console.log('listening on *:3000');
        });
    }
}
