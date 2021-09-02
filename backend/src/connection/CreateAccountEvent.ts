import {IServerEvent} from "ts-multiplayer-common/interfaces/IServerEvent";
import {ServerEventName} from "ts-multiplayer-common/enums/ServerEventName";
import {ServerSocketEvent} from "ts-multiplayer-common/ServerSocketEvent";

export class CreateAccountEvent extends ServerSocketEvent implements IServerEvent {
    event = ServerEventName.CreateAccount;
    description = "Create a new account"
    args = "userName";

    async callback({userName} = {userName: ''}) {
        if (!userName) {
            throw new Error("Invalid username");
        }
        const existingPlayer = await this.game.databaseManager.loadPlayer(userName);
        if (existingPlayer) {
            throw new Error("Username already exists");
        }
        await this.game.databaseManager.createPlayer(userName)
        this.emitSuccess("Account created");
    }


}
