import {DatabaseManager} from "./DatabaseManager";
import {PlayerManager} from "./PlayerManager";
import {Player} from "../entity/Player.entity";
import {Sockets} from "../connection/Sockets";

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
            player.wallet.money++;
            this.databaseManager.savePlayer(player);
            Sockets.updatePlayer(player);
        })
    }

}
