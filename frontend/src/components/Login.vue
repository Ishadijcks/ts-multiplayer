<template>
  <div>
    <div id="firebaseui-auth-container"></div>
    <input type="text" v-model="Global.userName">

    <div v-if="!firebaseHelper.userSet">
      Not connected
    </div>
    <div v-else>Connected
      <button @click="login">Login!</button>

    </div>
    <button @click="create">Register!</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {ServerEventName} from "ts-multiplayer-common/enums/ServerEventName";
import {SocketHelper} from "@/model/SocketHelper";
import {Global} from "@/model/Global";
import {firebaseHelper} from "@/main";


export default Vue.extend({
  name: 'Login',
  data() {
    return {
      firebaseHelper: firebaseHelper,
      Global: Global,
    }
  },
  methods: {
    login() {
      SocketHelper.emit(ServerEventName.Login)
    },
    create() {
      SocketHelper.emit(ServerEventName.CreateAccount, {userName: Global.userName});
    }
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
