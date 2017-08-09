import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Post from '@/components/Post'
import Store from '@/components/Store'
import Dashboard from '@/components/Dashboard'
import ICOFace from '@/components/ICOFace'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: List
    },
    {
      path: '/post/:id',
      name: 'Post',
      component: Post,
      props: true,
      meta: { reuse: false }
    },
    {
      path: '/store/',
      name: 'Store',
      component: Store
    },
    {
      path: '/dashboard/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/icoface/',
      name: 'ICOFace',
      component: ICOFace
    },
    {
      path: '/store/',
      name: 'Store',
      component: Store
    }
  ]
})
