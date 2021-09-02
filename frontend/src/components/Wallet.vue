<template>
  <div>
    Money: ({{ wallet.money }}) ({{1 + wallet.producerUpgradeBought}}/s)
    <button class="btn" @click="increase">Upgrade (-10)</button>
  </div>
</template>

<script lang="ts">
import {ServerEventName} from "ts-multiplayer-common/enums/ServerEventName";
import {IWallet} from "ts-multiplayer-common/interfaces/IWallet";
import {SocketHelper} from "@/model/SocketHelper";
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Wallet extends Vue {
  @Prop({required : true}) private wallet!: IWallet;


  increase() {
    SocketHelper.emit(ServerEventName.BuyMoneyUpgrade, {amount: 3})
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
