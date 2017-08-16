import Vue from 'vue'
import App from './App'
import router from './router'
import VueAnalytics from 'vue-analytics'
import store from './store'

Vue.config.productionTip = false

import VueReact from 'vue-react'
Vue.use(VueReact)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

Vue.use(VueAnalytics, {
  id: 'UA-99587385-1',
  router
})
