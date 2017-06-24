<template lang="pug">
.coin.container
  h3.page-title {{ heading}}
  #container(style='min-width: 310px; height: 400px; margin: 0 auto')
  br
  ul.comments: li.comment(v-for="comment in comments" :class="'sentiment'+comment.sentiment")
    .heading
      .author {{ comment.author }}:
      .date {{ comment.date }}
    .text {{ comment.text }}
</template>

<script>
import axios from 'axios'
let Highcharts = require('highcharts/highstock')
export default {
  name: 'coin',
  data: () => ({
    heading: '',
    comments: []
  }),
  created () {
    document.querySelector('body').classList.remove('body-landing-lite')
    let seriesOptions = []
    let seriesCounter = 0
    function createChart () {
      Highcharts.stockChart('container', {
        chart: {
          spacingBottom: 60
        },
        legend: {
          enabled: true,
          floating: true,
          verticalAlign: 'bottom',
          align:'right',
          y:40
        },
        rangeSelector: {
          selected: 4
        },
        yAxis: {
          labels: {
            formatter: function () {
              return (this.value > 0 ? ' + ' : '') + this.value + '%'
            }
          },
          plotLines: [{
            value: 0,
            width: 2,
            color: 'silver'
          }]
        },
        plotOptions: {
          series: {
            compare: 'percent',
            showInNavigator: true
          },
        },
        tooltip: {
          pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
          valueDecimals: 2,
          split: true
        },
        series: seriesOptions
      })
    }
    const coinId = this.$route.params.id
    let names = ['positive', 'neutral', 'negative']
    let component = this
    axios.get('/static/data/btt-sentiments-chart/'+ coinId +'.json')
    .then(response => {
      let data = response.data
      component.heading = data.heading
      names.forEach(function (name, i) {
        seriesOptions[i] = {
          name: name,
          data: data.btt[name],
          pointStart: Date.UTC(2016, 1, 30),
          pointInterval: 3600 * 1000 * 24
        }
        seriesCounter += 1
        if (seriesCounter === names.length) {
          createChart()
        }
      })
    })
    .catch(e => {
      this.errors.push(e)
    })

    axios.get('/static/data/btt-sentiments-comments/'+ coinId +'.json')
    .then(response => {
      this.comments = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>

<style lang="sass">
  .comments
    list-style: none
    padding: 0
    .comment
      margin-bottom: 20px
      .heading
        display: flex
        justify-content: space-between
        color: #999
      .text
        padding: 20px
  .sentiment-1 .text
    border: 2px solid #ffb1ac
  .sentiment0 .text
    border: 2px solid #ddd
  .sentiment1 .text
    border: 2px solid #b0f5f7
</style>
