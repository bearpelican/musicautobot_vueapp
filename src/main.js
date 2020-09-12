import Vue from 'vue'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

import App from './App.vue'
import router from './router'
import store from './store'

// vue material
import Vuetify from 'vuetify'

import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false

if (process.env.VUE_APP_GA_ID) {
  Vue.use(VueAnalytics, {
    id: process.env.VUE_APP_GA_ID,
    router: router,
    debug: {
      sendHitTask: process.env.NODE_ENV === 'production'
    }
  })
}

const vuetifyOptions = { }
Vue.use(Vuetify)
Vue.use(VueLodash, { name: 'custom', lodash: lodash })

new Vue({
  router,
  store,
  // created () {
  //   if (sessionStorage.redirect) {
  //     const redirect = sessionStorage.redirect
  //     delete sessionStorage.redirect
  //     this.$router.push(redirect)
  //   }
  // },
  render: h => h(App),
  vuetify: new Vuetify(vuetifyOptions)
}).$mount('#app')
