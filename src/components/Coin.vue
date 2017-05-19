<template>
<div class="coin">
  <h1>{{ $route.params.id }}</h1>
  <h3>[ANN] [TOR] Torcoin - X11 PoW - Tor Integrated Crypto - Torcoin.org</h3>
  <div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
</div>
</template>

<script>
import axios from 'axios'
let Highcharts = require('highcharts/highstock')
export default {
  name: 'coin',
  created () {
    let seriesOptions = []
    let seriesCounter = 0
    let names = ['positive', 'neutral', 'negative']
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
    names.forEach(function (name, i) {
      axios.get('/static/coin/' + coinId + '/' + name + '.json')
      .then(response => {
        seriesOptions[i] = {
          name: name,
          data: response.data,
          pointStart: Date.UTC(2016, 1, 30),
          pointInterval: 3600 * 1000 * 24 // one hour
        }
        // As we're loading the data asynchronously, we don't know what order it will arrive. So
        // we keep a counter and create the chart when all the data is loaded.
        seriesCounter += 1
        if (seriesCounter === names.length) {
          createChart()
        }
      })
      .catch(e => {
        this.errors.push(e)
      })
    })
  }
}
</script>
