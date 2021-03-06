import "reflect-metadata";
import {Sockets} from "./connection/Sockets";
import {Connection, createConnection} from "typeorm";
import {Game} from "./game/Game";
import {DatabaseManager} from "./game/DatabaseManager";
import {PlayerManager} from "./game/PlayerManager";
import {FirebaseHelper} from "./connection/FirebaseHelper";

createConnection().then((connection: Connection) => {

    const game = new Game(
        new DatabaseManager(connection),
        new PlayerManager(),
    )
    Sockets.init(game, connection, true)
    FirebaseHelper.init();
    game.start();

    process.on('SIGINT', async function () {
        console.log("Shutting down...")
        game.logoutAllPlayers().then(() => {
            process.exit();
        });
    });
}).catch(error => console.log(error));

