import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import {Wallet} from "./Wallet";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @OneToOne(type => Wallet, wallet => wallet.user, {
        cascade: true
    })
    @JoinColumn()
    wallet: Wallet;


}
