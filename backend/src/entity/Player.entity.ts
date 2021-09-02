import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import {Wallet} from "./Wallet.entity";
import {IPlayer} from "ts-multiplayer-common/interfaces/IPlayer";

@Entity()
export class Player implements IPlayer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column() userId: string;

    @Column()
    userName: string;

    @Column()
    lastSeen: Date = new Date();

    @Column()
    isLoggedIn: boolean = false;

    @OneToOne(type => Wallet, wallet => wallet.player, {
        cascade: true
    })
    @JoinColumn()
    wallet: Wallet = new Wallet();


    serialize(): IPlayer {
        return {
            userName: this.userName,
            userId: this.userId,
            wallet: this.wallet.serialize(),
        }
    }

    constructor(userName: string, userId: string) {
        this.userName = userName;
        this.userId = userId;
    }
}
