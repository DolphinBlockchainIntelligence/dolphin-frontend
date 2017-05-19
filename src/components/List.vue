<template>
<div class="container">
  <h3>Listing</h3>
  <v-client-table :data="coinsList" :columns="columns" :options="options">
    <template slot="edit" scope="props">
      <edit></edit>
    </template>
  </v-client-table>
</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import {ClientTable, Event} from 'vue-tables-2'
import Edit from './Edit.vue'
import routes from '../router'
Vue.use(ClientTable)
export default {
  name: 'list',
  data: () => ({
    coinsList: [],
    columns: ['announce', 'NumReplies', 'NumViews', 'edit'],
    options: {
      // columnsClasses: {
      //   NumReplies: 'Replies'
      // },
      headings: {
        announce: 'Announce',
        NumReplies: 'Replies',
        NumViews: 'Views',
        edit: ''
      }
      // ['Announce', 'Num replies', 'Num views', 'Edit']
    }
  }),
  // options: {
  //   headings: ['Announce', 'Num replies', 'Num views', 'Edit']
  //   // templates:{
  //   //    edit
  //   // }
  // },
  created () {
    axios.get('/static/data/coinsList.json')
    .then(response => {
      this.coinsList = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
    Event.$on('vue-tables.row-click', function (data) {
      // let id = data.row.topicId
      // routes.push({ name: 'Coin', params: { id: 1014145 }})
      routes.push({ name: 'Coin', params: { id: data.row.topicId }})
    })
  },
  // methods: {
  //   tableOnLoaded: function () {
  //   }
  // },
  components: {
    'edit': Edit
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
.VuePagination__pagination
  justify-content: center
.VuePagination__count
  display: none
</style>
