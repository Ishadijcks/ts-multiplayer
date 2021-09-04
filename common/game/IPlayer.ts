import {IWallet} from "./features/wallet/IWallet";
import {ISkills} from "./features/skills/ISkills";

export interface IPlayer {
    userName: string;
    userId: string;
    isLoggedIn: boolean;
    wallet: IWallet;
    skills: ISkills;
}
