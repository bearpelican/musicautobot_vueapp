import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Api from './views/Api.vue'
import Predict from './views/Predict.vue'
import Sheet from './views/Sheet.vue'
import Midi from './views/Midi.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/api',
      name: 'api',
      component: Api
    },
    {
      path: '/predict',
      name: 'predict',
      component: Predict
    },
    {
      path: '/sheet',
      name: 'sheet',
      component: Sheet
    },
    {
      path: '/midi',
      name: 'midi',
      component: Midi
    }
  ]
})
