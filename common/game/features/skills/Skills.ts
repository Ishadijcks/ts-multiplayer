import {ISkills} from "./ISkills";
import {DiscreteExpLevel} from "./DiscreteExpLevel";

export class Skills implements ISkills {
    public woodcutting = new DiscreteExpLevel(10, [0, 10, 25, 50, 100, 250, 500, 1000, 2500, 50000])
    public mining = new DiscreteExpLevel(5, [0, 100, 200, 300, 400])

}
