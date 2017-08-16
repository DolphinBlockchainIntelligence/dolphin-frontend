import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import List from '@/components/List'
import Post from '@/components/Post'
import Store from '@/components/Store'
import ICOFace from '@/components/ICOFace'
import SentimentsComments from '@/components/widgets/SentimentsComments'
import SentimentsLineChart from '@/components/widgets/SentimentsLineChart'
import SentimentsPieChart from '@/components/widgets/SentimentsPieChart'
import ExpertsEvaluations from '@/components/widgets/ExpertsEvaluations'
import SentimentsBritechartsDonut from '@/components/widgets/SentimentsBritechartsDonut'
import SentimentsBritechartsLine from '@/components/widgets/SentimentsBritechartsLine'
import SentimentsBritechartsStackedArea from '@/components/widgets/SentimentsBritechartsStackedArea'



Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: List
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/sentiments-comments/:id',
      name: 'SentimentsComments',
      component: SentimentsComments,
      props: true,
      meta: { reuse: false }
    },
    {
      path: '/sentiments-line-chart/:id',
      name: 'SentimentsLineChart',
      component: SentimentsLineChart,
      props: true,
      meta: { reuse: false }
    },
    {
      path: '/sentiments-pie-chart/:id',
      name: 'SentimentsPieChart',
      component: SentimentsPieChart,
      props: true,
      meta: { reuse: false }
    },
    {
      path: '/experts-evaluations/:id',
      name: 'ExpertsEvaluations',
      component: ExpertsEvaluations,
      props: true,
      meta: { reuse: false }
    },
    {
      path: '/sentiments-britechart-donut/:id',
      name: 'SentimentsBritechartsDonut',
      component: SentimentsBritechartsDonut,
      props: true,
      meta: { reuse: false }
    },
    {
      path: '/sentiments-britechart-line/:id',
      name: 'SentimentsBritechartsLine',
      component: SentimentsBritechartsLine,
      props: true,
      meta: { reuse: false }
    },
    {
      path: '/sentiments-britechart-stacked-area/:id',
      name: 'SentimentsBritechartsStackedArea',
      component: SentimentsBritechartsStackedArea,
      props: true,
      meta: { reuse: false }
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
      path: '/icoface/',
      name: 'ICOFace',
      component: ICOFace
    }
  ]
})
