import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Auth from '@/components/Auth'
import Page from '@/components/Page'
import Listing from '@/components/Listing'
import Calendar from '@/components/Calendar'
import Project from '@/components/Project'
import ProjectAddEdit from '@/components/ProjectAddEdit'
import ExpertOpinionAdd from '@/components/ExpertOpinionAdd'
import UserProfile from '@/components/UserProfile'
import ExpertReviews from '@/components/ExpertReviews'
import ExpertFeedbacks from '@/components/ExpertFeedbacks'

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
      path: '/opinion/add/:_id/',
      name: 'ExpertOpinionAdd',
      component: ExpertOpinionAdd,
      props: true,
      meta: { reuse: false }
    },
    {
      path: '/profile/',
      name: 'User profile',
      component: UserProfile,
      props: true,
      meta: { reuse: false }
    },
    {
      path: '/expert/:_id/reviews/',
      name: 'ExpertReviews',
      component: ExpertReviews,
      props: true,
      meta: { reuse: false }
    },
    {
      path: '/expert/:_id/feedbacks/',
      name: 'ExpertFeedbacks',
      component: ExpertFeedbacks,
      props: true,
      meta: { reuse: false }
    }
  ]
})
