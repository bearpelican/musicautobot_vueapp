import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Predict from './views/Predict.vue'
import Sheet from './views/Sheet.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/about',
      name: 'about',
      component: Home
    },
    {
      path: '/',
      component: Predict
    },
    {
      path: '/song/:sid',
      name: 'song',
      component: Predict
    },
    {
      path: '/predict/:pid',
      name: 'predict',
      component: Predict
    },
    {
      path: '/sheet',
      name: 'sheet',
      component: Sheet
    }
  ]
})
