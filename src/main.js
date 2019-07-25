import Vue from 'vue'
import VueLodash from 'vue-lodash'

import App from './App.vue'
import router from './router'
import store from './store'

import './filters'

// vue material
import Vuetify from 'vuetify'

Vue.config.productionTip = false

const vuetifyOptions = { }
Vue.use(Vuetify)
Vue.use(VueLodash, {})

new Vue({
  router,
  store,
  render: h => h(App),
  vuetify: new Vuetify(vuetifyOptions)
}).$mount('#app')
