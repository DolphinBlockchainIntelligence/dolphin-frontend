<template>
  <div class="container">
    <router-view :key="$route.path" />
  </div>
</template>

<script>
  import Vue from 'vue'
  import _ from 'lodash'
  import axios from 'axios'
  import moment from 'moment'
  import routes from './router'
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
.container
  width: 100%
</style>
