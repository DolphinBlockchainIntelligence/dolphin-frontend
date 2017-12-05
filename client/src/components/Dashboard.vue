<template>
  <div>
    <div v-if="!user" class="not-auth-intro">
      <div>
        <h4 class="title">The first marketplace based on a smart-contract and a platform for collaborative crypto-asset investment analysis</h4>
      </div>
      <div class="features">
        <div class="feature">
          <img src="/static/img/features/stopwatch.png" alt="">
          <h3>Enhanced Analysis Speed</h3>
          <p>The platform combines speed of machine learning algorithms with versatility and depth of expert evaluation to provide subscribers with tools for a swifter and more flexible decision-making process</p>
        </div>
        <div class="feature">
          <img src="/static/img/features/network.png" alt="">
          <h3>Collaboration</h3>
          <p>The platform enables collaboration and knowledge sharing between participants, allowing for opinion variety and broadening the scope of analysis</p>
        </div>
        <div class="feature">
          <img src="/static/img/features/customer.png" alt="">
          <h3>Expert rating system</h3>
          <p>A transparent and attack-proof rating system allows the experts to make a profit out of their contributions</p>
        </div>
        <div class="feature">
          <img src="/static/img/features/settings.png" alt="">
          <h3>Custom widgets</h3>
          <p>Independent authors can create their own widgets and deploy them on the platform, enriching it with new features and simultaneously making profit</p>
        </div>
      </div>
      <a href="https://presale.dolphin.bi/" target="_blank" class="read-more">read more</a>
    </div>
    <Navbar>
      <span slot="page-title">Market overview</span>
      <li slot="nav" v-if="user">
        <a href="#" class="btn btn-outline-info button-customize" @click.prevent="toggleSettings($event)"><i class="material-icons left">settings</i></a>
      </li>
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
              <div class="widget-header">
                <div class="title">{{item.title}}</div>
                <div class="actions">
                  <a href="#"><i class="material-icons" @click.prevent="showSettings($event)">settings</i></a>
                  <a href="#"><i class="material-icons" @click.prevent="showHelp($event)">help_outline</i></a>
                </div>
              </div>
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
      'widgets',
      'user'
    ])
  },
  mounted: function() {
    document.getElementById('main').classList.remove('center')
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
        event.currentTarget.querySelector('span').textContent = 'Save settings'
      } else {
        event.currentTarget.querySelector('span').textContent = 'Customize'
      }
      document.querySelectorAll('.iframe-mask').forEach(function(item, i){
        item.classList.toggle('hide')
      })
    },
    showSettings: function(event) {
      var widget = event.currentTarget.parentElement.parentElement.parentElement.parentElement
      widget.getElementsByTagName('iframe')[0].setAttribute('src', '/settings.html')
      // console.log(this.widgets)
    },
    showHelp: function(event) {
      var widget = event.currentTarget.parentElement.parentElement.parentElement.parentElement
      widget.getElementsByTagName('iframe')[0].setAttribute('src', '/help.html')
    }
  }
}
</script>

<style lang="sass">
.not-auth-intro
  display: flex
  justify-content: center
  align-items: center
  margin: 0
  margin-top: -20px
  background: #ddd
  flex-direction: column
  margin-bottom: 30px
  padding: 16px
  // background: #ffe891
  box-shadow: 0 0 20px 5px rgba(0,0,0,.05)
  .title
    font-size: 20px
    margin-bottom: 18px
  .features
    display: flex
    justify-content: center
    align-items: center
    align-items: left
    .feature
      display: flex
      justify-content: center
      align-items: center
      flex-direction: column
      flex: 1 1 25%
      &+.feature
        margin-left: 30px
      h3
        font-size: 18px
    img
      height: 60px
      margin-bottom: 18px
  .read-more
    display: block
    text-align: right
    width: 100%

.vue-grid-layout
  margin: 0 -10px 100px
.vue-grid-item
  // border: 1px solid #ddd
.widget
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: white
  overflow: hidden
  box-shadow: 0 0 10px 5px rgba(0,0,0,.05)
  .widget-header
    border-bottom: 1px solid #ddd
    height: 30px
    display: flex
    align-items: center
    padding: 0 7px
    justify-content: center
    .title
      flex: 1 0 auto
    .actions
      display: flex
      a
        color: #bebebe
        line-height: 1rem
        margin-left: 4px
        &:hover
          color: #0a0a0a
      .material-icons
        font-size: 1rem
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
