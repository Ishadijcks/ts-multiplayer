<template>
  <div>
    <div class="p-4 flex flex-row justify-between items-center bg-red-300 h-16">
      <span class="flex flex-row justify-between space-x-2.5">

        <span class="flex flex-col">
          <img class="w-8 h-8" :src="require('@/assets/firebase.png')" alt="Firebase" title="Firebase"/>
          {{ firebaseConnected }}
        </span>
        <span class="flex flex-col">
          <img class="w-8 h-8" :src="require('@/assets/socketio.png')" alt="Socket" title="Socket"/>
          {{ socketConnected }}
        </span>
        <span class="flex flex-col justify-between">
          <span>Logged in</span>
          <span>{{ loggedIn }}</span>
</span>
      </span>

      <span>Players online: {{ playerCount }}</span>
      <span v-show="userName">Username: {{ userName }}</span>
      <span v-show="userId">Id: {{ userId }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class AppBar extends Vue {
  @Prop({required: true}) private socketConnected!: boolean;
  @Prop({required: true}) private firebaseConnected!: boolean;
  @Prop({required: true}) private loggedIn!: boolean;

  @Prop({required: true}) private playerCount!: string;
  @Prop({required: true}) private userId!: string;
  @Prop({required: true}) private userName!: string;
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
