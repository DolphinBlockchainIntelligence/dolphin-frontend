import Vue from 'vue'
import App from './App'
import router from './router'
import VueAnalytics from 'vue-analytics'
import store from './store'
import Materials from 'vue-materials'
Vue.use(Materials)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

Vue.use(VueAnalytics, {
  id: 'UA-96940785-3',
  router
})
