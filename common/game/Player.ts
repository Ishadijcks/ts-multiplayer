import {IPlayer} from "../interfaces/IPlayer";
import {Wallet} from "./features/wallet/Wallet";
import {Skills} from "./features/skills/Skills";

export class Player implements IPlayer {
    userName = "";
    userId = "";
    wallet = new Wallet();
    skills = new Skills();
}
