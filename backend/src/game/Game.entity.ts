import {Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Wallet} from "../entity/Wallet.entity";
import {Player} from "../entity/Player.entity";

@Entity()
export class Game {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => Player, player => player.game)
    player: Player;

    @OneToOne(type => Wallet, wallet => wallet.game, {
        cascade: true
    })
    @JoinColumn()
    wallet: Wallet;

}
