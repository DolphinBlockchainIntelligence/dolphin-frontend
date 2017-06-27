import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing'
import LandingLite from '@/components/LandingLite'
import List from '@/components/List'
import Post from '@/components/Post'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/landing',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/',
      name: 'LandingLite',
      component: LandingLite
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/post/:id',
      name: 'Post',
      component: Post
    }
  ]
})
