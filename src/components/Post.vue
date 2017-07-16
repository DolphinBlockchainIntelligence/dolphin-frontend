<template>
  <main class="mdl-layout__content">
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--12-col">
        <h4>{{ heading }}</h4>
        <!-- <i class="material-icons">account_circle</i> -->
        <!-- <i class="material-icons">assignment</i> -->
      </div>
    </div>
    <div v-model="widgets" class="mdl-grid draggable-container" id="draggable-container" :options="{draggable:'.draggable'}">
      <div class="mdl-cell mdl-cell--6-col draggable" key="sentimentsLineChart">
        <div class="demo-card-wide mdl-card mdl-shadow--2dp">
          <div class="mdl-card__title">
            <h4 class="mdl-card__title-text">Sentiments: chart</h4>
          </div>
          <div class="mdl-card__menu">
            <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
              <i class="material-icons">info</i>
            </button>
            <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
              <i class="material-icons">pan_tool</i>
            </button>
            <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
              <i class="material-icons">filter_list</i>
            </button>
            <button id="demo-menu-lower-right"
                    class="mdl-button mdl-js-button mdl-button--icon">
              <i class="material-icons">more_vert</i>
            </button>
            <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                for="demo-menu-lower-right">
              <li class="mdl-menu__item">Some Action</li>
              <li class="mdl-menu__item">Another Action</li>
              <li disabled class="mdl-menu__item">Disabled Action</li>
              <li class="mdl-menu__item">Yet Another Action</li>
            </ul>
          </div>
          <div v-if="!chartError">
            <div id="sentimentsLineChart" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
            <!-- <div v-else class="nodata">
              <p>Data not find</p>
            </div> -->
          </div>
        </div>
      </div>
      <div class="mdl-cell mdl-cell--6-col draggable" key="sentimentsComments">
        <div class="mdl-card mdl-shadow--2dp widget-comments">
          <div class="mdl-card__title">
            <h4 class="mdl-card__title-text">Sentiments: comments</h4>
          </div>
          <div class="mdl-card__menu">
            <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
              <i class="material-icons">info</i>
            </button>
            <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
              <i class="material-icons">pan_tool</i>
            </button>
            <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
              <i class="material-icons">filter_list</i>
            </button>
            <button id="demo-menu-lower-right"
                    class="mdl-button mdl-js-button mdl-button--icon">
              <i class="material-icons">more_vert</i>
            </button>
            <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                for="demo-menu-lower-right">
              <li class="mdl-menu__item">Some Action</li>
              <li class="mdl-menu__item">Another Action</li>
              <li disabled class="mdl-menu__item">Disabled Action</li>
              <li class="mdl-menu__item">Yet Another Action</li>
            </ul>
          </div>
          <div v-if="!commentsError">
            <ul class="comments">
              <li v-for="(comment, key) in comments" :class="'comment sentiment'+comment.Sentiment">
                <div class="heading">
                  <div class="author">{{ comment.user }}:</div>
                  <div class="date">{{ comment.date }}:</div>
                </div>
                <a :href="'https://bitcointalk.org/index.php?topic='+comment.topicId+'.msg'+key+'#msg'+key" target="_blank" class="text">{{ comment.text }}:</a>
              </li>
            </ul>
          </div>
          <!-- <div v-else class="nodata">
            <p>Data not find</p>
          </div> -->
        </div>
      </div>
      <div class="mdl-cell mdl-cell--6-col draggable" key="sentimentsStatistics">
        <div class="demo-card-wide mdl-card mdl-shadow--2dp">
          <div class="mdl-card__title">
            <h2 class="mdl-card__title-text">Sentiments: statistic</h2>
          </div>
          <div id="sentimentsPieChart" style="min-width: 310px; height: 400px; max-width: 600px; margin: 0 auto"></div>
          <div class="mdl-card__menu">
            <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
              <i class="material-icons">info</i>
            </button>
            <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
              <i class="material-icons">pan_tool</i>
            </button>
            <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
              <i class="material-icons">filter_list</i>
            </button>
            <button id="demo-menu-lower-right"
                    class="mdl-button mdl-js-button mdl-button--icon">
              <i class="material-icons">more_vert</i>
            </button>
            <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                for="demo-menu-lower-right">
              <li class="mdl-menu__item">Some Action</li>
              <li class="mdl-menu__item">Another Action</li>
              <li disabled class="mdl-menu__item">Disabled Action</li>
              <li class="mdl-menu__item">Yet Another Action</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mdl-cell mdl-cell--6-col draggable" key="faces">
        <div class="demo-card-wide mdl-card mdl-shadow--2dp widget-faces widget">
          <div class="mdl-card__title">
            <h2 class="mdl-card__title-text">Faces</h2>
          </div>
          <div class="mdl-card__menu">
            <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
              <i class="material-icons">info</i>
            </button>
            <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
              <i class="material-icons">pan_tool</i>
            </button>
            <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
              <i class="material-icons">filter_list</i>
            </button>
            <button id="demo-menu-lower-right"
                    class="mdl-button mdl-js-button mdl-button--icon">
              <i class="material-icons">more_vert</i>
            </button>
            <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                for="demo-menu-lower-right">
              <li class="mdl-menu__item">Some Action</li>
              <li class="mdl-menu__item">Another Action</li>
              <li disabled class="mdl-menu__item">Disabled Action</li>
              <li class="mdl-menu__item">Yet Another Action</li>
            </ul>
          </div>
          <ul>
            <li class="mdl-list__item mdl-list__item--two-line">
              <span class="mdl-list__item-primary-content">
                <i class="material-icons mdl-list__item-avatar">person</i>
                <span>Bryan Cranston</span>
                <span class="mdl-list__item-sub-title">CEO</span>
              </span>
              <span class="mdl-list__item-secondary-content">
                <a class="mdl-list__item-secondary-action" href="#"><i class="material-icons">assignment</i></a>
              </span>
            </li>
            <li class="mdl-list__item mdl-list__item--two-line">
              <span class="mdl-list__item-primary-content">
                <i class="material-icons mdl-list__item-avatar">person</i>
                <span>Aaron Paul</span>
                <span class="mdl-list__item-sub-title">Blockchain developer</span>
              </span>
              <span class="mdl-list__item-secondary-content">
                <a class="mdl-list__item-secondary-action" href="#"><i class="material-icons">assignment</i></a>
              </span>
            </li>
            <li class="mdl-list__item mdl-list__item--two-line">
              <span class="mdl-list__item-primary-content">
                <i class="material-icons mdl-list__item-avatar">person</i>
                <span>Bob Odenkirk</span>
                <span class="mdl-list__item-sub-title">IOS developer</span>
              </span>
              <span class="mdl-list__item-secondary-content">
                <a class="mdl-list__item-secondary-action" href="#"><i class="material-icons">assignment</i></a>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div class="mdl-cell mdl-cell--6-col draggable widget-faces-search" key="faces-search">
        <div class="demo-card-wide mdl-card mdl-shadow--2dp widget-faces widget">
          <div class="mdl-card__title">
            <h2 class="mdl-card__title-text">Faces: search</h2>
          </div>
          <div class="mdl-card__menu">
            <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
              <i class="material-icons">info</i>
            </button>
            <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
              <i class="material-icons">pan_tool</i>
            </button>
            <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
              <i class="material-icons">filter_list</i>
            </button>
            <button id="demo-menu-lower-right"
                    class="mdl-button mdl-js-button mdl-button--icon">
              <i class="material-icons">more_vert</i>
            </button>
            <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                for="demo-menu-lower-right">
              <li class="mdl-menu__item">Some Action</li>
              <li class="mdl-menu__item">Another Action</li>
              <li disabled class="mdl-menu__item">Disabled Action</li>
              <li class="mdl-menu__item">Yet Another Action</li>
            </ul>
          </div>
          <div class="search-bar">
            <input type="text" name="" value="" class="bootstrap-input">
            <button type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Name</button>
            <button type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Role</button>
            <button type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Team</button>
            <button type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Photo</button>
          </div>
        </div>
      </div>

    </div>
  </main>
</template>

<script>
import axios from 'axios'
const Highchart = require('highcharts')
const Highstock = require('highcharts/highstock')
const Sortable = require('sortablejs')
import draggable from 'vuedraggable'
const colors = ['#f98a83', '#989898', '#85f77e']
export default {
  name: 'post',
  data: () => ({
    heading: '',
    comments: [],
    chartError: false,
    commentsError: false,
    widgets: [
      'sentimentsLineChart', 'sentimentsComments', 'sentimentsStatistics', 'Faces'
    ]
  }),
  components: {
    draggable
  },
  mounted () {
    document.querySelector('.mdl-layout').classList.add('mdl-layout--fixed-drawer')
    this.sentimentsPieChart()
    this.sentimentsLineChart()
    this.sentimentsComments()
    this.getHeading()
    const el = document.getElementById('draggable-container')
    const sortable = Sortable.create(el)
  },
  created () {
  },
  methods: {
    sentimentsPieChart: function () {
      Highchart.chart('sentimentsPieChart', {
          chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie'
          },
          title: {
              text: false
          },
          tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
              pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                      enabled: false
                  },
                  showInLegend: true
              }
          },
          series: [{
              // name: 'Brands',
              // colorByPoint: true,
              data: [{
                  name: 'Negative',
                  y: 56.33,
                  color: colors[0],
              }, {
                  name: 'Neutral',
                  y: 24.03,
                  color: colors[1]
              }, {
                  name: 'Positive',
                  y: 10.38,
                  color: colors[2],
              }]
          }]
      })
    },
    sentimentsComments: function () {
      const postId = this.$route.params.id
      axios.get('/static/data/btt-sentiments/D'+ postId +'.json')
      .then(response => {
        this.comments = response.data
      })
      .catch(e => {
        this.commentsError = true
        this.errors.push(e)
      })
    },
    sentimentsLineChart: function () {
      let seriesOptions = []
      let seriesCounter = 0
      function createChart () {
        Highstock.stockChart('sentimentsLineChart', {
          chart: {
            spacingBottom: 60
          },
          legend: {
            enabled: true,
            floating: true,
            verticalAlign: 'bottom',
            align:'right',
            y: 30
          },
          rangeSelector: {
            selected: 4
          },
          plotOptions: {
            series: {
              showInNavigator: true
            },
          },
          series: seriesOptions
        })
      }
      const postId = this.$route.params.id
      let names = ['positive', 'neutral', 'negative']
      let component = this
      axios.get('/static/data/btt-sentiments/S'+ postId +'.json')
      .then(response => {
        let data = response.data
        let chartData = {
          negative: [],
          neutral: [],
          positive: [],
          pointStart: ''
        }
        let dates = []
        let names = ['negative', 'neutral', 'positive']
        chartData.negative = data.chart.negative
        chartData.neutral = data.chart.neutral
        chartData.positive = data.chart.positive
        chartData.pointStart = data.pointStart
        names.forEach(function (name, i) {
          seriesOptions[i] = {
            name: name,
            data: chartData[name],
            color: colors[i],
            pointStart: chartData.pointStart * 10,
            pointInterval: 3600 * 1000 * 24
          }
          seriesCounter += 1
          if (seriesCounter === names.length) {
            createChart()
          }
        })
      })
      .catch(e => {
        this.chartError = true
        this.errors.push(e)
      })
    },
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
