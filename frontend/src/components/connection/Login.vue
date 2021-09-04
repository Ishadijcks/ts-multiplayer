<template>
  <div>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {firebaseHelper} from "@/main";


export default Vue.extend({
  name: 'Login',
  data() {
    return {
      firebaseHelper: firebaseHelper,
    }
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
