// import Vue from 'vue'
// import Vuex from 'vuex'
// import axios from 'axios'
// Vue.use(Vuex)
//
// const store = new Vuex.Store({
//   state: {
//     widgets: [],
//     store: [],
//     count: 0,
//     projects: [],
//     todos: [
//       { id: 1, text: 'first', done: true },
//       { id: 2, text: 'second', done: false }
//     ]
//   },
//   actions: {
//     LOAD_PROJECT_LIST: function ({ commit }) {
//       axios.get('/static/data/projects.json').then((response) => {
//         commit('SET_PROJECT_LIST', { list: response.data })
//         console.log(response)
//       }, (err) => {
//         console.log(err)
//       })
//     },
//     addWidget ({ commit }) {
//       commit({
//         type: 'addWidget'
//       })
//     },
//     // incrementAsync ({ commit }) {
//     //   setTimeout(() => {
//     //     commit('increment')
//     //   }, 1000)
//     // }
//   },
//   mutations: {
//     addWidget (state) {
//       state.widgets.push('SentimentsLineChart')
//     },
//     increment (state) {
//       state.count++
//     },
//     SET_PROJECT_LIST: (state, { list }) => {
//       state.projects = list
//     }
//   },
//   getters: {
//     openProjects: state => {
//       return state.projects.filter(project => !project.completed)
//     },
//     doneTodos: state => {
//       return state.todos.filter(todo => todo.done)
//     },
//     doneTodosCount: (state, getters) => {
//       return getters.doneTodos.length
//     }
//   }
// })
//
// export default store
