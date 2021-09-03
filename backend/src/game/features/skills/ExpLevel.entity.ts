import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {IExpLevel} from "ts-multiplayer-common/game/features/skills/IExpLevel";
import {Skills} from "./Skills.entity";
import {DiscreteExpLevel} from "ts-multiplayer-common/game/features/skills/DiscreteExpLevel";

@Entity()
export class ExpLevel extends DiscreteExpLevel implements IExpLevel {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => Skills)
    skills: Skills;

    @Column()
    exp: number;


    constructor(maxLevel: number = 0, expPerLevel: number[] = [], baseExp: number = 0) {
        super(maxLevel, expPerLevel, baseExp);
    }

    getExpNeededForLevel(level: number): number {
        return this.expPerLevel[level - 1];
    }

    serialize(): IExpLevel {
        return {
            exp: this.exp,
            expPerLevel: this.expPerLevel,
            maxLevel: this.maxLevel,
        }
    }

}

