import {DatabaseManager} from "./DatabaseManager";
import {PlayerManager} from "./PlayerManager";

export class Game {

    constructor(
        public databaseManager: DatabaseManager,
        public playerManager: PlayerManager,
    ) {
    }

}
