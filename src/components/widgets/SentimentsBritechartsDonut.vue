<template style="height: 100%">
  <div>
    <div :id="'sentimentsBritechartsDonut'+id" class="sentimentsBritechartsDonut"></div>
    <div :id="'sentimentsBritechartsDonutLegend'+id" class="sentimentsBritechartsDonutLegend"></div>
  </div>
</template>


<script>
import axios from 'axios'
import _ from 'lodash'
import moment from 'moment'
const DonutChart = require('britecharts/dist/umd/donut.min')
const LegendChart = require('britecharts/dist/umd/legend.min')
const d3Selection = require('d3-selection')
const colorSchemas = require('../../assets/colors').colorSchemas
import 'britecharts/dist/css/britecharts.min.css'
export default {
  name: "sentimentsBritechartsDonut",
  props: ['id'],
  data: function data() {
    return {
      tooltipThreshold: 600,
      width: 1000,
      height: 1000,
      margin: 0,
      data: [
        {
          quantity: 2,
          percentage: 20,
          name: 'Positive',
          id: 1
        },
        {
          quantity: 2,
          percentage: 20,
          name: 'Neutral',
          id: 2
        },
        {
          quantity: 6,
          percentage: 60,
          name: 'Negative',
          id: 3
        }
      ]
    }
  },
  created () {
  },
  mounted () {
    this.sentimentsStatistics()
  },
  methods: {
    sentimentsStatistics: function () {
      // cointainer width/height
      let containerWidth = document.documentElement.clientWidth
      let containerHeight = document.documentElement.clientHeight
      let containerSize = (document.documentElement.clientWidth <= document.documentElement.clientHeight) ? document.documentElement.clientWidth : document.documentElement.clientHeight

      // init chart
      var container = d3Selection.select('#sentimentsBritechartsDonut'+this.id)
      var legendContainer = d3Selection.select('#sentimentsBritechartsDonutLegend'+this.id)
      var legendChart = new LegendChart()
      var donutChart = new DonutChart()
      if (container.node()) {
        donutChart
          .isAnimated(true)
          .width(containerSize)
          .height(containerSize/1.1)
          .externalRadius(containerSize/2.5)
          .internalRadius(containerSize/5)
          .colorSchema(colorSchemas.sentiments)
          .on('customMouseOver', function(data) {
            legendChart.highlight(data.data.id)
          })
          .on('customMouseOut', function() {
            legendChart.clearHighlight()
          })
        legendChart
          .isHorizontal(true)
          .width(containerWidth)
          .markerSize(8)
          .height(40)
          .colorSchema(colorSchemas.sentiments)
      }
      container.datum(this.data).call(donutChart)
      legendContainer.datum(this.data).call(legendChart)
    }
  }
}
</script>


<style lang="sass" scoped>
.sentimentsBritechartsDonut
  width: 100%
  height: 100%
</style>
