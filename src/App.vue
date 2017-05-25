<template lang="pug">
#app
  b-navbar(toggleable='', type='inverse', variant='success')
    .container
      b-nav-toggle(target='nav_collapse')
      b-link.navbar-brand(to='/')
        span Dolphin BI
      b-collapse#nav_collapse(is-nav='')
        b-nav(is-nav-bar='')
          b-nav-item(to='/list') Coins list
          b-nav-item(to='#') Features
          b-nav-item(to='#') Team
          b-nav-item(to='#') Subscription
          b-nav-item(to='#') ICO
        b-nav.ml-auto(is-nav-bar='')
          b-nav-item-dropdown(text='Lang', right-alignment='', right='')
            b-dropdown-item(to='#') EN
            b-dropdown-item(to='#') 中文
            b-dropdown-item(to='#') RU
          b-nav-item-dropdown(right-alignment='', right='')
            template(slot='text')
              span(style='font-weight: bold;') User
            b-dropdown-item(to='#') Profile
            b-dropdown-item(to='#') Signout
  br
  router-view
  br
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
Vue.use(Vuex)
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'material-design-icons-iconfont'
export default {
  name: 'app'
}
</script>

<style lang="sass">
// #app
//   font-family: 'Avenir', Helvetica, Arial, sans-serif
//   -webkit-font-smoothing: antialiased
//   -moz-osx-font-smoothing: grayscale
//   text-align: center
//   color: #2c3e50
//   margin-top: 60px
</style>
