<template lang="pug">
#app
  main.main
    b-navbar(toggleable="", type="inverse", variant="success")
      .container
        b-nav-toggle(target="nav_collapse")
        b-link.navbar-brand(to="/")
          span Dolphin BI
        b-collapse#nav_collapse(is-nav="")
          b-nav(is-nav-bar="")
            b-nav-item(to="/list") BTT sentiments
            b-nav-item(href="/icoface") ICOface
    router-view
</template>

<script>
import $ from 'jquery'
import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.js'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'roboto-fontface'
import 'material-design-icons-iconfont'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
window.App = {
  name: 'app'
}
export default window.App
</script>

<style lang="sass">
body
  overflow-x: hidden
#app
  font-family: 'Roboto', sans-serif
  .navbar
    background-color: #3B1D7C !important
    position: relative
    z-index: 2
    &+div
      margin-top: 20px
.page-title
  margin-bottom: 20px
</style>
