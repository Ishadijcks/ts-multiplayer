import {Socket} from "socket.io";
import {Player} from "ts-multiplayer/src/entity/Player.entity";
import {Game} from "ts-multiplayer/src/game/Game.entity";

export class ServerSocketEvent {
    public game: Game;

    constructor(public player: Player, public socket: Socket) {
        this.game = player.game;
    }
}
