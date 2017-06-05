<template lang="pug">
  .container.list
    h3 {{$t("coinsList")}}
    b-form-input(v-model="query")
    table.table.table-hover.table-striped
      thead
        tr
          td(v-on:click="sort('announce')")
            span Announce
            i.material-icons
          td(v-on:click="sort('NumReplies')")
            span Replies
            i.material-icons
          td(v-on:click="sort('NumViews')")
            span Views
            i.material-icons
          td
      tbody(name="table-row")
        tr(v-for="coin in computedList" key="tr" class="table-row-item" :to="'/coin/' + coin.topicId" v-on:click="goToCoin(coin.topicId)")
          td(key="announce") {{ coin.announce }}
          td(key="replies") {{ coin.NumReplies }}
          td(key="views") {{ coin.NumViews }}
          td.links(key="links")
            a(v-on:click="dataHref(coin.topicStarterUrl, $event)")
              i.material-icons account_circle
            a(v-on:click="dataHref(coin.topicUrl, $event)")
              i.material-icons assignment
</template>

<script>
import _ from 'lodash'
import Vue from 'vue'
import routes from '../router'
import firebase from '../firebase'

export default {
  name: 'list',
  data: () => ({
    query: '',
    sortBy: '',
    sortOrder: '',
    coinsList: []
  }),
  created () {
    let component = this
    firebase.database().ref('/coinsList/').once('value').then(function(snapshot) {
      component.coinsList = snapshot.val()
    })
  },
  methods: {
    dataHref: function (url, event) {
      event.preventDefault()
      event.stopPropagation()
      window.open(url, '_blank')
    },
    goToCoin(url) {
      routes.push({ name: 'Coin', params: { id: url }})
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
        classList.remove('down')
        classList.add('up')
      } else if (this.sortOrder == 'desc') {
        this.sortOrder = 'asc'
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
      let list = this.coinsList.filter(function (item) {
        return item.announce.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
      })
      if (this.sortBy) {
        return _.orderBy(list, [this.sortBy], [this.sortOrder])
      } else {
        return _.orderBy(list, ['NumReplies', 'NumViews', 'announce'], ['desc', 'desc', 'asc'])
      }
    }
  }
}
</script>

<style lang="sass">
.table
  thead tr td
    user-select: none
    font-weight: bold
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
</style>
