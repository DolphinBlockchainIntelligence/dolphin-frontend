import Vue from 'vue'
import Router from 'vue-router'
import LandingLite from '@/components/LandingLite'
import List from '@/components/List'
import Post from '@/components/Post'
import Face from '@/components/Face'

Vue.use(Router)
export default new Router({
  routes: [
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
    },
    {
      path: '/icoface',
      name: 'Face',
      component: Face
    }
  ]
})
