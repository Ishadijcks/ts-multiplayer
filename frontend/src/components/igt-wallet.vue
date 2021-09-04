<template>
  <div>
    <div class="m-2 p-2 flex flex-row items-center space-x-2">
      <span>Money: ({{ wallet.money }}) ({{ 1 + wallet.producerUpgradeBought }}/s)</span>
      <button class="btn btn-green" @click="increase">Upgrade (-10)</button>
    </div>
  </div>
</template>

<script lang="ts">
import {ServerEventName} from "ts-multiplayer-common/enums/ServerEventName";
import {SocketHelper} from "@/model/SocketHelper";
import {Component, Prop, Vue} from 'vue-property-decorator';
import {Wallet} from "ts-multiplayer-common/game/features/wallet/Wallet";

@Component
export default class IgtWallet extends Vue {
  @Prop({required: true}) private wallet!: Wallet;


  increase() {
    SocketHelper.emit(ServerEventName.BuyMoneyUpgrade, {amount: 3})
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
