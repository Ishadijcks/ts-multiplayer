import {IPlayer} from "./IPlayer";
import {Wallet} from "./features/wallet/Wallet";
import {Skills} from "./features/skills/Skills";

export class Player implements IPlayer {
    userName = "";
    userId = "";
    isLoggedIn = false;
    wallet = new Wallet();
    skills = new Skills();
}
