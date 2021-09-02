import {Connection} from "typeorm";
import {Player} from "../entity/Player.entity";

export class DatabaseManager {

    connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
    }

    public async loadPlayer(userId: string): Promise<Player> {
        return await this.connection.manager.findOne(Player, {userId: userId}, {relations: ['wallet']});
    }

    createPlayer(userName: string, userId: string) {
        const player = new Player(userName, userId);
        return this.connection.manager.save(player)
    }

    savePlayer(player: Player) {
        return this.connection.manager.save(player)
    }
}
