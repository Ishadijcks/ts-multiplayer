import {firebaseHelper} from "@/main";

export class SocketHelper {
    static client: any

    public static emit(channel: string, data: any = {}) {
        if (!firebaseHelper.token) {
            console.error("Cannot emit anything if not logged in with firebase")
            return;
        }
        data.token = firebaseHelper.token;
        this.client.emit(channel, data);
    }
}
