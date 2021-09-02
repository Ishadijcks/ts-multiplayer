import {IServerEvent} from "ts-multiplayer-common/interfaces/IServerEvent";
import {ServerEventName} from "ts-multiplayer-common/enums/ServerEventName";
import {ServerSocketEvent} from "ts-multiplayer-common/ServerSocketEvent";

export class IncreaseMoneyEvent extends ServerSocketEvent implements IServerEvent {
    event = ServerEventName.IncreaseMoney;
    description = "Update the players money"
    args = "amount";

    async callback({amount} = {amount: 1}) {
        if (amount < 1) {
            throw new Error("Amount is too low")
        }
        this.player.wallet.money += amount;

        this.socket.emit('money', this.player.wallet.money);
    }


}
