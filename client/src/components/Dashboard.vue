<template>
  <grid-layout
    :layout="widgets"
    :col-num="12"
    :row-height="30"
    :is-draggable="true"
    :is-resizable="true"
    :margin="[0, 0]"
    :use-css-transforms="true"
  >
    <grid-item v-for="item in widgets"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :key="item.id"
      @resized="resizedWidget()">
        <div class="widget" :is="item.name">
          <!-- <div class="widget-header">{{item.title}}</div> -->
          <div class="iframe-wrapper">
            <iframe :src="item.src" scrolling="no" />
          </div>
        </div>
    </grid-item>
  </grid-layout>
</template>

<script>
let testLayout = [
  {'x':0,'y':0,'w':12,'h':10,'i':'0','name': 'SentimentsLineChart', 'title': 'SentimentsLineChart', 'src': 'http://178.218.115.169:5003/#/experts-evaluations/1'},
  {'x':0,'y':10,'w':12,'h':10,'i':'1','name': 'SentimentsComments', 'title': 'SentimentsComments', 'src': 'http://178.218.115.169:5003/#/experts-evaluations/1'},
  {'x':0,'y':20,'w':12,'h':10,'i':'2','name': 'ExpertsEvaluations', 'title': 'ExpertsEvaluations', 'src': 'http://178.218.115.169:5003/#/experts-evaluations/1'}
];
import VueGridLayout from 'vue-grid-layout'
let GridLayout = VueGridLayout.GridLayout
let GridItem = VueGridLayout.GridItem

import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: 'post',
  data: () => ({
    id: '',
    widgets: testLayout,
    topicStarterUrl: '',
    topicUrl: '',
  }),
  components: {
    GridLayout,
    GridItem
  },
  created () {
    // this.searchEsc()
  },
  mounted () {
    // TODO: Add and remove widget
    this.$root.$on('addWidget', (widgetName) => {
      this.widgets.push({'i': this.widgets.length+1, 'name': widgetName, 'title': 'Widget name', 'x': 0, 'y': 0, 'w': 12, 'h': 10})
    })
    this.$root.$on('removeWidget', (i) => {
      this.widgets = _.reject(this.widgets, { 'i': i })
    })
    this.clearSearchResults()
  },
  computed: {
    announce (state) {
      if (this.$route.params.announce) {
        return this.$route.params.announce
      } else {
        for (var i in this.assets) {
          if (this.$route.params.id == this.assets[i].topicId) {
            return this.assets[i].announce
          }
        }
      }
    },
    ...mapState([
      'assets'
    ])
  },
  methods: {
    searchEsc () {
      document.querySelectorAll('#search-result li').forEach(function(item){
        item.classList.remove('active')
      })
      document.getElementById('search-result').classList.add('hide')
    },
    toggleSettings: () => {
      document.querySelector('.mdl-layout').classList.toggle('mdl-layout--fixed-right-drawer')
    },
    toggleFavorite: (event) => {
      let icon = event.target.innerHTML
      if (icon == 'star') {
        this.$root.$emit('removeFavoriteCoins', this.id)
        event.target.innerHTML = 'star_border'
      } else {
        this.$root.$emit('addFavoriteCoins', { id: this.id, name: this.announce })
        event.target.innerHTML = 'star'
      }
    },
    clearSearchResults: () => {
      document.getElementById('search-icon-clear').classList.add('hide')
      document.getElementById('search-icon').classList.remove('hide')
    },
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
  padding: 0 50px
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
