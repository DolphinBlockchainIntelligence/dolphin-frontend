<template lang="pug">
.coin.container
  h3.page-title {{ heading}}
  #container(style='min-width: 310px; height: 400px; margin: 0 auto')
  //- br
  //- ul: li(v-for="comment in comments")
  //-   div {{ comment[0] }}
  //-   div {{ comment[1] }}
  //-   div {{ comment[2] }}
  //-   div {{ comment[3] }}
</template>

<script>
import firebase from '../firebase'
import axios from 'axios'
let Highcharts = require('highcharts/highstock')
export default {
  name: 'coin',
  data: () => ({
    heading: '',
    comments: []
  }),
  created () {
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

    // axios.get('/static/data/btt-sentiments-comments/'+ coinId +'.json')
    // .then(response => {
    //   this.comments = response.data
    // })
    // .catch(e => {
    //   this.errors.push(e)
    // })
  }
}
</script>
