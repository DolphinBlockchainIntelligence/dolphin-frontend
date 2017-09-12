<template>
<div>
  <Navbar>
    <span slot="page-title">Bitcointalk.org sentiments</span>
  </Navbar>
  <div class="content-wrapper">
    <div class="datatable-options mdl-textfield mdl-js-textfield mdl-shadow--2dp">
      <input class="mdl-textfield__input" v-model="query" placeholder="Search post" />
    </div>
    <table class="table mdl-data-table mdl-js-data-table mdl-shadow--2dp">
      <thead>
        <tr>
          <th @click="sort('announce')">
            <span>Announce</span>
            <i class="material-icons"></i>
          </th>
          <th @click="sort('NumReplies')">
            <span>Replies</span>
            <i class="material-icons"></i>
          </th>
          <th @click="sort('DateTimeLastPost')">
            <span>Last comment</span>
            <i class="material-icons"></i>
          </th>
          <th @click="sort('rank')">
            <span>Rank</span>
            <i class="material-icons"></i>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody name="table-row">
        <tr v-for="post in computedList" key="tr" class="table-row-item" :to="'/post/' + post.topicId" @click="goToPost(post.topicId, post.announce)">
          <td key="announce">{{ post.announce }}</td>
          <td key="replies">{{ post.NumReplies }}</td>
          <td key="lastComment">{{ post.DateTimeLastPost }}</td>
          <td key="rank">{{ post.rank }}</td>
          <td class="links" key="links">
            <a href="#" @click="dataHref(post.topicStarterUrl, $event)">
              <i class="material-icons">account_circle</i>
            </a>
            <a href="#" @click="dataHref(post.topicUrl, $event)">
              <i class="material-icons">assignment</i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <p align="center">
      <a class="waves-effect waves-light btn btn-show-all" @click.prevent="toShowAll($event)">Show all</a>
    </p>
  </div>
</div>
</template>


<script>
import _ from 'lodash'
import axios from 'axios'
import Vue from 'vue'
import routes from '../router'
import moment from 'moment'
import { mapState, mapActions } from 'vuex'
import Navbar from './blocks/Navbar'
export default {
  name: 'sentiments',
  data: () => ({
    query: '',
    sortBy: '',
    sortOrder: '',
    postsList: [],
    showNumber: 100,
    showAll: false
  }),
  components: {
    Navbar
  },
  methods: {
    dataHref: function (url, event) {
      event.preventDefault()
      event.stopPropagation()
      window.open(url, '_blank')
    },
    goToPost(topicId, announce) {
      routes.push({ name: 'Sentiment', params: { id: topicId, announce: announce }})
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
    },
    toShowAll: function (event) {
      this.showAll = true
      event.currentTarget.classList.add('hide')
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
      if (!this.showAll) {
        list = list.slice(0, this.showNumber)
      }
      return list
    },
    ...mapState([
      'assets'
    ])
  }
}
</script>


<style lang="sass" scoped>
.title-box
  display: flex
  .page-title
    flex: 1 0 auto
  .select
    position: relative
    top: 11px
    border: 1px solid #ccc
    padding: 7px
    background: #fff
</style>
<style lang="sass">
td, th
  padding: 4px
tr:hover
  td, th
    background: #eee !important
</style>
<style lang="sass">
  .datatable-options
    padding: .75rem 1rem !important
    background-color: #FAFAFC
    border: 1px solid #DDDDEE
    border-bottom: 0
    width: 100% !important
    margin-top: 10px
    input
      border: 1px solid #ccc
      background: #fff
      width: calc(100% - 15px)
      border: 1px solid #ccc
      padding: 0 7px
      margin: 0
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
