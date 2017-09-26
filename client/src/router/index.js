import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Sentiments from '@/components/Sentiments'
import Sentiment from '@/components/Sentiment'
import ExpertsEvaluations from '@/components/ExpertsEvaluations'
import ExpertsEvaluationsAdd from '@/components/ExpertsEvaluationsAdd'
import Page from '@/components/Page'


Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/sentiments',
      name: 'Sentiments',
      component: Sentiments
    },
    {
      path: '/experts-evaluations',
      name: 'ExpertsEvaluations',
      component: ExpertsEvaluations
    },
    {
      path: '/experts-evaluations/add',
      name: 'ExpertsEvaluationsAdd',
      component: ExpertsEvaluationsAdd
    },
    {
      path: '/sentiment/:id',
      name: 'Sentiment',
      component: Sentiment,
      props: true,
      meta: { reuse: false }
    },
    {
      path: '/page/:id/',
      name: 'Page',
      component: Page,
      props: true,
      meta: { reuse: false }
    }
  ]
})
