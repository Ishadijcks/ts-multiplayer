import {AfterLoad, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Player} from "../../../entity/Player.entity";
import {ISkills} from "ts-multiplayer-common/game/features/skills/ISkills";
import {ExpLevel} from "./ExpLevel.entity";
import {mining, woodcutting} from "ts-multiplayer-common/content";

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
    woodcutting: ExpLevel = new ExpLevel();

    @OneToOne(type => ExpLevel, expLevel => expLevel.skills, {
        cascade: true,
        eager: true
    })
    @JoinColumn()
    mining: ExpLevel = new ExpLevel();

    @AfterLoad()
    update() {
        // TODO load all balancing from a centralized place
        this.mining.maxLevel = mining.maxLevel;
        this.mining.expPerLevel = mining.expPerLevel;
        this.woodcutting.maxLevel = woodcutting.maxLevel
        this.woodcutting.expPerLevel = woodcutting.expPerLevel
    }

    tick(delta: number) {
        console.log(this.mining);
        console.log("mining level", this.mining.getLevel())
        this.woodcutting.gainExperience(1 * delta);
        this.mining.gainExperience(1 * delta);
    }
}

