<template>
  <div>
    <input type="text" v-model="Global.userName">
    <button @click="create">Register!</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {ServerEventName} from "ts-multiplayer-common/enums/ServerEventName";
import {SocketHelper} from "@/model/SocketHelper";
import {Global} from "@/model/Global";


export default Vue.extend({
  name: 'Register',
  data() {
    return {
      Global: Global,
    }
  },
  methods: {
    create() {
      SocketHelper.emit(ServerEventName.CreateAccount, {userName: Global.userName});
    }
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
