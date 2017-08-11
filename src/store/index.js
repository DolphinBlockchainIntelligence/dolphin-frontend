import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    assets: []
  },
  actions: {
    LOAD_ASSETS_LIST: function ({ commit }) {
      axios.get('http://178.218.115.169:8080/static/data/announceList.json', {
        headers: {'Cache-Control': 'private, max-age=0, no-cache'}
      }).then((response) => {
        commit('SET_ASSETS_LIST', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
  },
  mutations: {
    SET_ASSETS_LIST: (state, { list }) => {
      state.assets = list
    },
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
