<template>
  <!-- <div> -->
    <main class="mdl-layout__content">
      <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--12-col">
          <div class="heading-box">
            <h4 class="left">{{ heading }}</h4>
            <div class="right">
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
  <!-- </div> -->
</template>

<script>
import axios from 'axios'
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
    heading: '',
    widgets: [{'id': 1, 'name': 'SentimentsLineChart'}, {'id': 2, 'name': 'SentimentsComments'}]
  }),
  components: {
    SentimentsLineChart,
    SentimentsStatistics,
    SentimentsComments,
    FacesSearch,
    FacesProject,
    ExpertsEvaluations
  },
  mounted () {
    // TODO: getHeading
    this.getHeading()
    // TODO: Add and remove widget
    this.$root.$on('addWidget', (widgetName) => {
      console.log(this.widgets)
      this.widgets.push({'id': this.widgets.length+1, 'name': widgetName})
    })
    this.$root.$on('removeWidget', (id) => {
      console.log(this.widgets)
      this.widgets = _.reject(this.widgets, { 'id': id })
    })
    // TODO: Sortable
    const el = document.getElementById('draggable-container')
    const sortable = Sortable.create(el)
  },
  methods: {
    getHeading: function () {
      axios.get('/static/data/announceList.json')
      .then(response => {
        let headings = Object.values(response.data)
        for (var i in headings) {
          if (this.$route.params.id == headings[i].topicId) {
            this.heading = headings[i].announce
          }
        }
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    toggleSettings: function () {
      document.querySelector('.mdl-layout').classList.toggle('mdl-layout--fixed-right-drawer')
    }
  }
}
</script>

<style lang="sass">
  .heading-box
    display: flex
    align-items: center
    .left
      flex: 1 0 auto
    .right a
      color: #3f51b5
      opacity: .7
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
    width: 100%
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
        padding: 7px 20px
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
