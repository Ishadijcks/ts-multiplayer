import "reflect-metadata";
import {Sockets} from "./connection/Sockets";
import {Connection, createConnection} from "typeorm";
import {Game} from "./game/Game";
import {DatabaseManager} from "./game/DatabaseManager";
import {PlayerManager} from "./game/PlayerManager";

createConnection().then((connection: Connection) => {

    const game = new Game(
        new DatabaseManager(connection),
        new PlayerManager(),
    )
    Sockets.init(game, connection, true)

}).catch(error => console.log(error));

