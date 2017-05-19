<template>
<div class="radarList">
  <h1>work</h1>
  <v-client-table :data="coinsList" :columns="columns" :options="options"></v-client-table>
</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import {ClientTable} from 'vue-tables-2'
Vue.use(ClientTable)
export default {
  name: 'list',
  data: () => ({
    coinsList: [],
    columns: ['announce', 'NumReplies', 'NumViews']
  }),
  created () {
    axios.get('/static/data/coinsList.json')
    .then(response => {
      this.coinsList = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>
