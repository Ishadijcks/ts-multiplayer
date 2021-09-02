import {IServerEvent} from "ts-multiplayer-common/interfaces/IServerEvent";
import {ServerEventName} from "ts-multiplayer-common/enums/ServerEventName";
import {ServerSocketEvent} from "ts-multiplayer-common/ServerSocketEvent";

export class LoginEvent extends ServerSocketEvent implements IServerEvent {
    event = ServerEventName.Login;
    description = "Log a user in"
    args = "userName";

    async callback({userName} = {userName: ''}) {
        if (!userName) {
            throw new Error("Invalid username");
        }
        const player = await this.game.databaseManager.loadPlayer(userName);
        if (!player) {
            throw new Error(`Player ${userName} does not exist`)
        }
        if (player.isLoggedIn) {
            throw new Error(`Cannot log player ${userName} in twice`);
        }
        player.lastSeen = new Date();
        player.isLoggedIn = true;
        this.game.playerManager.addPlayer(player);
        await this.game.databaseManager.savePlayer(player);
        this.emitSuccess("Login successful")
    }


}
