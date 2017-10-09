<template>
  <div>
    <Navbar>
      <span slot="page-title">Dashboard</span>
      <li slot="nav"><a href="#" class="waves-effect waves-light btn" @click.prevent="toggleSettings($event)"><i class="material-icons left">settings</i><span>Customize</span></a></li>
    </Navbar>
    <div class="content-wrapper">
      <grid-layout
        :layout="widgets"
        :col-num="12"
        :row-height="30"
        :is-draggable="isDraggable"
        :is-resizable="isResizable"
        :margin="[10, 10]"
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
            <div class="widget">
              <div class="widget-header">{{item.title}}</div>
              <div class="iframe-mask hide"></div>
              <div class="iframe-wrapper">
                <iframe v-if="item.id" :src="'/apps/'+item.url+'?id='+item.id" frameborder="0" />
                <iframe v-else :src="'/apps/'+item.url" frameborder="0" />
              </div>
            </div>
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>


<script>
import Navbar from './blocks/Navbar'
import { GridLayout, GridItem } from 'vue-grid-layout'
import { mapState } from 'vuex'
export default {
  name: 'dashboard',
  data: () => ({
    isDraggable: false,
    isResizable: false,
    pageTitle: 'Dashboard'
  }),
  components: {
    GridLayout,
    GridItem,
    Navbar
  },
  computed: {
    ...mapState([
      'widgets'
    ])
  },
  methods: {
    resizedWidget: () => {
      window.dispatchEvent(new Event('resize'))
    },
    toggleSettings: function(event) {
      this.isDraggable = !this.isDraggable
      this.isResizable = !this.isResizable
      let btnText = event.currentTarget.querySelector('span').textContent
      if (btnText == 'Customize') {
        event.currentTarget.querySelector('span').textContent = 'Cancel'
      } else {
        event.currentTarget.querySelector('span').textContent = 'Customize'
      }
      document.querySelectorAll('.iframe-mask').forEach(function(item, i){
        item.classList.toggle('hide')
      })
    }
  }
}
</script>

<style lang="sass">
.vue-grid-layout
  margin: 0 -10px 100px
.vue-grid-item
  border: 1px solid #ddd
.widget
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: white
  overflow: hidden
  .widget-header
    border-bottom: 1px solid #ddd
    height: 30px
    display: flex
    align-items: center
    padding: 0 7px
  .iframe-mask
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
  .iframe-wrapper
    overflow: hidden
    width: 100%
    height: 100%
    height: calc(100% - 30px)
    overflow: hidden
    iframe
      width: 100%
      height: 100%
      overflow-y: scroll
</style>
