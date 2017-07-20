<template>
  <div class="">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <a href="/#/" class="logo">
          <img src="/static/img/dolphin.png" class="logo-img">
          <span class="mdl-layout-title">Dolphin BI</span>
        </a>
        <div class="search-bar">
            <input class="mdl-textfield__input" type="text" name="sample" placeholder="Search coin">
            <i class="material-icons">search</i>
        </div>
        <div class="mdl-layout-spacer"></div>
        <nav class="mdl-navigation">
          <a class="mdl-navigation__link" href="/#/dashboard">Dashboard</a>
          <a class="mdl-navigation__link" href="http://presale.dolphin.bi/" target="_blank">ICO</a>
          <a class="mdl-navigation__link" href="/#/profile"><i class="material-icons mdl-list__item-avatar">person</i></a>
        </nav>
      </div>
    </header>
    <div class="mdl-layout mdl-js-layout">
      <div class="mdl-layout__drawer">
        <span class="mdl-layout-title">Widgets</span>
        <ul class="mdl-list">
          <li class="mdl-list__item mdl-list__item--two-line" v-for="widget in widgetsBar">
            <span class="mdl-list__item-primary-content">
              <img class="widget-img" :src="widget.icon" alt="">
              <span>{{ widget.name }}</span>
              <span class="mdl-list__item-sub-title">{{ widget.subName }}</span>
            </span>
            <span v-if="widget.subscribe" class="mdl-list__item-secondary-content">
              <a class="mdl-list__item-secondary-action" href="#" @click.prevent="addWidget(widget.component)"><i class="material-icons">add</i></a>
            </span>
            <span v-else class="mdl-list__item-secondary-content">
              <a class="mdl-list__item-secondary-action" href="#" @click.prevent=""><i class="material-icons">attach_money</i></a>
            </span>
          </li>
        </ul>
      </div>
      <router-view/>
    </div>
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
export default {
  name: "app",
  data: () => ({
    widgetsBar: [
      { name: 'Sentiments', subName: 'comments', component: 'SentimentsComments', icon: '/static/img/widgets/sentiments.svg', subscribe: true },
      { name: 'Sentiments', subName: 'chart', component: 'SentimentsLineChart', icon: '/static/img/widgets/sentiments.svg', subscribe: true },
      { name: 'Sentiments', subName: 'pie chart', component: 'SentimentsStatistics', icon: '/static/img/widgets/sentiments.svg', subscribe: true },
      { name: 'Faces', subName: 'project', component: 'FacesProject', icon: '/static/img/widgets/faces.svg', subscribe: true },
      { name: 'Faces', subName: 'search', component: 'FacesSearch', icon: '/static/img/widgets/faces.svg', subscribe: true },
      { name: 'Funds raised', subName: '', component: '', icon: '/static/img/widgets/funds-raised.svg', subscribe: false },
      { name: 'Funding amounts', subName: '', component: '', icon: '/static/img/widgets/funding-amounts.svg', subscribe: false },
      { name: 'Experts evaluations', subName: '', component: '', icon: '/static/img/widgets/experts.svg', subscribe: false },
      { name: 'Description', subName: '', component: '', icon: '/static/img/widgets/description.svg', subscribe: false },
      { name: 'Code audit', subName: '', component: '', icon: '/static/img/widgets/code.svg', subscribe: false },
      { name: 'Likes', subName: '', component: '', icon: '/static/img/widgets/likes.svg', subscribe: false },
      { name: 'Portfolio', subName: '', component: '', icon: '/static/img/widgets/portfolio.svg', subscribe: false },
    ]
  }),
  methods: {
    addWidget (widgetName) {
      this.$root.$emit('addWidget', widgetName)
    }
  }
}
</script>

<style lang="sass">
.mdl-layout__header
  .search-bar
    background: rgba(0, 0, 0, 0.22)
    border-radius: 2px
    display: flex
    flex: 1 0 286px
    width: auto !important
    align-items: center
    margin-left: 23px
    .material-icons
      margin: 0 10px
    input
      padding: 10px
  .logo
    text-decoration: none
    color: #fff
    white-space: nowrap
    .logo-img
      width: 30px
      margin-right: 10px
      vertical-align: middle
      display: inline-block
    .mdl-layout-title
      vertical-align: middle
      display: inline-block
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
.mdl-layout__header
  background: #212E51 !important

.mdl-layout__drawer
  .widget-img
    width: 40px
    height: 40px
    margin-right: 16px
    float: left
//   background: #212E51 !important
// .mdl-layout-title
//   color: #fff
// .mdl-navigation a
//   color: #fff !important
//   &:hover
//     background: #1A2543 !important
</style>
