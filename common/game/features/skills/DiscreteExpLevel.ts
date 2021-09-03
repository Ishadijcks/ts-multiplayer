import {IgtExpLevel} from "./IgtExpLevel";
import {IExpLevel} from "./IExpLevel";

/**
 * Implementation of IgtExpLevel that takes a list of exps needed for each level.
 */
export class DiscreteExpLevel extends IgtExpLevel {
    expPerLevel: number[]

    constructor(maxLevel: number, expPerLevel: number[], baseExp = 0) {
        super(maxLevel, baseExp);
        if (maxLevel !== expPerLevel.length) {
            throw new Error("MaxLevel is not equal to length of ExpPerLevel");
        }
        if (expPerLevel[expPerLevel.length - 1] !== Number.MAX_SAFE_INTEGER) {
            expPerLevel.push(Number.MAX_SAFE_INTEGER);
        }
        this.expPerLevel = expPerLevel;
    }

    getExpNeededForLevel(level: number): number {
        return this.expPerLevel[level - 1];
    }

}
