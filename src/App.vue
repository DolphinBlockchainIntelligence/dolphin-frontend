<template>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer
              mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <span class="mdl-layout-title">Coin</span>
        <div class="mdl-layout-spacer"></div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable
                    mdl-textfield--floating-label mdl-textfield--align-right">
          <label class="mdl-button mdl-js-button mdl-button--icon"
                 for="fixed-header-drawer-exp">
            <i class="material-icons">search</i>
          </label>
          <div class="mdl-textfield__expandable-holder">
            <input class="mdl-textfield__input" type="text" name="sample"
                   id="fixed-header-drawer-exp">
          </div>
        </div>
      </div>
    </header>
    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">Title</span>
      <nav class="mdl-navigation">
        <a class="mdl-navigation__link" href="/#/list">Dashboard</a>
        <a class="mdl-navigation__link" href="/#/list">Crypto-assets</a>
        <a class="mdl-navigation__link" href="/#/list">Store</a>
        <a class="mdl-navigation__link" href="/#/list">Settings</a>
      </nav>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import 'roboto-fontface'
import 'material-design-icons-iconfont'
import "material-design-lite/material.min.css"
import "material-design-lite/material.min.js"
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
window.App = {
  name: 'app'
}
export default window.App
</script>

<style lang="sass">
// @import './assets/sticky-footer.sass'
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

// .footer
//   padding: 10px 0
//   margin-top: 10px
//   font-size: 13px
//   border-top: 1px solid #DDDDEE
//   .container
//     display: flex
//     align-items: center
//     .left
//       flex: 1 0 auto
//     .right
//       text-align: right
</style>
