import {Connection} from "typeorm";
import {Player} from "../entity/Player.entity";

export class DatabaseManager {

    connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
    }

    public async loadPlayer(userName: string): Promise<Player> {
        return await this.connection.manager.findOne(Player, {userName: userName});
    }

    createPlayer(userName: string) {
        const player = new Player(userName);
        return this.connection.manager.save(player)
    }

    savePlayer(player: Player) {
        return this.connection.manager.save(player)
    }
}
