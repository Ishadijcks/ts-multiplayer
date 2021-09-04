import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {IWallet} from "ts-multiplayer-common/game/features/wallet/IWallet";
import {Player} from "../../../entity/Player.entity";

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

    tick(delta: number) {
        this.money += delta * (1 + this.producerUpgradeBought);
    }

    serialize(): IWallet {
        return {
            producerUpgradeBought: this.producerUpgradeBought,
            money: this.money,
        }
    }
}

