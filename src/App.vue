<template lang="pug">
#app
  main.main
    b-navbar(toggleable='', type='inverse', variant='success')
      .container
        b-nav-toggle(target='nav_collapse')
        b-link.navbar-brand(to='/')
          span Dolphin BI
        b-collapse#nav_collapse(is-nav='')
          b-nav(is-nav-bar='')
            b-nav-item(to='/list') BTT sentiments (alpha)
    router-view
  //footer.footer
    .container
      .left
        span © 2017 Dolphin BI | <a href="https://docs.google.com/forms/d/e/1FAIpQLSd6mlhhRCTuMIsdi2kYZP8RjEO4w2ytpcVFtDnNXyLusfcnMA/viewform?fbzx=-2801639494221500400">Request Form</a> | <a href="#">BitcoinTalk</a>
      .right
        span Donate BTC: <a href="#">0000000000000000000000000000000000</a>
        br
        span Donate ETH: <a href="#">0x0000000000000000000000000000000000000000</a>
</template>

<script>
import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
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
@import './assets/sticky-footer.sass'
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

.footer
  padding: 10px 0
  margin-top: 10px
  font-size: 13px
  border-top: 1px solid #DDDDEE
  .container
    display: flex
    align-items: center
    .left
      flex: 1 0 auto
    .right
      text-align: right
</style>
