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
    public static init() {
        io.on('connection', (socket) => {
            console.log('a user connected');
        });

        server.listen(3000, () => {
            console.log('listening on *:3000');
        });
    }
}
