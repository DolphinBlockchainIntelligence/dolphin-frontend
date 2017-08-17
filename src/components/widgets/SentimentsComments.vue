<template>
  <div id="sentiments-comments">
    <h4 class="title">Sentiments: comments</h4>
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
      axios.get('http://178.218.115.169/btt-sentiments/D'+ postId +'.json')
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
.title
  margin: 0 10px
.scrolled-y
  overflow-y: scroll
</style>
