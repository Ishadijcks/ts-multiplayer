import {IWallet} from "../../../interfaces/IWallet";

export class Wallet implements IWallet {
    money = 0;
    producerUpgradeBought = 0;

    gainMoney(amount: number) {
        this.money += amount;
    }
}
