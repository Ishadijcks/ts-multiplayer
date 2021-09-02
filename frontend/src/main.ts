import Vue from 'vue'
import App from './App.vue'

import { io } from 'socket.io-client';
import VueSocketIOExt from "vue-socket.io-extended";

Vue.config.productionTip = false

const socket = io('localhost:3000');
Vue.use(VueSocketIOExt, socket);

new Vue({
  render: h => h(App),
}).$mount('#app')


