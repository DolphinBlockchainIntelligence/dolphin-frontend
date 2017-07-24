<template>
  <div class="">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <a class="mdl-navigation__link" href="#" @click.prevent="toggleMenu()"><i class="material-icons">menu</i></a>
        <a href="/#/" class="logo">
          <img src="/static/img/dolphin.png" class="logo-img">
          <span class="mdl-layout-title">Dolphin BI</span>
        </a>
        <div class="search-bar">
            <input id="search" class="mdl-textfield__input" type="text" name="sample" placeholder="Search coin" v-model="query" autofocus>
            <a href="#" class="material-icons" @click="search()">search</a>
            <ul id="search-result" class="mdl-list search-result mdl-shadow--2dp hide">
              <li class="mdl-list__item" v-for="coin in computedList">
                <a :href="'/post/' + coin.topicId" class="mdl-list__item-primary-content">
                  {{ coin.announce }}
                </a>
              </li>
            </ul>
        </div>
        <div class="mdl-layout-spacer"></div>
        <nav class="mdl-navigation">
          <a class="mdl-navigation__link" href="http://presale.dolphin.bi/" target="_blank">ICO</a>
          <a class="mdl-navigation__link" href="/#/profile"><i class="material-icons mdl-list__item-avatar">person</i></a>
        </nav>
      </div>
    </header>
    <div class="mdl-layout mdl-layout--fixed-drawer">
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
      <router-view/>
      <div class="mdl-layout__right-drawer">
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
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import _ from 'lodash'
  import axios from 'axios'
  import moment from 'moment'
  import 'roboto-fontface'
  import 'material-design-icons-iconfont'
  import "material-design-lite/material.min.css"
  import "material-design-lite/material.min.js"
  export default {
    name: "app",
    data: () => ({
      query: '',
      coinsList: [],
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
      ],
      favoritesCoins: []
    }),
    computed: {
      computedList: function () {
        let vm = this
        let list = []
          list = this.coinsList.filter(function (item) {
            return list = item.announce.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
          })
        return list
      }
    },
    watch: {
      query: function () {
        if (document.getElementById('search').value) {
          document.getElementById('search-result').classList.remove('hide')
        } else {
          document.getElementById('search-result').classList.add('hide')
        }
      }
    },
    created () {
      let component = this
      axios.get('/static/data/announceList.json')
      .then(response => {
        this.coinsList = Object.values(response.data)
        this.coinsList.map((currElement, index) => {
          currElement.DateTimeLastPost = moment(currElement.DateTimeLastPost).calendar()
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    mounted () {
      this.$root.$on('addFavoriteCoins', (coin) => {
        this.favoritesCoins.push(coin)
      })
      this.$root.$on('removeFavoriteCoins', (id) => {
        this.favoritesCoins = _.reject(this.favoritesCoins, { 'id': id })
      })
    },
    methods: {
      addWidget (widgetName) {
        this.$root.$emit('addWidget', widgetName)
      },
      toggleMenu () {
        document.querySelector('.mdl-layout').classList.toggle('mdl-layout--fixed-drawer')
      }
    }
  }
</script>

<style lang="sass">
  .search-result
    position: absolute
    top: 64px
    left: 241px
    margin: 0
    width: calc(100% - 240px)
    z-index: 10
    background: #fff
    a
      color: rgba(0,0,0,.87)
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
