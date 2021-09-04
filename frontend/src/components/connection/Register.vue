<template>
  <div>
    <div class="flex flex-row justify-center">
      <div class="my-16 w-72 flex flex-col border-2 p-4">
        <input class="input-primary" placeholder="username" type="text" v-model="Global.userName">
        <button class="btn btn-green" @click="create">Register!</button>
      </div>
    </div>
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
