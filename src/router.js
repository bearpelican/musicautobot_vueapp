import Vue from 'vue'
import Router from 'vue-router'
import About from '@/views/About.vue'
import Predict from '@/views/Predict.vue'
import Sheet from '@/views/Sheet.vue'
import { shuffleSong } from '@/lib/songPresets'

Vue.use(Router)

var router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/',
      redirect: '/shuffle'
    },
    {
      path: '/shuffle',
      redirect: to => {
        const song = shuffleSong()
        return `/song/${song.sid}`
      }
    },
    {
      path: '/song/:sid',
      component: Predict
    },
    {
      path: '/song/:sid',
      component: Predict
    },
    {
      path: '/predict/:pid',
      component: Predict
    },
    {
      path: '/sheet',
      name: 'sheet',
      component: Sheet
    }
  ],
  mode: 'history',
  linkActiveClass: 'active' // active class for non-exact links.
})

export default router

router.beforeEach((to, from, next) => {
  // Redirect if path begins with a hash (ignore hashes later in path)
  if (to.redirectedFrom && to.redirectedFrom.substr(0, 2) === '/#') {
    const path = to.redirectedFrom.substr(2)
    // eslint-disable-next-line no-console
    console.log(`Rerouted from ${to.redirectedFrom} to ${path}`)
    next({ path, replace: true })
  } else {
    next()
  }
})
