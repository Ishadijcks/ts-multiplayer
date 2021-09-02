import {Socket} from "socket.io";
import {Player} from "ts-multiplayer/src/entity/Player.entity";
import {Game} from "ts-multiplayer/src/game/Game";

export class ServerSocketEvent {
    public player: Player;
    public game: Game;
    public socket: Socket;


    constructor(game: Game, socket: Socket, userName: string) {
        this.game = game;
        this.socket = socket;
        this.player = this.game.playerManager.getPlayer(userName);
    }
}
