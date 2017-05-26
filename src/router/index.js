import Vue from 'vue'
import Router from 'vue-router'
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
