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
            player.wallet.tick(this.TICK_DURATION);
            player.skills.tick(this.TICK_DURATION);
            this.databaseManager.savePlayer(player);
            Sockets.updatePlayer(player);
        })
    }

    async logoutAllPlayers() {
        console.log("Logging out all players");
        for (const player of this.playerManager.onlinePlayers) {
            player.isLoggedIn = false;
            player.lastSeen = new Date();
            await this.databaseManager.savePlayer(player);
        }
    }
}
