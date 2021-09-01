<template>
  <div>
   Test ({{wallet.money}})
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Wallet} from "@/model/Wallet";

export default Vue.extend({
  name: 'Wallet',
  props: {
    wallet: {
      type: Wallet,
      required: true
    },
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
