import {ServerEventName} from "../enums/ServerEventName";

export interface IServerEvent {
    event: ServerEventName;
    description: string;
    args: string;

    // Returns whether or not the player should be updated
    callback: (args) => Promise<boolean>;

}
