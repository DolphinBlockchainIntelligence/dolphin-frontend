<template>
  <div class="mdl-cell mdl-cell--6-col draggable" key="sentimentsStatistics">
    <div class="demo-card-wide mdl-card mdl-shadow--2dp">
      <div class="mdl-card__title">
        <h2 class="mdl-card__title-text">Sentiments: statistic</h2>
      </div>
      <div :id="'sentimentsPieChart'+id" style="min-width: 310px; height: 400px; max-width: 600px; margin: 0 auto"></div>
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
    </div>
  </div>
</template>


<script>
import axios from 'axios'
const Highchart = require('highcharts')
const Highstock = require('highcharts/highstock')
const colors = ['#f98a83', '#989898', '#85f77e']
export default {
  name: "sentimentsStatistics",
  props: ['id'],
  data: function data() {
    return {

    }
  },
  mounted () {
    this.sentimentsStatistics()
  },
  methods: {
    sentimentsStatistics: function () {
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
    removeWidget: function () {
      this.$root.$emit('removeWidget', this.id)
    }
  }
}
</script>
<style>
</style>
