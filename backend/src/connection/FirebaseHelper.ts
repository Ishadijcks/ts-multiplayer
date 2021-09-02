import * as admin from 'firebase-admin';
import DecodedIdToken = admin.auth.DecodedIdToken;
import UserRecord = admin.auth.UserRecord;

export class FirebaseHelper {

    private static databaseURL: string = "https://ts-multiplayer.firebaseio.com/";

    public static init() {
        if (process.env.HEROKU) {
            console.log("Running on Heroku");
            admin.initializeApp({
                credential: admin.credential.cert(JSON.parse(process.env.SERVICE_ACCOUNT_KEY)),
                databaseURL: this.databaseURL,
            });
        } else {
            console.log("Running locally");
            const serviceAccount = require("../../serviceAccountKey.json");
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: this.databaseURL,
            });
        }

    }

    public static decodeToken(idToken: string): Promise<DecodedIdToken> {
        if (typeof idToken !== "string") {
            return;
        }
        return admin.auth().verifyIdToken(idToken);

    }

    public static getUserRecordFromToken(token: DecodedIdToken): Promise<UserRecord> {
        return admin.auth().getUser(token.uid);
    }

    public static async getUserNamePromise(idToken: string): Promise<string> {
        return FirebaseHelper.decodeToken(idToken).then((token: DecodedIdToken) => {
            return FirebaseHelper.getUserRecordFromToken(token);
        }).then(function (userRecord: UserRecord) {
            return userRecord.displayName;
        }).catch(function (error) {
            console.log(error.message);
            return null;
        });
    }
}
