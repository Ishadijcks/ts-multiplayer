import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {IExpLevel} from "ts-multiplayer-common/game/features/skills/IExpLevel";
import {Skills} from "./Skills.entity";

@Entity()
export class ExpLevel implements IExpLevel {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => Skills, skills => skills.woodcutting)
    skills: Skills;

    @Column()
    exp: number;
    expToLevel: number[];
    maxLevel: number;


    constructor(maxLevel: number, expToLevel: number[], exp: number = 0) {
        this.maxLevel = maxLevel;
        this.expToLevel = expToLevel;
        this.exp = exp;
    }

    serialize(): IExpLevel {
        return {
            exp: this.exp,
            expToLevel: this.expToLevel,
            maxLevel: this.maxLevel,
        }
    }


}

