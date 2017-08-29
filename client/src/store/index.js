import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    assets: [],
    widgets: [],
    sentimentsWidgets: [],
    pages: [],
    pageTitle: '',
    defaultId: 583449
  },
  actions: {
    LOAD_ASSETS_LIST: function ({ commit }) {
      axios.get('/dashboard/static/data/announceList.json', {
        // headers: {'Cache-Control': 'private, max-age=0, no-cache'}
      }).then((response) => {
        commit('SET_ASSETS_LIST', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_REGISTER: function ({ commit, state }) {
      axios.get('/dashboard/apps', {
      // axios.get('http://178.218.115.169:5000/dns.json', {
      }).then((response) => {
        // widgets
        var widgets = response.data.widgets
        widgets.forEach(function(item, i){
          item.i = i.toString()
          item.x = (i%2)*6
          item.y = i*10
          item.w = 6
          item.h = 10
          item.name = item.title.split(' ').join('')
        })
        commit('SET_WIDGETS_LIST', { list: widgets})
        // pages
        var pages = response.data.pages
        pages.forEach(function(item, i){
          item.id = item.title.toLowerCase().split(' ').join('-')
        })
        commit('SET_PAGES_LIST', { list: pages })
        // sentiments widgets
        var sentimentsWidgets = response.data.widgets
        sentimentsWidgets = _.filter(sentimentsWidgets, (item) => {
          return (item.url == '/#/sentiments-comments/' || item.url == '/#/sentiments-line-chart/') 
        })
        sentimentsWidgets.forEach(function(item, i){
          item.i = i.toString()
          item.x = 0
          item.y = i*10
          item.w = 12
          item.h = 10
          item.name = item.title.split(' ').join('')
          item.id = state.defaultId
        })
        commit('SET_SENTIMENTS_WIDGETS_LIST', { list: sentimentsWidgets})
      }, (err) => {
        console.log(err)
      })
    },
    TO_SET_PAGE_TITLE: ({ commit }, pageTitle) => {
      commit('SET_PAGE_TITLE', { pageTitle: pageTitle })
    }
  },
  mutations: {
    SET_ASSETS_LIST: (state, { list }) => {
      state.assets = list
    },
    SET_WIDGETS_LIST: (state, { list }) => {
      state.widgets = list
    },
    SET_SENTIMENTS_WIDGETS_LIST: (state, { list }) => {
      state.sentimentsWidgets = list
    },
    SET_PAGES_LIST: (state, { list }) => {
      state.pages = list
    },
    SET_PAGE_TITLE: (state, { pageTitle }) => {
      state.pageTitle = pageTitle
    }
  },
  getters: {
    fullAssetsList: (state, getters) => (id) => {
      if (state.assets.length !== 0) {
        return state.assets.filter((item) => {
          return item.announce.toLowerCase().indexOf(id.toLowerCase()) !== -1
        })
      }
    }
  }
})

export default store
