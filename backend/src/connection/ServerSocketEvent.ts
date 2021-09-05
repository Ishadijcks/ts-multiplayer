import {Player} from "ts-multiplayer/src/entity/Player.entity";
import {Game} from "ts-multiplayer/src/game/Game";
import {ServerEventName} from "ts-multiplayer-common/enums/ServerEventName";
import {GameMessageType} from "ts-multiplayer-common/enums/GameMessageType";
import {IGameMessage} from "ts-multiplayer-common/interfaces/IGameMessage";
import {SocketWithUsername} from "ts-multiplayer/src/connection/SocketWithUsername";

export class ServerSocketEvent {
    public game: Game;
    public socket: SocketWithUsername;

    get player(): Player {
        return this.game.playerManager.getPlayer(this.socket.userName);
    }

    public setPlayer(player: Player) {
        if (!player) {
            this.socket.userName = null;
            this.socket.userId = null;
            return;
        }

        this.socket.userName = player.userName;
        this.socket.userId = player.userId;
    }


    constructor(game: Game, socket: SocketWithUsername) {
        this.game = game;
        this.socket = socket;
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
