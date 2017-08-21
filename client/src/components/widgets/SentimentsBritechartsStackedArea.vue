<template style="height: 100%">
  <div>
    <div :id="'sentimentsBritechartsStackedArea'+id" class="sentimentsBritechartsStackedArea"></div>
    <div :id="'sentimentsBritechartsStackedAreaBrush'+id" class="sentimentsBritechartsStackedAreaBrush"></div>
  </div>
</template>


<script>
import axios from 'axios'
import _ from 'lodash'
import moment from 'moment'
const StackedArea = require('britecharts/dist/umd/stackedArea.min')
const ChartTooltip = require('britecharts/dist/umd/tooltip.min')
const BrushChart = require('britecharts/dist/umd/brush.min')
const d3Selection = require('d3-selection')
// d3TimeFormat = require('d3-time-format')
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
    }
  },
  created () {
  },
  mounted () {
    this.sentimentsStatistics()
  },
  methods: {
    sentimentsStatistics: function () {
      axios.get('http://178.218.115.169:5000/btt-sentiments/S'+ this.id +'.json')
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
        var chartTooltip = new ChartTooltip()
        var brushChart = new BrushChart()
        stackedArea
          .isAnimated(true)
          .tooltipThreshold(600)
          .width(containerWidth)
          .height(containerHeight - 100)
          .colorSchema(colorSchemas.sentimentsStackedArea)
          .grid('horizontal')
          .on('customMouseOver', chartTooltip.show)
          .on('customMouseMove', chartTooltip.update)
          .on('customMouseOut', chartTooltip.hide)
        chartTooltip
          .topicLabel('values')
          .title('Sentiments')
          .topicsOrder(['positive', 'neutral', 'negative'])
        brushChart
          .width(containerWidth)
          .height(100)
          .on('customBrushStart', function(brushExtent) {
            console.log('brush start')
            // var format = d3TimeFormat.timeFormat('%m/%d/%Y');
            // d3Selection.select('.js-start-date').text(format(brushExtent[0]));
            // d3Selection.select('.js-end-date').text(format(brushExtent[1]));
            // d3Selection.select('.js-date-range').classed('is-hidden', false);
            // // Filter
            // d3Selection.selectAll('.js-line-chart-container .line-chart').remove();
            // createLineChart(optionalColorSchema ? optionalColorSchema : null, filterData(brushExtent[0], brushExtent[1]));
          })
        container.datum(this.data).call(stackedArea)
        var tooltipContainer = d3Selection.select('#sentimentsBritechartsStackedArea'+this.id+' .metadata-group .vertical-marker-container')
        var brushContainer = d3Selection.select('#sentimentsBritechartsStackedAreaBrush'+this.id)
        tooltipContainer.datum([]).call(chartTooltip)
        brushContainer.datum(this.data).call(brushChart)
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
