<template>
  <div class="radarList">
    <h1>work</h1>
    <v-client-table :data="coinsList" :columns="columns" :options="options"></v-client-table>
<!--     <table class="table table-hover">
      <tr>
        <th>Name</th>
        <th>Replies</th>
        <th>Views</th>
        <th></th>
      </tr>
      <tr v-for="coin in coinsList">
        <td><router-link :to="'/coin/' + coin.topicId" class="nav-link">{{ coin.announce }}</router-link></td>
        <td>{{ coin.NumReplies }}</td>
        <td>{{ coin.NumViews }}</td>
        <td class="actions"><a v-bind:href="coin.topicUrl" class="fa fa-external-link"></a><a v-bind:href="coin.topicStarterUrl" class="fa fa-user"></a></td>
      </tr>
    </table> -->
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import {ServerTable, ClientTable, Event} from 'vue-tables-2'
Vue.use(ClientTable)

export default {
  name: 'list',
  data: () => ({
    coinsList: [],
    columns: ['announce','NumReplies','NumViews']
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
