import {ServerEventName} from "ts-multiplayer-common/enums/ServerEventName";
import {Connection, createConnection} from "typeorm";
import {Player} from "../entity/Player.entity";
import {Game} from "../game/Game.entity";
import {Wallet} from "../entity/Wallet.entity";
import {IncreaseMoneyEvent} from "../game/features/IncreaseMoneyEvent";

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

    public static init(ormConnection: Connection) {
        this.ormConnection = ormConnection;

        io.on('connection', (socket) => {
            console.log('a user connected');
            socket.on('money/increase', async (socket) => {
                let player = await this.ormConnection.manager.findOne(Player, 1, {relations: ["game", "game.wallet"]});

                let event = new IncreaseMoneyEvent(player, socket)
                await event.callback({amount: 1})
                return ormConnection.manager.save(player)
            });
        });

        server.listen(3000, () => {
            console.log('listening on *:3000');
        });
    }
}
