<template>
  <div>
   Test ({{wallet.money}})
    <button @click="increase">Increase!</button>
  </div>
</template>

<script lang="ts">
import {Wallet} from "@/model/Wallet";
import {ServerEventName} from "ts-multiplayer-common/enums/ServerEventName";
import Vue from "vue";

export default Vue.extend({
  name: 'Wallet',
  data() {
    return {
      wallet: new Wallet()
    }
  },
  methods: {
    increase() {
      this.$socket.client.emit(ServerEventName.IncreaseMoney, {amount: 3})
    }
  },
  sockets: {
    money(amount: number) {
      this.$data.wallet.money = amount;
    }
  }

})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
