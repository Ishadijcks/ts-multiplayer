<template>
  <div>
    <AppBar :player-count="playerCount" :user-id="player.userId" :user-name="player.userName"></AppBar>
    {{ player }}

    <div v-if="!isLoggedIn" class="">
      <Login></Login>
    </div>

    <div v-if="isLoggedIn">
      <Wallet :wallet="player.wallet"></Wallet>
    </div>

  </div>
</template>

<script lang="ts">
import Login from "@/components/connection/Login.vue";
import {ServerEventName} from "ts-multiplayer-common/enums/ServerEventName";
import {SocketHelper} from "@/model/SocketHelper";
import {IPlayer} from "ts-multiplayer-common/interfaces/IPlayer";
import AppBar from "@/components/AppBar.vue";
import Wallet from "@/components/Wallet.vue";

import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({
  components: {Wallet, Login, AppBar}
})
export default class App extends Vue {
  playerCount: number = 0;
  player: IPlayer = {} as IPlayer;

  get isLoggedIn() {
    return this.player.userName != null;
  }

  mounted() {
    SocketHelper.client = this.$socket.client;
    // Subscribe in mounted to use variable topic names
    this.$socket.$subscribe(ServerEventName.GameMessage, (payload: any) => {
      console.log(payload.type, payload.content)
    });
    this.$socket.$subscribe('player-count', (payload: any) => {
      this.playerCount = payload;
    });
    this.$socket.$subscribe('game-state', (newPlayer: IPlayer) => {
      this.player = newPlayer
    });
  }
}
</script>

<style>

</style>
