<template>
  <div>
    <div class="p-4 flex flex-row justify-between items-center bg-red-300 h-16">
      <span>

    <span v-if="!firebaseHelper.userSet">
      Not connected
    </span>
    <span v-else>Connected</span>
      </span>
      <span>Players online: {{ playerCount }}</span>
      <span v-show="userName">Username: {{ userName }}</span>
      <span v-show="userId">Id: {{ userId }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {firebaseHelper} from "@/main";

@Component
export default class AppBar extends Vue {
  @Prop({required: true}) private playerCount!: string;
  @Prop({required: true}) private userId!: string;
  @Prop({required: true}) private userName!: string;

  firebaseHelper = firebaseHelper;

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
