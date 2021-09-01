import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {IWallet} from "ts-multiplayer-common/interfaces/IWallet";

@Entity()
export class Wallet extends IWallet {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User, user => user.wallet)
    user: User;

    @Column()
    money: number = 0;
}

