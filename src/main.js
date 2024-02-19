import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue } from 'bootstrap-vue'
import VueYoutube from 'vue-youtube'
import VueParticles from 'vue-particles'

import Scrollspy from 'vue2-scrollspy';
var VueScrollTo = require('vue-scrollto');

Vue.config.productionTip = false
Vue.use(VueYoutube)
Vue.use(VueParticles)

Vue.use(Scrollspy);
Vue.use(VueScrollTo)
Vue.use(BootstrapVue)

import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
