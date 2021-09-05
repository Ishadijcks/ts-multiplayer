import {IServerEvent} from "ts-multiplayer-common/interfaces/IServerEvent";
import {ServerEventName} from "ts-multiplayer-common/enums/ServerEventName";
import {FirebaseHelper} from "./FirebaseHelper";
import {ServerSocketEvent} from "./ServerSocketEvent";

export class LoginEvent extends ServerSocketEvent implements IServerEvent {
    event = ServerEventName.Login;
    description = "Log a user in"
    args = "token";

    async callback({token} = {token: ''}): Promise<boolean> {
        if (!token) {
            throw new Error("Invalid token");
        }
        const decodedToken = await FirebaseHelper.decodeToken(token);

        const uid = decodedToken.uid;
        const player = await this.game.databaseManager.loadPlayer(uid);
        if (!player) {
            throw new Error("Could not login");
        }

        if (player.isLoggedIn) {
            throw new Error(`Cannot log player ${player.userName} in twice`);
        }
        player.lastSeen = new Date();
        player.isLoggedIn = true;
        this.game.playerManager.addPlayer(player);
        this.setPlayer(player);
        console.log(`${new Date()} Player ${player.userName} logged in`)
        await this.game.databaseManager.savePlayer(player);
        this.emitSuccess("Login successful")
        return true;
    }
}
