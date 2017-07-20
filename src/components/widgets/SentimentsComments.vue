<template>
  <div class="mdl-cell mdl-cell--6-col draggable" key="sentimentsComments">
    <div class="mdl-card mdl-shadow--2dp widget-comments">
      <div class="mdl-card__title">
        <h4 class="mdl-card__title-text">Sentiments: comments</h4>
      </div>
      <div class="mdl-card__menu">
        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
          <i class="material-icons">info</i>
        </button>
        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
          <i class="material-icons">pan_tool</i>
        </button>
        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
          <i class="material-icons">filter_list</i>
        </button>
        <button id="demo-menu-lower-right"
                class="mdl-button mdl-js-button mdl-button--icon">
          <i class="material-icons">more_vert</i>
        </button>
        <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
            for="demo-menu-lower-right">
          <li class="mdl-menu__item">Some Action</li>
          <li class="mdl-menu__item">Another Action</li>
          <li disabled class="mdl-menu__item">Disabled Action</li>
          <li class="mdl-menu__item">Yet Another Action</li>
        </ul>
        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" @click="removeWidget()">
          <i class="material-icons">delete</i>
        </button>
      </div>
      <div v-if="!commentsError">
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
    </div>
  </div>
</template>


<script>
import axios from 'axios'
const Highchart = require('highcharts')
const Highstock = require('highcharts/highstock')
const Sortable = require('sortablejs')
import draggable from 'vuedraggable'
const colors = ['#f98a83', '#989898', '#85f77e']
export default {
  name: "sentimentsComments",
  props: ['id'],
  data: function data() {
    return {
      commentsError: false,
      comments: []
    }
  },
  mounted () {
    this.sentimentsComments()
  },
  methods: {
    sentimentsComments: function () {
      const postId = this.$route.params.id
      axios.get('/static/data/btt-sentiments/D'+ postId +'.json')
      .then(response => {
        this.comments = response.data
      })
      .catch(e => {
        this.commentsError = true
        this.errors.push(e)
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
