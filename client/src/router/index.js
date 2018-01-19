import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Auth from '@/components/Auth'
import Page from '@/components/Page'
import Listing from '@/components/Listing'
import Calendar from '@/components/Calendar'
import Project from '@/components/Project'
import ProjectAddEdit from '@/components/ProjectAddEdit'
import ExpertEvaluationAdd from '@/components/ExpertEvaluationAdd'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/page/:id/',
      name: 'Page',
      component: Page,
      props: true,
      meta: { reuse: false }
    },
    {
      path: '/listing',
      name: 'Listing',
      component: Listing,
      props: true,
      meta: { reuse: false }
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar,
      props: true,
      meta: { reuse: false }
    },
    {
      path: '/project/:_id/',
      name: 'Project',
      component: Project,
      props: true,
      meta: { reuse: false }
    },
    // {
    //   path: '/project/add/',
    //   name: 'ProjectAddEdit',
    //   component: ProjectAddEdit,
    //   props: true,
    //   meta: { reuse: false }
    // }
    {
      path: '/project/edit/:_id/',
      name: 'ProjectAddEdit',
      component: ProjectAddEdit,
      props: true,
      meta: { reuse: false }
    },
    {
      path: '/evaluation/add/',
      name: 'ExpertEvaluationAdd',
      component: ExpertEvaluationAdd,
      props: true,
      meta: { reuse: false }
    }
  ]
})
