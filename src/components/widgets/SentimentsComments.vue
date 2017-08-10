<template>
  <div class="mdl-cell mdl-cell--6-col draggable" key="sentimentsComments">
    <div class="mdl-card mdl-shadow--2dp widget-comments">
      <div class="mdl-card__title">
        <h4 class="mdl-card__title-text">Sentiments: comments</h4>
      </div>
      <div class="mdl-card__menu">
        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect btn-info">
          <i class="material-icons">info</i>
        </button>
        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect btn-drag">
          <i class="material-icons">pan_tool</i>
        </button>
        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect btn-remove" @click="removeWidget()">
          <i class="material-icons">delete</i>
        </button>
      </div>
      <div v-if="!commentsError" class="scrolled-y">
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
import moment from 'moment'
import _ from 'lodash'
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
      axios.get('https://beta.dolphin.bi/static/data/btt-sentiments/D'+ postId +'.json')
      .then(response => {
        _.forEach(response.data, function(item, i) {
          item.date = moment(item.date).calendar()
        })
        // slice n elements from object
        const pick = (obj, keys) => 
          Object.keys(obj)
            .slice(0, keys)
            .reduce((acc, key) => {
              acc[key] = obj[key];
              return acc;
            }, {})
        this.comments = pick(response.data, 30)
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

<style lang="sass" scoped>
.scrolled-y
  overflow-y: scroll
</style>
