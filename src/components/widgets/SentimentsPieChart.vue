<template>
  <div id="sentiments-pie-chart">
    <div :id="'sentimentsPieChart'+id" style="width: 100%; height: 400px; margin: 0 auto"></div>
  </div>
</template>


<script>
import axios from 'axios'
const Highchart = require('highcharts')
const Highstock = require('highcharts/highstock')
const colors = ['#f98a83', '#989898', '#85f77e']
export default {
  name: "sentimentsPieChart",
  props: ['id'],
  data: function data() {
    return {

    }
  },
  mounted () {
    this.sentimentsStatistics()
  },
  methods: {
    sentimentsStatistics: () => {
      axios.get('http://dolphin.suenot.ru/static/data/btt-sentiments/S'+ postId +'.json')
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

      let highchartContainer = 'sentimentsPieChart'+this.id
      Highchart.chart(highchartContainer, {
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
    removeWidget: function () {
      this.$root.$emit('removeWidget', this.id)
    }
  }
}
</script>


<style lang="sass" scoped>
.title
  margin: 0 10px
</style>
