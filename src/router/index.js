import Vue from 'vue'
import Router from 'vue-router'
import VueAnalytics from 'vue-analytics'
import Hello from '@/components/Hello'
import About from '@/components/About'
import List from '@/components/List'
import Coin from '@/components/Coin'

Vue.use(Router)
export default const router = new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/',
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

Vue.use(VueAnalytics, {
  id: 'UA-99587385-1',
  router
})
