import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import {Wallet} from "./Wallet.entity";

@Entity()
export class Player {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @OneToOne(type => Wallet, wallet => wallet.player, {
        cascade: true
    })
    @JoinColumn()
    wallet: Wallet = new Wallet();


    constructor(userName: string) {
        this.userName = userName;
    }
}
