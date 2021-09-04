import {IServerEvent} from "ts-multiplayer-common/interfaces/IServerEvent";
import {ServerEventName} from "ts-multiplayer-common/enums/ServerEventName";
import {ServerSocketEvent} from "ts-multiplayer-common/ServerSocketEvent";
import {FirebaseHelper} from "./FirebaseHelper";

export class CreateAccountEvent extends ServerSocketEvent implements IServerEvent {
    event = ServerEventName.CreateAccount;
    description = "Create a new account"
    args = "userName";

    async callback({userName, token} = {userName: '', token: ''}): Promise<boolean> {
        if (!userName) {
            throw new Error("Invalid username");
        }
        if (!token) {
            throw new Error("Invalid token");
        }
        const decodedToken = await FirebaseHelper.decodeToken(token);
        const uid = decodedToken.uid;
        const existingPlayer = await this.game.databaseManager.loadPlayer(uid);
        if (existingPlayer) {
            throw new Error("You already have an account registered");
        }
        await this.game.databaseManager.createPlayer(userName, uid)
        this.emitSuccess("Account created");
        return true;

    }


}
