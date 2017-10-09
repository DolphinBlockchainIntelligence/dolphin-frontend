import Vuex from 'vuex'
import axios from 'axios'
import _ from 'lodash'

const store = new Vuex.Store({
  state: {
    assets: [],
    widgets: [],
    pages: []
  },
  actions: {
    LOAD_REGISTER: function ({ commit }) {
      axios.get('/dashboard/apps', {
      }).then((response) => {
        const defaultId = 583449
        // widgets
        var widgets = response.data.widgets
        widgets = _.filter(widgets, (item) => {
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
