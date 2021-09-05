import {IServerEvent} from "ts-multiplayer-common/interfaces/IServerEvent";
import {ServerEventName} from "ts-multiplayer-common/enums/ServerEventName";
import {FirebaseHelper} from "./FirebaseHelper";
import {LoginEvent} from "./LoginEvent";
import {ServerSocketEvent} from "./ServerSocketEvent";

export class CreateAccountEvent extends ServerSocketEvent implements IServerEvent {
    event = ServerEventName.CreateAccount;
    description = "Create a new account"
    args = "userName";

    async callback({userName, token} = {userName: '', token: ''}): Promise<boolean> {
        if (!userName) {
            throw new Error("Invalid username");
        }
        if (!token) {
            throw new Error("Invalid token when creating account");
        }
        const decodedToken = await FirebaseHelper.decodeToken(token);
        const uid = decodedToken.uid;
        const existingPlayer = await this.game.databaseManager.loadPlayer(uid);
        if (existingPlayer) {
            throw new Error("You already have an account registered");
        }
        await this.game.databaseManager.createPlayer(userName, uid)
        this.emitSuccess("Account created");

        const loginEvent = new LoginEvent(this.game, this.socket);
        await loginEvent.callback({token: token});
        return true;

    }


}
