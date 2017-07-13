<template>
  <main class="mdl-layout__content">
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--12-col">
        <div class="page-content">
          <div v-if="!chartError">
            <div id="container" style="min-width: 310px; height: 400px; margin: 0 auto" />
            <br/>
          </div>
          <div v-if="!commentsError">
            <h4>Comments:</h4>
            <ul class="comments">
              <li v-for="(comment, key) in comments" :class="'comment sentiment'+comment.Sentiment">
                <div class="heading">
                  <div class="author">{{ comment.user }}:</div>
                  <div class="date">{{ comment.date }}:</div>
                </div>
                <a :href="'https://bitcointalk.org/index.php?topic='+comment.topicId+'.msg'+key+'#msg'+key" target="_blank" class="text">{{ comment.text }}:</a>
              </li>
            </ul>
          </div>
          <div class="nodata" v-if="chartError && commentsError">
            <p>Data not find</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
const Highcharts = require('highcharts/highstock')
const colors = ['#f98a83', '#989898', '#85f77e']
export default {
  name: 'post',
  data: () => ({
    heading: '',
    comments: [],
    chartError: false,
    commentsError: false
  }),
  created () {
    axios.get('/static/data/announceList.json')
    .then(response => {
      let headings = Object.values(response.data)
      for (var i in headings) {
        if (this.$route.params.id == headings[i].topicId) {
          this.heading = headings[i].announce
        }
      }
    })
    .catch(e => {
      this.errors.push(e)
    })
    // document.querySelector('body').classList.remove('body-landing-lite')
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
    const postId = this.$route.params.id
    let names = ['positive', 'neutral', 'negative']
    let component = this
    axios.get('/static/data/btt-sentiments/S'+ postId +'.json')
    .then(response => {
      let data = response.data
      let chartData = {
        negative: [],
        neutral: [],
        positive: [],
        pointStart: ''
      }
      let dates = []
      let names = ['negative', 'neutral', 'positive']
      chartData.negative = data.chart.negative
      chartData.neutral = data.chart.neutral
      chartData.positive = data.chart.positive
      chartData.pointStart = data.pointStart
      names.forEach(function (name, i) {
        seriesOptions[i] = {
          name: name,
          data: chartData[name],
          color: colors[i],
          pointStart: chartData.pointStart * 10,
          pointInterval: 3600 * 1000 * 24
        }
        seriesCounter += 1
        if (seriesCounter === names.length) {
          createChart()
        }
      })
    })
    .catch(e => {
      this.chartError = true
      this.errors.push(e)
    })

    axios.get('/static/data/btt-sentiments/D'+ postId +'.json')
    .then(response => {
      this.comments = response.data
    })
    .catch(e => {
      this.commentsError = true
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
  .nodata
    width: 100%
    height: 400px
    display: flex
    justify-content: center
    align-items: center
    border: 1px solid #ccc
</style>
