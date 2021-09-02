<template>
  <div id="app">
    <p>Player count {{playerCount}}</p>
    <Login></Login>
    <WalletComponent/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import WalletComponent from '@/components/Wallet.vue';
import Login from "@/components/Login.vue";
import {ServerEventName} from "ts-multiplayer-common/enums/ServerEventName";
import {SocketHelper} from "@/model/SocketHelper";

export default Vue.extend({
  name: 'App',
  components: {
    Login,
    WalletComponent,
  },
  data() {
    return {
      playerCount: 0
    }
  },
  mounted() {
    SocketHelper.client = this.$socket.client;
    // Subscribe in mounted to use variable topic names
    this.$socket.$subscribe(ServerEventName.GameMessage, (payload: any) => {
      console.log(payload.type, payload.content)
    });
    this.$socket.$subscribe('player-count', (payload: any) => {
      this.playerCount = payload
    });
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
