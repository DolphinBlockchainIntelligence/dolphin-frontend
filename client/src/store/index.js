import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    assets: [],
    widgets: [],
    pages: [],
    user: false
  },
  actions: {
    LOAD_REGISTER: function ({ commit }) {
      axios.get('/dashboard/apps', {
      }).then((response) => {
        const defaultId = 583449
        // widgets
        var widgets = response.data.widgets
        widgets = widgets.filter((item) => {
          return (item.url.search(/sentiments/i) < 0)
        })
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
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_USER: function ({ commit }) {
      axios.get('/private/user/', {
      }).then((response) => {
        commit('SET_USER', { user: response.data })
      }, (err) => {
        console.log(err)
      })
      // commit('SET_USER', { user: {'_id': 'suenot'} })
    }
  },
  mutations: {
    SET_ASSETS_LIST: (state, { list }) => {
      state.assets = list
    },
    SET_WIDGETS_LIST: (state, { list }) => {
      state.widgets = list
    },
    SET_PAGES_LIST: (state, { list }) => {
      state.pages = list
    },
    SET_USER: (state, { user }) => {
      state.user = user
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
