<template>
  <main class="mdl-layout__content">
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--12-col">
        <div class="heading-box">
          <h4 class="left">{{ announce }}</h4>
          <div class="right">
            <a :href="topicStarterUrl" target="_blank"><i class="material-icons">account_circle</i></a>
            <a :href="topicUrl" target="_blank"><i class="material-icons">assignment</i></a>
            <a href="#" @click.prevent="toggleFavorite($event)"><i class="material-icons">star_border</i></a>
            <a href="#" @click.prevent="toggleSettings()"><i class="material-icons">settings</i></a>
          </div>
        </div>
      </div>
    </div>
    <div class="mdl-grid" id="draggable-container">
      <template v-for="(child, index) in widgets">
        <component :is="child.name" :key="child.name" :id="child.id"></component>
      </template>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
const Sortable = require('sortablejs')

import SentimentsStatistics from './widgets/SentimentsStatistics.vue'
import SentimentsLineChart from './widgets/SentimentsLineChart.vue'
import SentimentsComments from './widgets/SentimentsComments.vue'
import FacesSearch from './widgets/FacesSearch.vue'
import FacesProject from './widgets/FacesProject.vue'
import ExpertsEvaluations from './widgets/ExpertsEvaluations.vue'

export default {
  name: 'post',
  data: () => ({
    id: '',
    widgets: [{'id': 3, 'name': 'ExpertsEvaluations'}, {'id': 1, 'name': 'SentimentsLineChart'}, {'id': 2, 'name': 'SentimentsComments'}],
    topicStarterUrl: '',
    topicUrl: ''
  }),
  components: {
    SentimentsLineChart,
    SentimentsStatistics,
    SentimentsComments,
    FacesSearch,
    FacesProject,
    ExpertsEvaluations
  },
  created () {
    // this.searchEsc()
  },
  mounted () {
    // TODO: Add and remove widget
    this.$root.$on('addWidget', (widgetName) => {
      this.widgets.push({'id': this.widgets.length+1, 'name': widgetName})
    })
    this.$root.$on('removeWidget', (id) => {
      this.widgets = _.reject(this.widgets, { 'id': id })
    })
    //
    this.initSortable()
  },
  computed: {
    announce (state) {
      if (this.$route.params.announce) {
        return this.$route.params.announce
      } else {
        for (var i in this.assets) {
          if (this.$route.params.id == this.assets[i].topicId) {
            return this.assets[i].announce
          }
        }
      }
    },
    ...mapState([
      'assets'
    ])
  },
  methods: {
    searchEsc () {
      document.querySelectorAll('#search-result li').forEach(function(item){
        item.classList.remove('active')
      })
      document.getElementById('search-result').classList.add('hide')
    },
    toggleSettings: () => {
      document.querySelector('.mdl-layout').classList.toggle('mdl-layout--fixed-right-drawer')
    },
    toggleFavorite: (event) => {
      let icon = event.target.innerHTML
      if (icon == 'star') {
        this.$root.$emit('removeFavoriteCoins', this.id)
        event.target.innerHTML = 'star_border'
      } else {
        this.$root.$emit('addFavoriteCoins', { id: this.id, name: this.announce })
        event.target.innerHTML = 'star'
      }
    },
    initSortable: () => {
      const el = document.getElementById('draggable-container')
      const sortable = Sortable.create(el, {
        handle: ".btn-drag"
      })
    }
  }
}
</script>

<style lang="sass">
// widget
.widget-content
  padding: 0
  margin: 0 10px

.heading-box
  display: flex
  align-items: center
  .left
    flex: 1 1 auto
  .right
    display: flex
    a
      color: #3f51b5
      margin: 24px 0 16px
      opacity: .7
      margin-left: 7px
      &:hover
        opacity: 1
.widget-faces-search
  .search-bar
    display: flex
    input
      flex: 1 0 auto
  .bootstrap-input
    padding: .5rem .75rem
    font-size: 1rem
    line-height: 1.25
    border: 1px solid rgba(0,0,0,.15)
    border-radius: 2px
.widget
  height: 460px
  overflow-y: scroll
.widget-faces
  ul
    padding: 0
    margin: 0
.widget-comments
  height: 460px
  overflow-y: scroll
  padding-top: 28px
.mdl-card
  width: 100% !important
.comments
  list-style: none
  padding: 0
  margin: 0 10px
  .comment
    margin-bottom: 20px
    .heading
      display: flex
      justify-content: space-between
      color: #999
    .text
      padding: 7px 14px
      border-radius: 2px
      display: block
      color: #292b2c
      text-decoration: none
      cursor: pointer
      opacity: .8
      &:hover
        opacity: 1
.sentiment0 .text
  background: #f98a83
.sentiment1 .text
  background: #dddddd
.sentiment2 .text
  background: #85f77e
.nodata
  width: 100%
  height: 400px
  display: flex
  justify-content: center
  align-items: center
  border: 1px solid #ccc
</style>
