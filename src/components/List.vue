<template>
<div class="container">
  <h3>Listing</h3>
  <router-link :to="about"></router-link>
  <!-- :options="options" -->
  <v-client-table :data="coinsList" :columns="columns">
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
// import router from '../router'
import router from 'vue-router'
Vue.use(ClientTable)
export default {
  name: 'list',
  data: () => ({
    coinsList: [],
    columns: ['announce', 'NumReplies', 'NumViews', 'edit']
  }),
  options: {
    // templates:{
    //    edit
    // }
  },
  created () {
    axios.get('/static/data/coinsList.json')
    .then(response => {
      this.coinsList = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
    Event.$on('vue-tables.row-click', function (data) {
      // console.log(data.row.topicId)
      // router.push({ name: 'Coin', params: { id: 1014145 }})
      this.$router.push('about')
      console.log(this)
    })
  },
  methods: {
    tableOnLoaded: function () {
      console.log('hi liveedu')
    }
  },
  components: {
    'edit': Edit
  }
}
</script>

<style lang="sass">
.VueTables .col-md-6
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
