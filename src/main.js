import Vue from 'vue'
import App from './App'
import router from './router'
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

Vue.use(VueAnalytics, {
  id: 'UA-99587385-1',
  router
})
