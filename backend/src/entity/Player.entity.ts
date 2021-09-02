import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import {Wallet} from "./Wallet.entity";

@Entity()
export class Player {

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


    constructor(userName: string, userId: string) {
        this.userName = userName;
        this.userId = userId;
    }
}
