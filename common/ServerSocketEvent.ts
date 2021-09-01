import {PlayerEntity} from "ts-multiplayer/src/entity/Player";
import {Socket} from "socket.io";
import {GameEntity} from "ts-multiplayer/src/game/Game";

export class ServerSocketEvent {
    game: GameEntity;
    player: PlayerEntity
    socket: Socket


}
