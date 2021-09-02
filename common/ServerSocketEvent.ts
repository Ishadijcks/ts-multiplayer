import {Socket} from "socket.io";
import {Player} from "ts-multiplayer/src/entity/Player.entity";
import {Game} from "ts-multiplayer/src/game/Game";
import {ServerEventName} from "./enums/ServerEventName";
import {GameMessageType} from "./enums/GameMessageType";
import {IGameMessage} from "./interfaces/IGameMessage";

export class ServerSocketEvent {
    public player: Player;
    public game: Game;
    public socket: Socket;


    constructor(game: Game, socket: Socket, userName: string) {
        this.game = game;
        this.socket = socket;
        this.player = this.game.playerManager.getPlayer(userName);
    }

    private emitMessage(message: IGameMessage) {
        this.socket.emit(ServerEventName.GameMessage, message)
    }

    public emitInfo(content: string) {
        this.emitMessage({
            content: content,
            type: GameMessageType.Info
        })
    }

    public emitSuccess(content: string) {
        this.emitMessage({
            content: content,
            type: GameMessageType.Success
        })
    }

    public emitWarning(content: string) {
        this.emitMessage({
            content: content,
            type: GameMessageType.Warning
        })
    }

    public emitError(content: string) {
        this.emitMessage({
            content: content,
            type: GameMessageType.Error
        })
    }
}
