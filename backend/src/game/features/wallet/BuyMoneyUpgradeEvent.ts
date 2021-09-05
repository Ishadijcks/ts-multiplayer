import {IServerEvent} from "ts-multiplayer-common/interfaces/IServerEvent";
import {ServerEventName} from "ts-multiplayer-common/enums/ServerEventName";
import {ServerSocketEvent} from "../../../connection/ServerSocketEvent";

export class BuyMoneyUpgradeEvent extends ServerSocketEvent implements IServerEvent {
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
