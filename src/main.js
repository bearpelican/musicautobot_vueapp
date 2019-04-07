import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueLodash from 'vue-lodash'

import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import router from './router'
import store from './store'

import './filters'

// bootstrap
import 'bootstrap/dist/css/bootstrap.css'

// vue material
import Vuetify from 'vuetify'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(Vuetify)
Vue.use(VueLodash, {})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
