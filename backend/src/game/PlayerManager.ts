import {Player} from "../entity/Player.entity";

export class PlayerManager {
    onlinePlayers: Player[] = []


    constructor() {
    }

    addPlayer(player: Player) {
        if (this.onlinePlayers.includes(player)) {
            throw Error(`Player ${player.userName} is already online`)
        }
    }

    getPlayer(userName: string) {
        return this.onlinePlayers.find(player => {
            return player.userName === userName;
        })
    }
}
