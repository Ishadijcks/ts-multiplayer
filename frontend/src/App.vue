<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <WalletComponent :wallet="wallet"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import WalletComponent from '@/components/Wallet.vue';
import {Wallet} from "@/model/Wallet";

export default Vue.extend({
  name: 'App',
  components: {
    WalletComponent,
  },
  data() {
    return {
      wallet: new Wallet(),
    }
  },
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
