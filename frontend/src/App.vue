<template>
  <div>
    <AppBar :player-count="playerCount" :user-id="player.userId" :user-name="player.userName"></AppBar>
    {{ player }}
    <div v-if="!player.isLoggedIn" class="">
      <Login></Login>
    </div>

    <div v-if="player.isLoggedIn">
      <IgtWallet :wallet="player.wallet"></IgtWallet>
      <IgtSkills :skills="player.skills"></IgtSkills>
    </div>
    <Register></Register>

  </div>
</template>

<script lang="ts">
import Login from "@/components/connection/Login.vue";
import {ServerEventName} from "ts-multiplayer-common/enums/ServerEventName";
import {SocketHelper} from "@/model/SocketHelper";
import {IPlayer} from "ts-multiplayer-common/interfaces/IPlayer";
import AppBar from "@/components/AppBar.vue";

import {Component, Vue, Watch} from 'vue-property-decorator';
import Register from "@/components/connection/Register.vue";
import IgtSkills from "@/components/igt-skills.vue";
import IgtWallet from "@/components/igt-wallet.vue";
import {player} from "ts-multiplayer-common/content";
import _ from "lodash";
import {firebaseHelper} from "@/main";

@Component({
  components: {IgtWallet, IgtSkills, Register, Login, AppBar}
})
export default class App extends Vue {
  playerCount = 0;
  player = player;

  @Watch('isSocketConnected')
  isSocketConnectedChanged(val: string, oldVal: string) {
    if (!val) {
      player.isLoggedIn = false;
    }
    if (val && firebaseHelper.userSet) {
      SocketHelper.emit(ServerEventName.Login)
    }
  }

  get isSocketConnected() {
    return this.$socket.connected
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
      this.isLoggedIn = true;
      this.player = _.merge(this.player, newPlayer);
    });
  }
}
</script>

<style>

</style>
