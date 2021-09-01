import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import {Game} from "../game/Game.entity";

@Entity()
export class Player {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;


    @OneToOne(type => Game, game => game.player, {
        cascade: true
    })
    @JoinColumn()
    game: Game;

}
