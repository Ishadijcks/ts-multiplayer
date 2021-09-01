import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {IWallet} from "ts-multiplayer-common/interfaces/IWallet";
import {Game} from "../game/Game.entity";

@Entity()
export class Wallet implements IWallet {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => Game, game => game.wallet)
    game: Game;

    @Column()
    money: number = 0;
}

