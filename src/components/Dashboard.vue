<template>
  <main class="mdl-layout__content">
    <h1>test</h1>
    <!-- <Grid></Grid> -->
    <div id="root"></div>
  </main>
</template>

<script>
import Vue from 'vue'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactGridLayout from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import App from './blocks/App.js'

import VueReact from 'vue-react'
Vue.use(VueReact)
Vue.react('Grid', App)

export default {
  name: 'post',
  data: () => ({
  }),
  components: {
    // SentimentsLineChart,
    // Grid
  },
  created () {
    // this.searchEsc()
  },
  mounted () {
    // console.log(ReactDOM)
    // ReactDOM.render(
    //   React.createElement(App, null, null),
    //   // <App />,
    //   document.getElementById('root')
    // )
  }
}
</script>

<style lang="sass">

</style>
