<template>
  <div id="sentiments-pie-chart">
    <h4 class="title">Sentiments: donut chart</h4>
    <div :id="'sentimentsBritechartsDonut'+id" class="sentimentsBritechartsDonut"></div>
    <h1>{{id}}</h1>
  </div>
</template>


<script>
import axios from 'axios'
const LineChart = require('britecharts/dist/umd/line.min')
console.log(LineChart)
const d3Selection = require('d3-selection')
console.log(d3Selection)

import 'britecharts/dist/css/britecharts.min.css'
const Highchart = require('highcharts')
const Highstock = require('highcharts/highstock')
const colors = ['#f98a83', '#989898', '#85f77e']
export default {
  name: "sentimentsPieChart",
  props: ['id'],
  data: function data() {
    return {
      // id: 2047503,
      tooltipThreshold: 600,
      width: 1000,
      height: 1000,
      margin: 0,
      data: {
        dataByTopic: [
          {
            topicName: 'San Francisco',
            topic: 123,
            dates: [
              {
                date: '2017-01-16T16:00:00-08:00',
                value: 1
              },
              {
                date: '2017-01-16T17:00:00-08:00',
                value: 2
              }
            ]
          }
        ]
      }
    }
  },
  mounted () {
    this.sentimentsStatistics()
  },
  methods: {
    sentimentsStatistics: function () {
      axios.get('http://dolphin.suenot.ru/static/data/btt-sentiments/S'+ this.id +'.json')
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


      var container = d3Selection.select('#sentimentsBritechartsDonut'+this.id)
      var line = new LineChart()
      if (container.node()) {
        console.log(line)
        console.log(d3Selection)
        console.log(container)
        line
          .tooltipThreshold(600)
          // .margin(this.chartMargin)
          .height(600)
          .width(1300)
      }
      container.datum(this.data).call(line);

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
.sentimentsBritechartsDonut
  width: 1000px
  height: 1000px
</style>
