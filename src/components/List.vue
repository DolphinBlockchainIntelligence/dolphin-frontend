<template lang="pug">
  .container.list
    h3 {{$t('coinsList')}}
    v-client-table(:data='coinsList', :columns='columns', :options='options')
      template(slot='links', scope='props')
        .links
          a(v-on:click='dataHref(props.row.topicUrl, $event)')
            i.material-icons account_circle
          a(v-on:click='dataHref(props.row.topicUrl, $event)')
            i.material-icons assignment
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import {ClientTable, Event} from 'vue-tables-2'
import routes from '../router'
Vue.use(ClientTable)
export default {
  name: 'list',
  data: () => ({
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
    axios.get('/static/data/coinsList.json')
    .then(response => {
      this.coinsList = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
    Event.$on('vue-tables.row-click', function (data) {
      routes.push({ name: 'Coin', params: { id: data.row.topicId }})
    })
  },
  methods: {
    dataHref: function (url, event) {
      event.preventDefault()
      event.stopPropagation()
      window.open(url, '_blank')
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
</style>
