<template>
  <div>
   Test ({{wallet.money}})
    <button @click="increase">Increase!</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Wallet} from "@/model/Wallet";
import {ServerEventName} from "ts-multiplayer-common/enums/ServerEventName";

export default Vue.extend({
  name: 'Wallet',
  props: {
    wallet: {
      type: Wallet,
      required: true
    },
  },
  methods: {
    increase() {
      console.log("sending", ServerEventName.IncreaseMoney)
      this.$socket.client.emit(ServerEventName.IncreaseMoney, {amount: 1})
    }
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
