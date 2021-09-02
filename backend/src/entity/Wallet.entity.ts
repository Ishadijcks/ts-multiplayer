import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {IWallet} from "ts-multiplayer-common/interfaces/IWallet";
import {Player} from "./Player.entity";

@Entity()
export class Wallet implements IWallet {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => Player, player => player.wallet)
    player: Player;

    @Column()
    money: number = 0;

    @Column()
    producerUpgradeBought: number = 0;



    serialize(): IWallet {
        return {
            producerUpgradeBought: this.producerUpgradeBought,
            money: this.money,
        }
    }
}

