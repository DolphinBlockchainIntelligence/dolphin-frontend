<template>
  <div class="mdl-cell mdl-cell--6-col draggable" key="sentimentsLineChart">
    <div class="demo-card-wide mdl-card mdl-shadow--2dp">
      <div class="mdl-card__title">
        <h4 class="mdl-card__title-text">Sentiments: chart</h4>
      </div>
      <div class="mdl-card__menu">
        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect btn-info">
          <i class="material-icons">info</i>
        </button>
        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect btn-drag">
          <i class="material-icons">pan_tool</i>
        </button>
<!--         <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect btn-filter">
          <i class="material-icons">filter_list</i>
        </button>
        <button id="demo-menu-lower-right" class="mdl-button mdl-js-button mdl-button--icon btn-more">
          <i class="material-icons">more_vert</i>
        </button>
        <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
            for="demo-menu-lower-right">
          <li class="mdl-menu__item">Some Action</li>
          <li class="mdl-menu__item">Another Action</li>
          <li disabled class="mdl-menu__item">Disabled Action</li>
          <li class="mdl-menu__item">Yet Another Action</li>
        </ul> -->
        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect btn-remove" @click="removeWidget()">
          <i class="material-icons">delete</i>
        </button>
      </div>
      <div v-if="!chartError">
        <div :id="'sentimentsLineChart'+id" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
const Highchart = require('highcharts')
const Highstock = require('highcharts/highstock')
const colors = ['#f98a83', '#989898', '#85f77e']
export default {
  name: "sentimentsLineChart",
  props: ['id'],
  data: function data() {
    return {
      chartError: false
    }
  },
  mounted () {
    this.sentimentsLineChart()
  },
  methods: {
    sentimentsLineChart: function () {
      let highchartContainer = 'sentimentsLineChart'+this.id
      let seriesOptions = []
      let seriesCounter = 0
      function createChart () {
        Highstock.stockChart(highchartContainer, {
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
      axios.get('http://beta.dolphin.bi/static/data/btt-sentiments/S'+ postId +'.json')
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
    removeWidget: function () {
      this.$root.$emit('removeWidget', this.id)
    }
  },
  removeWidget: function () {
    this.$root.$emit('removeWidget', this.id)
  }
}
</script>
<style>
</style>
