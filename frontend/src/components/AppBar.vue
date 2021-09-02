<template>
  <div>
    <div class="p-4 flex flex-row justify-between items-center bg-red-300 h-16">
      <span>Players online: {{ playerCount }}</span>
      <span v-show="userName">Username: {{ userName }}</span>
      <span v-show="userId">Id: {{ userId }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Wallet extends Vue {
  @Prop({required: true}) private playerCount!: string;
  @Prop({required: true}) private userId!: string;
  @Prop({required: true}) private userName!: string;

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
