import {IServerEvent} from "ts-multiplayer-common/interfaces/IServerEvent";
import {ServerEventName} from "ts-multiplayer-common/enums/ServerEventName";

export class IncreaseMoneyEvent implements IServerEvent {
    event: ServerEventName.IncreaseMoney;
    description = "Update the players money"
    args = "amount";

    async callback({amount} = {amount: 1}) {
        if (amount < 1) {
            throw new Error("Amount is too low")
        }


    }


}
