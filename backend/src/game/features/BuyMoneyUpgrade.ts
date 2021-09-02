import {IServerEvent} from "ts-multiplayer-common/interfaces/IServerEvent";
import {ServerEventName} from "ts-multiplayer-common/enums/ServerEventName";
import {ServerSocketEvent} from "ts-multiplayer-common/ServerSocketEvent";

export class BuyMoneyUpgrade extends ServerSocketEvent implements IServerEvent {
    event = ServerEventName.BuyMoneyUpgrade;
    description = "buy a multiplier"
    args = "";

    async callback({} = {}): Promise<boolean> {
        if (this.player.wallet.money > 10) {
            this.player.wallet.money -= 10;
            this.player.wallet.producerUpgradeBought++;
        }

        return true;
    }


}
