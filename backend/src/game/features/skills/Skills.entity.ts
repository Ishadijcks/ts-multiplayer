import {Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Player} from "../../../entity/Player.entity";
import {ISkills} from "ts-multiplayer-common/game/features/skills/ISkills";
import {ExpLevel} from "./ExpLevel.entity";

@Entity()
export class Skills implements ISkills {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => Player, player => player.skills)
    player: Player;

    serialize(): ISkills {
        return {
            woodcutting: this.woodcutting.serialize(),
            mining: this.mining.serialize(),
        }
    }

    @OneToOne(type => ExpLevel, expLevel => expLevel.skills, {
        cascade: true,
        eager: true
    })
    @JoinColumn()
    woodcutting: ExpLevel = new ExpLevel(3, [10, 100, 500], 0);

    @OneToOne(type => ExpLevel, expLevel => expLevel.skills, {
        cascade: true,
        eager: true
    })
    @JoinColumn()
    mining: ExpLevel = new ExpLevel(3, [10, 100, 500], 0);

    tick(delta: number) {
        this.woodcutting.gainExperience(1 * delta);
        this.mining.gainExperience(1 * delta);
    }
}

