import {IServerEvent} from "ts-multiplayer-common/interfaces/IServerEvent";
import {ServerEventName} from "ts-multiplayer-common/enums/ServerEventName";
import {ServerSocketEvent} from "ts-multiplayer-common/ServerSocketEvent";
import {FirebaseHelper} from "./FirebaseHelper";

export class CreateAccountEvent extends ServerSocketEvent implements IServerEvent {
    event = ServerEventName.CreateAccount;
    description = "Create a new account"
    args = "userName";

    async callback({userName, token} = {userName: '', token: ''}) {
        if (!userName) {
            throw new Error("Invalid username");
        }
        if (!token) {
            throw new Error("Invalid token");
        }
        FirebaseHelper.decodeToken(token).then(async token => {
            const uid = token.uid;
            const existingPlayer = await this.game.databaseManager.loadPlayer(uid);
            if (existingPlayer) {
                return;
            }
            await this.game.databaseManager.createPlayer(userName, uid)
            this.emitSuccess("Account created");
        })

    }


}
