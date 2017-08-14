<template style="height: 100%">
  <div :id="'sentimentsBritechartsLine'+id" class="sentimentsBritechartsLine"></div>
</template>


<script>
import axios from 'axios'
import _ from 'lodash'
import moment from 'moment'
const LineChart = require('britecharts/dist/umd/line.min')
const d3Selection = require('d3-selection')
import 'britecharts/dist/css/britecharts.min.css'
const colorSchemas = require('../../assets/colors').colorSchemas
export default {
  name: "sentimentsBritechartsLine",
  props: ['id'],
  data: function data() {
    return {
      tooltipThreshold: 600,
      width: 1000,
      height: 1000,
      margin: 0,
      data: {
        dataByTopic: []
      }
    }
  },
  created () {
  },
  mounted () {
    this.sentimentsStatistics()
  },
  methods: {
    sentimentsStatistics: function () {
      axios.get('http://dolphin.suenot.ru/static/data/btt-sentiments/S'+ this.id +'.json')
      .then(response => {
        let chartData = response.data.chart
        let pointStart = response.data.pointStart * 10
        let pointInterval = 86400000 // 3600 * 1000 * 24
        _.forEach(chartData, (sentiment, i) => {
          _.forEach(sentiment, (value, i) => {
            value = {
              date: moment(pointStart+pointInterval*i).format(),
              value: value
            }
            sentiment[i] = value
          })
          let sentimentData = {
            topicName: i,
            topic: i,
            dates: sentiment
          }
          this.data.dataByTopic.push(sentimentData)
        })

        var container = d3Selection.select('#sentimentsBritechartsLine'+this.id)
        var line = new LineChart()
        if (container.node()) {
          line
            .tooltipThreshold(600)
            .height(document.documentElement.clientHeight)
            .width(document.documentElement.clientWidth)
            .colorSchema(colorSchemas.sentiments)
        }
        container.datum(this.data).call(line)
      })
      .catch(e => {
        this.chartError = true
        this.errors.push(e)
      })
    }
  }
}
</script>


<style lang="sass" scoped>
.sentimentsBritechartsLine
  width: 100%
  height: 100%
</style>
