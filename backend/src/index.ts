import "reflect-metadata";
import {createConnection} from "typeorm";
import {Player} from "./entity/Player.entity";
import {Sockets} from "./connection/Sockets";
import {Game} from "./game/Game.entity";
import {Wallet} from "./entity/Wallet.entity";

Sockets.init()


createConnection().then(async connection => {
    let player = new Player();
    player.name = "Isha";
    let game = new Game();
    game.wallet = new Wallet();
    player.game = game;

    return connection.manager.save(player)


}).catch(error => console.log(error));
