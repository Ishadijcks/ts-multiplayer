<template>
  <div>
    <input type="text" v-model="userName">
    <button @click="login">Login!</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {ServerEventName} from "ts-multiplayer-common/enums/ServerEventName";

export default Vue.extend({
  name: 'Login',
  data() {
    return {
      userName: ''
    }
  },
  methods: {
    login() {
      this.$socket.client.emit(ServerEventName.Login, {userName: this.userName})
    }
  },

})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
