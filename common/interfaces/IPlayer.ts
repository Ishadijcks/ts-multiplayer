import {IWallet} from "./IWallet";
import {ISkills} from "../game/features/skills/ISkills";

export interface IPlayer {
    userName: string;
    userId: string;
    wallet: IWallet;
    skills: ISkills;
}
