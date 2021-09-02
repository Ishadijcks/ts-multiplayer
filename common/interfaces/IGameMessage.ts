import {GameMessageType} from "../enums/GameMessageType";

export interface IGameMessage {
    content: string;
    type: GameMessageType
}
