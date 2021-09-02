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

    }


}
