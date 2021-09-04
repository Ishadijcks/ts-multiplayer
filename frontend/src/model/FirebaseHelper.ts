import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import AuthUI = firebaseui.auth.AuthUI;
import User = firebase.User;
import {firebaseHelper} from "@/main";
import {SocketHelper} from "@/model/SocketHelper";
import {ServerEventName} from "ts-multiplayer-common/enums/ServerEventName";

export class FirebaseHelper {
    public ui: AuthUI;
    public user: User | null = null;
    public userSet = false;
    public token = "";
    public displayName = "";


    constructor() {
        const firebaseConfig = {
            apiKey: "AIzaSyBRZPmsOQRrKheKq2yUtHpymGm2z9KMOHQ",
            authDomain: "ts-multiplayer.firebaseapp.com",
            projectId: "ts-multiplayer",
            storageBucket: "ts-multiplayer.appspot.com",
            messagingSenderId: "775094910642",
            appId: "1:775094910642:web:d8ff8f0e33542c59f093ab"
        };

        // Initialize Firebase
        const app = firebase.initializeApp(firebaseConfig);

        this.ui = new firebaseui.auth.AuthUI(firebase.auth());

        this.ui.start('#firebaseui-auth-container', {
            callbacks: {
                signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                    const user = authResult.user;
                    const credential = authResult.credential;
                    const isNewUser = authResult.additionalUserInfo.isNewUser;
                    const providerId = authResult.additionalUserInfo.providerId;
                    const operationType = authResult.operationType;
                    // Do something with the returned AuthResult.
                    // Return type determines whether we continue the redirect
                    // automatically or whether we leave that to developer to handle.

                    firebaseHelper.updateUser()
                    return false;
                },
            },
            signInFlow: 'popup',
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ],
        });
    }

    public updateUser() {
        this.user = firebase.auth().currentUser;
        this.userSet = true;
        this.updateToken();
    }

    public updateToken() {
        const user = firebase.auth().currentUser;
        if(user) {
            user.getIdToken(true).then((idToken: string) => {
                this.token = idToken;
                console.log("token", this.token)
                SocketHelper.emit(ServerEventName.Login)
            }).catch(function (error: any) {
                // Handle error
            });
        }
    }
}
