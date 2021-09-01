import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User, user => user.wallet)
    user: User;

    @Column()
    money: number = 0;
}

