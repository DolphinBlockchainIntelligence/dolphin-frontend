<template>
  <grid-layout
    :layout="widgets"
    :col-num="12"
    :row-height="30"
    :is-draggable="true"
    :is-resizable="true"
    :margin="[25, 25]"
    :use-css-transforms="true"
  >
    <grid-item v-for="item in widgets"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :key="item.name"
      @resized="resizedWidget()">
        <div class="widget">
          <!-- <div class="widget-header">{{item.title}}</div> -->
          <div class="iframe-wrapper">
            <iframe :src="'https://cloud.petrusenko.pro/apps/'+item.url" scrolling="no" />
          </div>
        </div>
    </grid-item>
  </grid-layout>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'
let GridLayout = VueGridLayout.GridLayout
let GridItem = VueGridLayout.GridItem

import axios from 'axios'
export default {
  name: 'post',
  data: () => ({
    widgets: [],
    pages: [], 
  }),
  components: {
    GridLayout,
    GridItem
  },
  created () {
  },
  mounted () {
    // axios.get('/static/data/dns.json', {
    axios.get('https://cloud.petrusenko.pro/dashboard/apps', {
    }).then((response) => {
      var widgets = response.data.widgets
      var y = 0
      widgets.forEach((item, i) => {
        item.x = 0
        item.y = 0
        item.w = 12
        item.h = 10
        item.name = item.title.split(' ').join('')
        item.i = i.toString()
        y+=10
      })
      this.widgets = widgets
      this.pages = response.data.pages
    }, (err) => {
      console.log(err)
    })
  },
  methods: {
    resizedWidget: () => {
      window.dispatchEvent(new Event('resize'))
    }
  }
}
</script>

<style lang="sass">
.vue-grid-item
  border: 1px solid #ddd
.widget
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  padding: 0 25px
  background: white
  .iframe-wrapper
    overflow: hidden
    width: 100%
    height: 100%
    iframe
      width: 100%
      height: 100%
      overflow: hidden
      html, body
        overflow: hidden !important
</style>
