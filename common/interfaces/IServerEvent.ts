import {ServerEventName} from "../enums/ServerEventName";

export interface IServerEvent {
    event: ServerEventName;
    description: string;
    args: string;

    callback: (args) => void;

}
