import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Wallet} from "../game/features/wallet/Wallet.entity";
import {IPlayer} from "ts-multiplayer-common/game/IPlayer";
import {Skills} from "../game/features/skills/Skills.entity";
import {Diff} from "ts-multiplayer-common/util/Diff";

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

    lastSerialized;

    serialize(): IPlayer {
        return {
            userName: this.userName,
            userId: this.userId,
            isLoggedIn: this.isLoggedIn,
            wallet: this.wallet.serialize(),
            skills: this.skills.serialize(),
        }

    }

    /**
     * Calculate the diff between this and the last serialization
     */
    serialized_diff() {
        const serialized = this.serialize();
        if (!this.lastSerialized) {
            this.lastSerialized = serialized;
            return serialized;
        }
        const diff = Diff.diff(this.lastSerialized, serialized);
        this.lastSerialized = serialized;
        return diff;
    }

}
