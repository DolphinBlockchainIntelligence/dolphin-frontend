import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import About from '@/components/About'
import Landing from '@/components/Landing'
import List from '@/components/List'
import Coin from '@/components/Coin'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/coin/:id',
      name: 'Coin',
      component: Coin
    }
  ]
})
