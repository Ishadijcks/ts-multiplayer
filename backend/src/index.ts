import "reflect-metadata";
import {Sockets} from "./connection/Sockets";
import {Connection, createConnection} from "typeorm";

createConnection().then((connection: Connection) => {

    Sockets.init(connection)

}).catch(error => console.log(error));

