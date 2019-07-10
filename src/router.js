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
      alias: ['/song/:sid', '/predict/:pid'],
      component: Predict
    },
    {
      path: '/sheet',
      name: 'sheet',
      component: Sheet
    }
  ],
  linkActiveClass: 'active' // active class for non-exact links.
})
