import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import {Wallet} from "../game/features/wallet/Wallet.entity";
import {IPlayer} from "ts-multiplayer-common/interfaces/IPlayer";
import {Skills} from "../game/features/skills/Skills.entity";

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
        cascade: true,
        eager: true,
    })
    @JoinColumn()
    wallet: Wallet = new Wallet();

    @OneToOne(type => Skills, skills => skills.player, {
        cascade: true,
        eager: true,
    })
    @JoinColumn()
    skills: Skills = new Skills();


    serialize(): IPlayer {
        return {
            userName: this.userName,
            userId: this.userId,
            wallet: this.wallet.serialize(),
            skills: this.skills.serialize(),
        }
    }

    constructor(userName: string, userId: string) {
        this.userName = userName;
        this.userId = userId;
    }
}
