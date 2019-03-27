import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import router from './router'
import store from './store'

import './filters'

// bootstrap
import 'bootstrap/dist/css/bootstrap.css'

// vue material
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)

Vue.use(VueMaterial)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
