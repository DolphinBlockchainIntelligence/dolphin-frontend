<template lang="pug">
.coin.container
  h3 {{ heading}}
  #container(style='min-width: 310px; height: 400px; margin: 0 auto')
</template>

<script>
import firebase from '../firebase'
import axios from 'axios'
let Highcharts = require('highcharts/highstock')
export default {
  name: 'coin',
  data: () => ({
    heading: ''
  }),
  created () {
    let seriesOptions = []
    let seriesCounter = 0
    function createChart () {
      Highcharts.stockChart('container', {
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
          }
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
    // axios.get('/static/coin/' + coinId + '.json')
    // .then(response => {
    //   this.heading = response.data.heading
    //   names.forEach(function (name, i) {
    //     seriesOptions[i] = {
    //       name: name,
    //       data: response.data.btt[name],
    //       pointStart: Date.UTC(2016, 1, 30),
    //       pointInterval: 3600 * 1000 * 24 // one hour
    //     }
    //     seriesCounter += 1
    //     if (seriesCounter === names.length) {
    //       createChart()
    //     }
    //   })
    // }).catch(e => {
    //   this.errors.push(e)
    // })
    let component = this
    firebase.database().ref('/coin/' + coinId).once('value').then(function(snapshot) {
      let data = snapshot.val()
      component.heading = data.heading
      names.forEach(function (name, i) {
        seriesOptions[i] = {
          name: name,
          data: data.btt[name],
          pointStart: Date.UTC(2016, 1, 30),
          pointInterval: 3600 * 1000 * 24 // one hour
        }
        seriesCounter += 1
        if (seriesCounter === names.length) {
          createChart()
        }
      })
    })
  }
}
</script>
