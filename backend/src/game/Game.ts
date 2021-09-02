import {DatabaseManager} from "./DatabaseManager";
import {PlayerManager} from "./PlayerManager";
import {Player} from "../entity/Player.entity";

export class Game {
    readonly TICK_DURATION = 1 // second

    constructor(
        public databaseManager: DatabaseManager,
        public playerManager: PlayerManager,
    ) {
    }

    start() {
        setInterval(() => {
            this.tick()
        }, this.TICK_DURATION * 1000);
    }

    tick() {
        this.playerManager.onlinePlayers.forEach((player: Player) => {
            this.databaseManager.savePlayer(player);
        })
    }

}
