<template lang="pug">
  .mdl-layout__content
    .mdl-grid
      .mdl-cell.mdl-cell--12-col
        .list
          h3.page-title Bitcointalk.org sentiments
          .datatable-options.mdl-textfield.mdl-js-textfield.mdl-shadow--2dp
            input.mdl-textfield__input(v-model="query" placeholder="Search post")
          table.table.mdl-data-table.mdl-js-data-table.mdl-shadow--2dp
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
              tr(v-for="post in computedList" key="tr" class="table-row-item" :to="'/post/' + post.topicId" v-on:click="goToPost(post.topicId, post.announce)")
                td(key="announce") {{ post.announce }}
                td(key="replies") {{ post.NumReplies }}
                td(key="lastComment") {{ post.DateTimeLastPost }}
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
import { mapState } from 'vuex'
export default {
  name: 'list',
  data: () => ({
    query: '',
    sortBy: '',
    sortOrder: '',
    postsList: []
  }),
  mounted () {
    document.querySelector('.mdl-layout').classList.remove('mdl-layout--fixed-right-drawer')
  },
  methods: {
    dataHref: function (url, event) {
      event.preventDefault()
      event.stopPropagation()
      window.open(url, '_blank')
    },
    goToPost(topicId, announce) {
      routes.push({ name: 'Post', params: { id: topicId, announce: announce }})
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
      let list = this.assets
      list = list.filter(function (item) {
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
      // TODO: сломал
      // list = list.map((currElement, index) => {
      //   currElement['DateTimeLastPost'] = moment(currElement.DateTimeLastPost).calendar()
      // })
      // console.log(list)
      list = list.slice(0, 100)
      return list
    },
    ...mapState([
      'assets'
    ])
  }
}
</script>

<style lang="sass">
  .datatable-options
    padding: .75rem 1rem !important
    background-color: #FAFAFC
    border: 1px solid #DDDDEE
    border-bottom: 0
    width: 100% !important
    input
      width: calc(100% - 14px)
      border: 1px solid #ccc
      padding: 7px
      background: #fff
  .table
    border: 1px solid #DDDDEE
    width: 100% !important
    white-space: normal !important
    tr
      th, td
        text-align: center
        &:first-child
          text-align: left
          width: 100%
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
    thead tr
      th
        user-select: none
        font-weight: bold
        background-color: #FAFAFC
        span
          vertical-align: middle
    tbody tr
      cursor: pointer
      .links
        white-space: nowrap
        .material-icons
          opacity: .7
          color: rgb(63, 81, 181) !important
          &:hover
            opacity: 1
</style>
