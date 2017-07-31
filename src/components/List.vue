<template lang="pug">
  .container.list
    h3.page-title Bitcointalk.org sentiments
    .datatable-options
      b-form-input(v-model="query" placeholder="Search")
    table.table.table-hover.table-striped
      thead
        tr
          th(v-on:click="sort('announce')")
            span Announce
            i.material-icons
          th(v-on:click="sort('NumReplies')")
            span Replies
            i.material-icons
          th(v-on:click="sort('DateTimeLastPost')")
            span Last comment
            i.material-icons
          th(v-on:click="sort('rank')")
            span Rank
            i.material-icons
          th
      tbody(name="table-row")
        tr(v-for="post in computedList" key="tr" class="table-row-item" :to="'/post/' + post.topicId" v-on:click="goToPost(post.topicId)")
          td(key="announce") {{ post.announce }}
          td(key="replies") {{ post.NumReplies }}
          td(key="views") {{ post.DateTimeLastPost }}
          td(key="rank") {{ post.rank }}
          td.links(key="links")
            a(v-on:click="dataHref(post.topicStarterUrl, $event)")
              i.material-icons account_circle
            a(v-on:click="dataHref(post.topicUrl, $event)")
              i.material-icons assignment
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
import Vue from 'vue'
import routes from '../router'
import moment from 'moment'
export default {
  name: 'list',
  data: () => ({
    query: '',
    sortBy: '',
    sortOrder: '',
    postsList: []
  }),
  created () {
    let component = this
    axios.get('/static/data/announceList.json', {
      headers: {'Cache-Control': 'private, max-age=0, no-cache'}
    })
    .then(response => {
      this.postsList = Object.values(response.data)
      this.postsList.map((currElement, index) => {
        currElement.DateTimeLastPost = moment(currElement.DateTimeLastPost).calendar()
      })
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    dataHref: function (url, event) {
      event.preventDefault()
      event.stopPropagation()
      window.open(url, '_blank')
    },
    goToPost(url) {
      routes.push({ name: 'Post', params: { id: url }})
    },
    sort: function (sortBy) {
      this.sortBy = sortBy
      let classList = event.currentTarget.querySelector('i').classList
      let siblings = document.querySelectorAll('.table thead tr .material-icons').forEach(function(item) {
        item.classList.remove('up')
        item.classList.remove('down')
      })
      if (this.sortOrder == 'asc') {
        this.sortOrder = 'desc'
        classList.remove('up')
        classList.add('down')
      } else {
        this.sortOrder = 'asc'
        classList.remove('down')
        classList.add('up')
      }
    }
  },
  computed: {
    computedList: function () {
      let vm = this
      let list = this.postsList.filter(function (item) {
        return list = item.announce.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
      })
      if (this.sortBy) {
        list = _.orderBy(list, ['hasRank', this.sortBy], ['asc', this.sortOrder])
      } else {
        list = _.orderBy(list, ['hasRank', 'rank', 'NumReplies', 'DateTimeLastPost', 'announce'], ['asc', 'asc', 'desc', 'desc', 'asc'])
      }
      list = list.map((currElement, index) => {
        currElement['order'] = ++index
        return currElement
      })
      return list
    }
  }
}
</script>

<style lang="sass">
.datatable-options
  padding: .75rem 1rem
  background-color: #FAFAFC
  border: 1px solid #DDDDEE
  border-bottom: 0
.table
  border: 1px solid #DDDDEE
  tr
    th
      white-space: nowrap
    td
      border-right-color: #DDDDEE
      background-color: #fff
      border-radius: 0
    &:nth-child(even) > td
      background-color: #FAFAFA
  thead tr th
    user-select: none
    font-weight: bold
    background-color: #FAFAFC
    span
      vertical-align: middle
    .material-icons
      vertical-align: middle
      font-size: 16px
      &.down::after
        content: 'arrow_downward'
      &.up::after
        content: 'arrow_upward'
  tbody tr
    cursor: pointer
    .links
      white-space: nowrap
      .material-icons
        opacity: .7
        &:hover
          opacity: 1
</style>
