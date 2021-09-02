import {Socket} from "socket.io";

export class SocketWithUsername extends Socket {
    userName: string;
    userId: string;
}
