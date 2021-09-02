import {Global} from "@/model/Global";

export class SocketHelper {
    static client: any

    public static emit(channel: string, data: any = {}) {
        data.userName = Global.userName;
        this.client.emit(channel, data);
    }
}
