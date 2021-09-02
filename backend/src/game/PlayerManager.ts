import {Player} from "../entity/Player.entity";
import {Sockets} from "../connection/Sockets";

export class PlayerManager {
    onlinePlayers: Player[] = []


    constructor() {
    }



    addPlayer(player: Player) {
        if (this.onlinePlayers.includes(player)) {
            throw Error(`Player ${player.userName} is already online`)
        }
        this.onlinePlayers.push(player);

        Sockets.broadCastPlayerCount();
    }

    getPlayer(userName: string) {
        return this.onlinePlayers.find(player => {
            return player.userName === userName;
        })
    }

    getPlayerCount(): number {
        return this.onlinePlayers.length;
    }

    removePlayer(player: Player) {
        const index = this.onlinePlayers.indexOf(player);
        if (index > -1) {
            this.onlinePlayers.splice(index, 1);
        }

        Sockets.broadCastPlayerCount();
    }
}
