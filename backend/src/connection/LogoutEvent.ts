import {IServerEvent} from "ts-multiplayer-common/interfaces/IServerEvent";
import {ServerEventName} from "ts-multiplayer-common/enums/ServerEventName";
import {ServerSocketEvent} from "ts-multiplayer-common/ServerSocketEvent";

export class LogoutEvent extends ServerSocketEvent implements IServerEvent {
    event = ServerEventName.Logout;
    description = "Log a user out"
    args = "userName";

    async callback({userName} = {userName: ''}) {
        if (!userName) {
            throw new Error("Invalid username");
        }
        const player = this.player;
        if (!player) {
            throw new Error(`Cannot logout player ${userName} as it is not logged in`)
        }
        if (!player.isLoggedIn) {
            throw new Error(`Cannot log player ${userName} out if not logged in`);
        }
        this.game.playerManager.removePlayer(player);
        player.lastSeen = new Date();
        player.isLoggedIn = false;
        await this.game.databaseManager.savePlayer(player);
    }


}
