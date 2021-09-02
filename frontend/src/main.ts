import Vue from 'vue'
import App from './App.vue'

import {io} from 'socket.io-client';
import VueSocketIOExt from "vue-socket.io-extended";
import {FirebaseHelper} from "@/model/FirebaseHelper";
import './index.css'

export const firebaseHelper = new FirebaseHelper();

Vue.config.productionTip = false

const socket = io('localhost:3000');
Vue.use(VueSocketIOExt, socket);

new Vue({
    render: h => h(App),
}).$mount('#app')


