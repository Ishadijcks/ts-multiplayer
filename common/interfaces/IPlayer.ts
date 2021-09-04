import {IWallet} from "./IWallet";
import {ISkills} from "../game/features/skills/ISkills";

export interface IPlayer {
    userName: string;
    userId: string;
    isLoggedIn: boolean;
    wallet: IWallet;
    skills: ISkills;
}
