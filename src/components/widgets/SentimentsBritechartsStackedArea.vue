<template style="height: 100%">
  <div :id="'sentimentsBritechartsStackedArea'+id" class="sentimentsBritechartsStackedArea"></div>
</template>


<script>
import axios from 'axios'
import _ from 'lodash'
import moment from 'moment'
const StackedArea = require('britecharts/dist/umd/stackedArea.min')
const d3Selection = require('d3-selection')
import 'britecharts/dist/css/britecharts.min.css'
const colorSchemas = require('../../assets/colors').colorSchemas
export default {
  name: "sentimentsBritechartsStackedArea",
  props: ['id'],
  data: function data() {
    return {
      tooltipThreshold: 600,
      width: 1000,
      height: 1000,
      margin: 0,
      data: []
      // testData: [
      //   {
      //     "date": "2011-01-05T00:00:00Z",
      //     "name": "Direct",
      //     "value": 3
      //   },
      //   {
      //     "date": "2011-01-06T00:00:00Z",
      //     "name": "Direct",
      //     "value": 10
      //   },
      //   {
      //     "date": "2011-01-07T00:00:00Z",
      //     "name": "Direct",
      //     "value": 5
      //   },
      //   {
      //     "date": "2011-01-05T00:00:00Z",
      //     "name": "Moscow",
      //     "value": 5
      //   },
      //   {
      //     "date": "2011-01-06T00:00:00Z",
      //     "name": "Moscow",
      //     "value": 5
      //   },
      //   {
      //     "date": "2011-01-07T00:00:00Z",
      //     "name": "Moscow",
      //     "value": 5
      //   }
      // ]
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
          _.forEach(sentiment, (value, j) => {
            value = {
              date: moment(pointStart+pointInterval*j).format(),
              value: value,
              name: i,
            }
            this.data.push(value)
          })
        })

        // cointainer width/height
        let containerWidth = document.documentElement.clientWidth
        let containerHeight = document.documentElement.clientHeight
        let containerSize = (document.documentElement.clientWidth <= document.documentElement.clientHeight) ? document.documentElement.clientWidth : document.documentElement.clientHeight

        var container = d3Selection.select('#sentimentsBritechartsStackedArea'+this.id)
        var stackedArea = new StackedArea()
        if (container.node()) {
            stackedArea
              .isAnimated(true)
              .tooltipThreshold(600)
              .width(containerWidth)
              .height(containerHeight)
              .colorSchema(colorSchemas.sentiments)
        }
        container.datum(this.data).call(stackedArea)
      })
      .catch(e => {
        this.chartError = true
        this.errors.push(e)
      })

      // // cointainer width/height
      // let containerWidth = document.documentElement.clientWidth
      // let containerHeight = document.documentElement.clientHeight
      // let containerSize = (document.documentElement.clientWidth <= document.documentElement.clientHeight) ? document.documentElement.clientWidth : document.documentElement.clientHeight

      // var container = d3Selection.select('#sentimentsBritechartsStackedArea'+this.id)
      // var stackedArea = new StackedArea()
      // if (container.node()) {
      //     stackedArea
      //       .isAnimated(true)
      //       .tooltipThreshold(600)
      //       .width(600)
      //       .height(600)
      //       .colorSchema(colorSchemas.sentiments)
      // }
      // container.datum(this.testData).call(stackedArea)
    }
  }
}
</script>


<style lang="sass" scoped>
.sentimentsBritechartsStackedArea
  width: 100%
  height: 100%
</style>
