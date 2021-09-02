<template>
  <div>
    <input type="text" v-model="Global.userName">
    <button @click="login">Login!</button>
    <button @click="create">Register!</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {ServerEventName} from "ts-multiplayer-common/enums/ServerEventName";
import {SocketHelper} from "@/model/SocketHelper";
import {Global} from "@/model/Global";

export default Vue.extend({
  name: 'Login',
  data() {
    return {
      Global: Global
    }
  },
  methods: {
    login() {
      SocketHelper.emit(ServerEventName.Login)
    },
    create() {
      SocketHelper.emit(ServerEventName.CreateAccount);
    }
  },

})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
