import {IWallet} from "./IWallet";

export interface IPlayer {
    userName: string;
    userId: string;
    wallet: IWallet;
}
