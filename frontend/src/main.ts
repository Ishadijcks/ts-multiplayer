import Vue from 'vue'
import App from './App.vue'

import VueSocketIOExt from 'vue-socket.io-extended';
import { io } from 'socket.io-client';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

const socket = io('localhost:3000');
Vue.use(VueSocketIOExt, socket);
