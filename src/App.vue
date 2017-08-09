<template>
  <div>
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <a class="mdl-navigation__link" href="#" @click.prevent="toggleMenu()"><i class="material-icons">menu</i></a>
        <a href="/#/" class="logo">
          <img src="/static/img/dolphin.png" class="logo-img">
          <span class="mdl-layout-title">Dolphin BI</span>
        </a>
        <div class="search-bar">
          <input id="search" class="mdl-textfield__input" type="text" name="sample" placeholder="Search coin" v-model="query" autofocus @keyup.up="searchUp()" @keyup.down="searchDown()" @keyup.enter.prevent="searchEnter()" @keyup.esc.prevent="searchEsc()">
          <i id="search-icon" class="material-icons">search</i>
          <i id="search-icon-clear" class="search-icon-clear material-icons hide" @click="searchEsc()">clear</i>
        </div>
        <div class="mdl-layout-spacer"></div>
        <nav class="mdl-navigation">
          <a class="mdl-navigation__link" href="http://presale.dolphin.bi/" target="_blank">ICO</a>
          <a class="mdl-navigation__link" href="/#/profile"><i class="material-icons mdl-list__item-avatar">person</i></a>
        </nav>
      </div>
    </header>
    <div class="mdl-layout mdl-layout--fixed-drawer">
      <click-outside :handler="handleClickOutside">
        <ul id="search-result" class="mdl-list search-result mdl-shadow--2dp hide">
          <li class="mdl-list__item" v-for="coin in computedList">
            <a href="#" :id="coin.topicId" class="mdl-list__item-primary-content" @click.prevent="searchClick(coin.topicId)">
              {{ coin.announce }}
            </a>
          </li>
        </ul>
      </click-outside>
      <div class="mdl-layout__drawer">
        <ul class="mdl-list">
          <li class="mdl-list__item">
            <a href="#" class="mdl-list__item-primary-content">
              Market overview
            </a>
          </li>
          <li class="mdl-list__item">
            <a href="#" class="mdl-list__item-primary-content">
              ICO view
            </a>
            <ul class="favourites-coins">
              <li v-for="coin in favoritesCoins">
                <a :href="'/#/post/'+coin.id">
                  <i class="material-icons">stars</i>
                  <span class="name">{{ coin.name }}</span>
                </a>
              </li>
            </ul>
          </li>
          <li class="mdl-list__item">
            <a href="#" class="mdl-list__item-primary-content">
              Widget market
            </a>
          </li>
          <li class="mdl-list__item">
            <a href="#" class="mdl-list__item-primary-content">
              ICO faces
            </a>
          </li>
        </ul>
      </div>
      <router-view :key="$route.path" />
      <div class="mdl-layout__right-drawer">
        <ul class="mdl-list">
          <li class="mdl-list__item mdl-list__item--two-line" v-for="widget in widgetsBar">
            <span class="mdl-list__item-primary-content">
              <img class="widget-img" :src="widget.icon" alt="">
              <span>{{ widget.name }}</span>
              <span class="mdl-list__item-sub-title">{{ widget.subName }}</span>
            </span>
            <span v-if="widget.subscribe" class="mdl-list__item-secondary-content">
              <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" @click.prevent="addWidget(widget.component)"><i class="material-icons">add</i></button>              
            </span>
            <span v-else class="mdl-list__item-secondary-content">
              <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" @click.prevent=""><i class="material-icons">attach_money</i></button>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import _ from 'lodash'
  import axios from 'axios'
  import moment from 'moment'
  import routes from './router'
  import 'roboto-fontface'
  import 'material-design-icons-iconfont'
  import "material-design-lite/material.min.css"
  import "material-design-lite/material.min.js"
  import { mapState } from 'vuex'
  import ClickOutside from 'onclick-outside'
  export default {
    name: "app",
    data: () => ({
      query: '',
      widgetsBar: [
        { name: 'Sentiments', subName: 'comments', component: 'SentimentsComments', icon: '/static/img/widgets/sentiments.svg', subscribe: true },
        { name: 'Sentiments', subName: 'chart', component: 'SentimentsLineChart', icon: '/static/img/widgets/sentiments.svg', subscribe: true },
        { name: 'Sentiments', subName: 'pie chart', component: 'SentimentsStatistics', icon: '/static/img/widgets/sentiments.svg', subscribe: true },
        { name: 'Faces', subName: 'project', component: 'FacesProject', icon: '/static/img/widgets/faces.svg', subscribe: true },
        { name: 'Faces', subName: 'search', component: 'FacesSearch', icon: '/static/img/widgets/faces.svg', subscribe: true },
        { name: 'Funds raised', subName: '', component: '', icon: '/static/img/widgets/funds-raised.svg', subscribe: false },
        { name: 'Funding amounts', subName: '', component: '', icon: '/static/img/widgets/funding-amounts.svg', subscribe: false },
        { name: 'Experts evaluations', subName: '', component: 'ExpertsEvaluations', icon: '/static/img/widgets/experts.svg', subscribe: true },
        { name: 'Description', subName: '', component: '', icon: '/static/img/widgets/description.svg', subscribe: false },
        { name: 'Code audit', subName: '', component: '', icon: '/static/img/widgets/code.svg', subscribe: false },
        { name: 'Likes', subName: '', component: '', icon: '/static/img/widgets/likes.svg', subscribe: false },
        { name: 'Portfolio', subName: '', component: '', icon: '/static/img/widgets/portfolio.svg', subscribe: false },
      ],
      favoritesCoins: [],
      searchActiveResult: 0
    }),
    computed: {
      computedList: function () {
        if (this.query) {
          return this.assets.filter((item) => {
            return item.announce.toLowerCase().indexOf(this.query.toLowerCase()) !== -1
          }).slice(0, 10)
        }
      },
      ...mapState([
        'assets'
      ])
    },
    watch: {
      query: () => {
        if (document.getElementById('search').value) {
          document.getElementById('search-result').classList.remove('hide')
          document.getElementById('search-icon').classList.add('hide')
          document.getElementById('search-icon-clear').classList.remove('hide')
        } else {
          document.getElementById('search-result').classList.add('hide')
          document.getElementById('search-icon-clear').classList.add('hide')
          document.getElementById('search-icon').classList.remove('hide')
        }
      }
    },
    mounted: function () {
      this.$root.$on('addFavoriteCoins', (coin) => {
        this.favoritesCoins.push(coin)
      })
      this.$root.$on('removeFavoriteCoins', (id) => {
        this.favoritesCoins = _.reject(this.favoritesCoins, { 'id': id })
      })
    },
    beforeCreate: function () {
      this.$store.dispatch('LOAD_ASSETS_LIST')
    },
    methods: {
      addWidget (widgetName) {
        this.$root.$emit('addWidget', widgetName)
      },
      toggleMenu () {
        document.querySelector('.mdl-layout').classList.toggle('mdl-layout--fixed-drawer')
      },
      searchUp () {
        if (this.searchActiveResult > 0) {
          this.searchActiveResult--
          document.querySelectorAll('#search-result li').forEach(function(item){
            item.classList.remove('active')
          })
          document.querySelector('#search-result li:nth-child(' + this.searchActiveResult + ')').classList.add('active')
        }
        console.log(this.searchActiveResult)
      },
      searchDown () {
        if (this.searchActiveResult < 10 ) {
          this.searchActiveResult++
          document.querySelectorAll('#search-result li').forEach(function(item){
            item.classList.remove('active')
          })
          document.querySelector('#search-result li:nth-child(' + this.searchActiveResult + ')').classList.add('active')
        }
      },
      searchEsc () {
        this.searchActiveResult = 0
        document.querySelectorAll('#search-result li').forEach((item) => {
          item.classList.remove('active')
        })
        this.searchActiveResult = 0
        this.query = ''
        // document.getElementById('search-result').classList.add('hide')
        // document.getElementById('search-icon-clear').classList.add('hide')
        // document.getElementById('search-icon').classList.remove('hide')
      },
      searchEnter () {
        let topicId = document.querySelector('#search-result li:nth-child(' + this.searchActiveResult + ') a').getAttribute('id')
        this.searchEsc()
        routes.push({ name: 'Post', params: { id: topicId }})
      },
      handleClickOutside () {
        this.searchEsc()
      },
      searchClick (topicId) {
        this.searchEsc()
        routes.push({ name: 'Post', params: { id: topicId }})
      }
    },
    components: {
      ClickOutside
    }
  }
</script>

<style lang="sass">
.search-result
  position: absolute
  top: 0
  left: 0px
  margin: 0
  width: 100%
  z-index: 10
  background: #fff
  padding: 0 !important
  li
    border-top: 1px solid rgba(0,0,0,.1)
    padding: 0
    &.active
      background: rgba(0,0,0,.12)
  a
    padding: 16px
    color: rgba(0,0,0,.87)
    &:hover
        background: rgba(0,0,0,.12)
.mdl-layout--fixed-drawer .search-result
  left: 241px
  width: calc(100% - 240px)
.mdl-layout--fixed-right-drawer .search-result
  right: 241px
  width: calc(100% - 482px)

.hide
  display: none !important

.mdl-layout__drawer
  .mdl-list__item
    display: block
    a
      opacity: .7
      color: rgb(63, 81, 181) !important
      &:hover
        opacity: 1
    .favourites-coins
      list-style: none
      padding-left: 14px
      li
        &:first-child
          margin-top: 7px
        a
          text-decoration: none
          display: flex
          align-items: center
          i
            margin-right: 7px
          .name
            text-overflow: ellipsis
            white-space: nowrap
            overflow: hidden

.mdl-layout
    min-height: calc(100vh - 64px)
    .mdl-layout__right-drawer
      transform: translateX(250px)
      transform-style: preserve-3d
      will-change: transform
      transition-duration: .2s
      transition-timing-function: cubic-bezier(.4,0,.2,1)
      transition-property: transform
      transition-property: transform,-webkit-transform
      background: #fafafa
      left: auto
      right: 0
      position: absolute
      top: 0
      right: 0
      width: 240px
      height: 100%
      z-index: 1
      box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 3px -2px rgba(0,0,0,.2), 0 5px 1px 0 rgba(0,0,0,.12)
      box-sizing: border-box
      border-left: 1px solid #e0e0e0
      height: 100%
      max-height: 100%
      overflow: visible
      overflow-y: auto
      z-index: 5
      ul
        margin-top: 0
        padding-top: 0
      .widget-img
        width: 40px
        height: 40px
        margin-right: 16px
        float: left
    .btn-remove, .btn-drag
      display: none
    &.mdl-layout--fixed-right-drawer
      .mdl-layout__right-drawer
        transform: translateX(0)
      .mdl-layout__content
        margin-right: 240px
      .btn-remove, .btn-drag
        display: inline-block
.mdl-layout__header
  background: #212E51 !important
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
      color: #fff
      text-decoration: none
    .search-icon-clear
      cursor: pointer
    input
      padding: 10px
      outline: none
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
