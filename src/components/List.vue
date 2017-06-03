<template lang="pug">
  .container.list
    h3 {{$t("coinsList")}}
    button(v-on:click="shuffle") Shuffle
    input(v-model="query")
    table.table.table-hover.table-striped
      thead
        tr
          td: strong Announce
          td: strong Replies
          td: strong Views
          td
      tbody(name="table-row")
        tr(v-for="coin in computedList" key="tr" class="table-row-item")
          td(key="announce") {{ coin.announce }}
          td(key="replies") {{ coin.NumReplies }}
          td(key="links") {{ coin.NumReplies }}
          td.links(key="links")
            a(v-on:click="dataHref(props.row.topicStarterUrl, $event)")
              i.material-icons account_circle
            a(v-on:click="dataHref(props.row.topicUrl, $event)")
              i.material-icons assignment
</template>

<script>
import _ from 'lodash'
import Vue from 'vue'
import axios from 'axios'
import {ClientTable, Event} from 'vue-tables-2'
import routes from '../router'
Vue.use(ClientTable)

import firebase from '../firebase'

export default {
  name: 'list',
  data: () => ({
    query: '',
    coinsList: [],
    columns: ['announce', 'NumReplies', 'NumViews', 'links'],
    options: {
      headings: {
        announce: 'Announce',
        NumReplies: 'Replies',
        NumViews: 'Views',
        links: ''
      }
    }
  }),
  created () {
    let component = this
    firebase.database().ref('/coinsList/').once('value').then(function(snapshot) {
      component.coinsList = snapshot.val()
    })
    Event.$on('vue-tables.row-click', function (data) {
      console.log('FIREFOX')
      routes.push({ name: 'Coin', params: { id: data.row.topicId }})
    })
  },
  methods: {
    dataHref: function (url, event) {
      event.preventDefault()
      event.stopPropagation()
      window.open(url, '_blank')
    },
    shuffle: function () {
      this.coinsList = _.shuffle(this.coinsList)
    }
  },
  computed: {
    computedList: function () {
      var vm = this
      return this.coinsList.filter(function (item) {
        return item.announce.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
      })
    }
  }
}
</script>

<style lang="sass">
.VueTables
  tr
    cursor: pointer
  .col-md-6
    &:nth-child(2) > div
      display: flex
      justify-content: flex-end
    label
      margin-right: 7px
  .links
    white-space: nowrap
.VuePagination__pagination
  justify-content: center
.VuePagination__count
  display: none

.table-row-enter,
.table-row-leave-active,
.table-row-move
  transition: transform 3s
.table-row-item-move
  backface-visibility: hidden
</style>
