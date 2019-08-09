import Vue from 'vue'
import Router from 'vue-router'
import About from '@/views/About.vue'
import Predict from '@/views/Predict.vue'
import Sheet from '@/views/Sheet.vue'
import { shuffleSong } from '@/lib/songPresets'

Vue.use(Router)

export default new Router({
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
  linkActiveClass: 'active' // active class for non-exact links.
})
