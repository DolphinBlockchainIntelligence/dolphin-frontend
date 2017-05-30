<template lang="pug">
  .container.list
    h3 {{$t("coinsList")}}
    //-  @row-click="rowCLick(data)"
    v-client-table(:data="coinsList", :columns="columns", :options="options")
      template(slot="links", scope="props")
        .links
          a(v-on:click="dataHref(props.row.topicStarterUrl, $event)")
            i.material-icons account_circle
          a(v-on:click="dataHref(props.row.topicUrl, $event)")
            i.material-icons assignment
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import {ClientTable, Event} from 'vue-tables-2'
import routes from '../router'
Vue.use(ClientTable)

import firebase from '../firebase'

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
    let component = this
    firebase.database().ref('/coinsList/').once('value').then(function(snapshot) {
      component.coinsList = snapshot.val()
    })
    // .then(function(){
    //   console.log(component.coinsList)
    // })

    // axios.get('/static/data/coinsList.json')
    // .then(response => {
    //   this.coinsList = response.data
    // })
    // .catch(e => {
    //   this.errors.push(e)
    // })
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
    // rowCLick: function (data) {
    //   // event.preventDefault()
    //   // console.log('TEST')
    //   routes.push({ name: 'Coin', params: { id: data.row.topicId }})
    // }
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
