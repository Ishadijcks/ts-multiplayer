<template>
  <div>
    <div id="firebaseui-auth-container"></div>
    <input type="text" v-model="Global.userName">
    <button @click="login">Login!</button>
    <button @click="create">Register!</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {ServerEventName} from "ts-multiplayer-common/enums/ServerEventName";
import {SocketHelper} from "@/model/SocketHelper";
import {Global} from "@/model/Global";

import firebase from 'firebase/app';
// or using ES6 imports:
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export default Vue.extend({
  name: 'Login',
  data() {
    return {
      Global: Global
    }
  },
  methods: {
    login() {
      SocketHelper.emit(ServerEventName.Login)
    },
    create() {
      SocketHelper.emit(ServerEventName.CreateAccount);
    }
  },
  mounted() {

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
    console.log(app);


    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    console.log(ui);
    ui.start('#firebaseui-auth-container', {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          var user = authResult.user;
          var credential = authResult.credential;
          var isNewUser = authResult.additionalUserInfo.isNewUser;
          var providerId = authResult.additionalUserInfo.providerId;
          var operationType = authResult.operationType;
          // Do something with the returned AuthResult.
          // Return type determines whether we continue the redirect
          // automatically or whether we leave that to developer to handle.
          console.log(user);
          return false;
        },
      },
      signInFlow: 'popup',

      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,

      ],
    });
    // console.log(ui);
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
