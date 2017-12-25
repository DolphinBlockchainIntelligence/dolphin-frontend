<template>
  <div>
    <div v-if="!user" class="not-auth-intro">
      <div>
        <h4 class="title">The first marketplace based on a smart-contract and a platform for collaborative crypto-asset investment analysis</h4>
      </div>
      <div class="features">
        <div class="feature">
          <a href="https://presale.dolphin.bi/#keyfeatures" target="_blank"><img src="/static/img/features/stopwatch.png" alt=""></a>
          <h3>Enhanced Analysis Speed</h3>
          <p>We combine speed of machine learning algorithms with versatility and depth of expert knowledge to provide swifter and more flexible <nobr>decision-making</nobr> process</p>
        </div>
        <div class="feature">
          <a href="https://presale.dolphin.bi/#keyfeatures" target="_blank"><img src="/static/img/features/network.png" alt=""></a>
          <h3>Collaboration</h3>
          <p>We enables collaboration and knowledge sharing between participants, allowing for opinion variety and broadening the scope of analysis</p>
        </div>
        <div class="feature">
          <a href="https://presale.dolphin.bi/#keyfeatures" target="_blank"><img src="/static/img/features/customer.png" alt=""></a>
          <h3>Expert rating system</h3>
          <p>A transparent and <nobr>attack-proof</nobr> rating system allows the experts to make a profit out of their contributions</p>
        </div>
        <div class="feature">
          <a href="https://presale.dolphin.bi/#keyfeatures" target="_blank"><img src="/static/img/features/settings.png" alt=""></a>
          <h3>Custom widgets</h3>
          <p>Independent authors can create their own widgets and deploy them on the platform, enriching it with new features and simultaneously making profit</p>
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
      <!-- <div v-if="!user">
        <div v-for="widget in widgets" class="widget" :key="widget.id">
          <div class="widget-header">
            <div class="title">{{widget.title}}</div>
            <div class="actions">
              <a href="#"><i class="material-icons" @click.prevent="showSettings($event)">settings</i></a>
              <a href="#"><i class="material-icons" @click.prevent="showHelp($event)">help_outline</i></a>
            </div>
          </div>
          <div class="iframe-mask hide"></div>
          <div class="iframe-wrapper">
            <iframe v-if="widget.id" :src="'/apps/'+widget.url+'?id='+widget.id" frameborder="0" />
            <iframe v-else :src="'/apps/'+widget.url" frameborder="0" />
          </div>
        </div>
        <div>пустой виджет</div>
      </div> -->
      <grid-layout
        :layout="widgets"
        :col-num="12"
        :row-height="30"
        :is-draggable="isDraggable"
        :is-resizable="isResizable"
        :margin="[10, 10]"
        :use-css-transforms="true"
        @layout-updated="layoutUpdatedEvent"
      >
        <grid-item v-for="widget in widgets"
          :x="widget.x"
          :y="widget.y"
          :w="widget.w"
          :h="widget.h"
          :i="widget.i"
          :key="widget.id"
          @resized="resizedWidget()">
            <div class="widget">
              <div class="widget-header">
                <div class="title">{{widget.title}}</div>
                <div class="actions">
                  <a href="#"><i class="material-icons" @click.prevent="showSettings($event)">settings</i></a>
                  <a href="#"><i class="material-icons" @click.prevent="showHelp($event)">help_outline</i></a>
                </div>
              </div>
              <div class="iframe-mask hide"></div>
              <div class="iframe-wrapper">
                <iframe v-if="widget.id" :src="'/apps/'+widget.url+'?id='+widget.id" frameborder="0" />
                <iframe v-else :src="'/apps/'+widget.url" frameborder="0" />
              </div>
            </div>
        </grid-item>
        <!-- <grid-item :key="blank" :x="authX" :y="authY" :w="authW" :h="authH" class="login-widget">
          <div>Please <a href="/#/auth">log in</a> or <a href="/#/auth">sign up</a> to add widgets you want</div>
        </grid-item> -->
      </grid-layout>
    </div>
  </div>
</template>


<script>
import { mapState } from 'vuex'
import axios from 'axios'
import Navbar from './blocks/Navbar'
import { GridLayout, GridItem } from 'vue-grid-layout'

export default {
  name: 'dashboard',
  data: () => ({
    isDraggable: false,
    isResizable: false,
    pageTitle: 'Dashboard',
    widgets: [],
    pages: [],
    authX: null,
    authY: null,
    authW: null,
    authH: null
  }),
  components: {
    GridLayout,
    GridItem,
    Navbar
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  mounted: function() {
    document.getElementById('main').classList.remove('center')
    this.loadWidgets()
  },
  methods: {
    layoutUpdatedEvent: function(newLayout){
      // console.log("Updated layout: ", newLayout)
      console.log("Updated layout:")
    },
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
    },
    loadWidgets: function(){
      if (!this.user) {
        axios.get('/dashboard/apps', {
        }).then((response) => {
          const defaultId = 583449
          // widgets
          var widgets = response.data.widgets
          widgets = widgets.filter((item) => {
            return (item.url.search(/sentiments/i) < 0)
          })
          widgets.forEach(function(item, i){
            item.i = i.toString()
            item.x = (i%2)*6
            item.y = i*10
            item.w = 6
            item.h = 10
            item.name = item.title.split(' ').join('')
          })
          this.authX = ((widgets.length-2)%2)*6
          this.authY = (widgets.length-3)*10
          this.authW = 6
          this.authH = 10
          this.widgets = widgets
          // commit('SET_WIDGETS_LIST', { list: widgets})
          // pages
          var pages = response.data.pages
          pages.forEach(function(item, i){
            item.id = item.title.toLowerCase().split(' ').join('-')
          })
          // commit('SET_PAGES_LIST', { list: pages })
          this.pages = pages

          // var domGridItems = document.getElementsByClassName('vue-grid-item')
          // console.log(domGridItems)
          // console.log(domGridItems[0].classList.add('red'))
        }, (err) => {
          console.log(err)
        })
      } else {
        axios.get('/dashboard/'+this.user.dashboards[0], {
        }).then((response) => {
          const defaultId = 583449
          // widgets
          var widgets = response.data.widgets
          widgets = widgets.filter((item) => {
            return (item.url.search(/sentiments/i) < 0)
          })
          widgets.forEach(function(item, i){
            item.i = i.toString()
            item.x = (i%2)*6
            item.y = i*10
            item.w = 6
            item.h = 10
            item.name = item.title.split(' ').join('')
          })
          this.widgets = widgets
          // pages
          var pages = response.data.pages
          pages.forEach(function(item, i){
            item.id = item.title.toLowerCase().split(' ').join('-')
          })
          this.pages = pages
        }, (err) => {
          console.log(err)
        })
      }
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
      text-align: justify
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
