<template lang="pug">
.coin.container
  //h3.page-title {{ heading}}
  h3.page-title Coin
  #container(style='min-width: 310px; height: 400px; margin: 0 auto')
  br
  h4 Comments:
  ul.comments: li.comment(v-for="(comment, key) in comments" :class="'sentiment'+comment.Sentiment")
    .heading
      .author {{ comment.user }}:
      .date {{ comment.date }}
    a.text(:href="'https://bitcointalk.org/index.php?topic='+comment.topicId+'.msg'+key+'#msg'+key" target="_blank") {{ comment.text }}
</template>

<script>
import axios from 'axios'
let Highcharts = require('highcharts/highstock')
const colors = ['#f98a83', '#989898', '#85f77e']
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
          y: 30
        },
        rangeSelector: {
          selected: 4
        },
        plotOptions: {
          series: {
            showInNavigator: true
          },
        },
        series: seriesOptions
      })
    }
    const coinId = this.$route.params.id
    let names = ['positive', 'neutral', 'negative']
    let component = this
    axios.get('/static/data/btt-sentiments/S'+ coinId +'.json')
    .then(response => {
      let data = response.data
      let chartData = {
        negative: [],
        neutral: [],
        positive: [],
      }
      let dates = []
      let names = ['negative', 'neutral', 'positive']
      for (var item in data) {
        let date = new Date( item ).getTime()
        chartData.negative.push([date, data[item].negative])
        chartData.neutral.push([date, data[item].neutral])
        chartData.positive.push([date, data[item].positive])
      }
      names.forEach(function (name, i) {
        seriesOptions[i] = {
          name: name,
          data: chartData[name],
          color: colors[i]
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

    axios.get('/static/data/btt-sentiments/D'+ coinId +'.json')
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
        display: block
        color: #292b2c
        text-decoration: none
        cursor: pointer
        opacity: .8
        &:hover
          opacity: 1
  .sentiment0 .text
    background: #f98a83
  .sentiment1 .text
    background: #dddddd
  .sentiment2 .text
    background: #85f77e
</style>
