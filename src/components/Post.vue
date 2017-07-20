<template>
  <main class="mdl-layout__content">
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--12-col">
        <h4>{{ heading }}</h4>
      </div>
      <template v-for="(child, index) in widgets">
        <component :is="child" :key="child.name"></component>
      </template>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import SentimentsStatistics from './widgets/SentimentsStatistics.vue'
import SentimentsLineChart from './widgets/SentimentsLineChart.vue'
import SentimentsComments from './widgets/SentimentsComments.vue'
import FacesSearch from './widgets/FacesSearch.vue'
import FacesProject from './widgets/FacesProject.vue'

export default {
  name: 'post',
  data: () => ({
    heading: '',
    widgets: ['FacesProject']
    // widgets: ['SentimentsLineChart', 'SentimentsStatistics', 'SentimentsComments', 'FacesProject', 'FacesSearch']
  }),
  components: {
    SentimentsLineChart,
    SentimentsStatistics,
    SentimentsComments,
    FacesSearch,
    FacesProject
  },
  mounted () {
    document.querySelector('.mdl-layout').classList.add('mdl-layout--fixed-drawer')
    this.getHeading()
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
    }
  }
}
</script>

<style lang="sass">
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
