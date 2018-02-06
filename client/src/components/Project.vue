<template>
  <div class="content-wrapper">
    <div class="heading">
      <!-- <div class="heading-logo">
        <img :src="'/base/upload/'+project.current.logotype">
      </div> -->
      <h3 class="heading-text">
        {{project.current.name}}<span v-if="project.current.symbol"> ({{project.current.symbol}})</span>
      </h3>
      <div class="heading-actions">
        <a href="#" class="btn btn-outline-info button-customize" @click.prevent="toggleSettings($event)"><i class="material-icons left">settings</i></a>
        <a :href="'/base/edit/?'+_id" target="_blank" class="btn btn-primary" v-if="user.icobaseEditor">Edit</a>
      </div>
    </div>
    <br>

    <!-- PRODUCTION VERSION -->
    <!-- <grid-layout
      :layout="widgets"
      :col-num="12"
      :row-height="30"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="widget in widgets"
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
      </grid-item> -->
      

    <grid-layout
      :layout="widgets"
      :col-num="12"
      :row-height="30"
      :margin="[10, 10]"
      :use-css-transforms="true"
      :is-draggable="isDraggable"
      :is-resizable="isResizable"
    >
      <grid-item
        v-for="widget in widgets"
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
              <iframe :src="widget.url" frameborder="0" />
            </div>
          </div>
      </grid-item>

      <!-- <grid-item
        :x="widgets[0].x"
        :y="widgets[0].y"
        :w="widgets[0].w"
        :h="widgets[0].h"
        :i="widgets[0].i"
        :key="widgets[0].id">
          <div class="widget">
            <div class="widget-header">
              <div class="title">{{widgets[0].title}}</div>
              <div class="actions">
                <a href="#"><i class="material-icons" @click.prevent="showSettings($event)">settings</i></a>
                <a href="#"><i class="material-icons" @click.prevent="showHelp($event)">help_outline</i></a>
              </div>
            </div>
            <div class="iframe-mask hide"></div>
            <div class="iframe-wrapper">
              <iframe :src="'/widgets/ico-info/index.html?id='+_id" frameborder="0" />
            </div>
          </div>
      </grid-item> -->


      <!-- <grid-item
        :x="0"
        :y="0"
        :w="12"
        :h="12"
        :i="10"
        :key="10">
          <div class="widget">
            <div class="widget-header">
              <div class="title">Sentiments</div>
              <div class="actions">
                <a href="#"><i class="material-icons" @click.prevent="showSettings($event)">settings</i></a>
                <a href="#"><i class="material-icons" @click.prevent="showHelp($event)">help_outline</i></a>
              </div>
            </div>
            <div class="iframe-mask hide"></div>
            <div class="iframe-wrapper">
              <iframe :src="'/widgets/linechart/linechart.html?id='+sentimentId" frameborder="0" />
            </div>
          </div>
      </grid-item>
      <grid-item
        :x="0"
        :y="12"
        :w="12"
        :h="12"
        :i="11"
        :key="11">
          <div class="widget">
            <div class="widget-header">
              <div class="title">Sentiments</div>
              <div class="actions">
                <a href="#"><i class="material-icons" @click.prevent="showSettings($event)">settings</i></a>
                <a href="#"><i class="material-icons" @click.prevent="showHelp($event)">help_outline</i></a>
              </div>
            </div>
            <div class="iframe-mask hide"></div>
            <div class="iframe-wrapper">
              <iframe :src="'/widgets/comments/comments.html?id='+sentimentId" frameborder="0" />
            </div>
          </div>
      </grid-item> -->
    </grid-layout>

  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import { GridLayout, GridItem } from 'vue-grid-layout'

export default {
  name: 'page',
  props: ['_id', 'name'],
  data: () => ({
    project: {},
    sentimentId: undefined,
    similarweb: undefined,
    widgets: [],
    isDraggable: false,
    isResizable: false,
  }),
  components: {
    GridLayout,
    GridItem
  },
  mounted: function() {
    axios.get('/base/' + this._id, {
    }).then((response) => {
      var project = response.data
      // this.project = project
      if (project.symbol = 'NA') {
          delete project.current.symbol
      }
      var pattern = /\D+/g
      var widgets = [
        {
          title: 'Project info',
          x: 0,
          y: 0,
          w: 9,
          h: 15,
          i: '1',
          url: '/widgets/ico-info/index.html?id=' + project._id
        },
        {
          title: 'Dolphin Truth Serum',
          x: 9,
          y: 0,
          w: 3,
          h: 15,
          i: '2',
          url: '/widgets/expert-opinions-average/index.html?id=' + project._id
        },
        {
          title: 'Expert opinions',
          x: 0,
          y: 15,
          w: 12,
          h: 15,
          i: '3',
          url: '/widgets/expert-opinions/index.html?id=' + project._id
        }
      ]
      try {
        project.current.links.forEach((link) => {
          if (link.type == 'Bitcointalk forum topic'){
            var id = link.url.split(pattern)
            this.sentimentId = id[1]
          }
        })
        if (!this.sentimentId) {
          project.current.links.forEach((link) => {
            if (link.type == 'Announcement (bitcointalk or other)'){
              var id = link.url.split(pattern)
              this.sentimentId = id[1]
            }
          })
        }
        if (this.sentimentId) {
          widgets.push({
            title: 'Sentiments',
            x: 0,
            y: 30,
            w: 6,
            h: 15,
            i: '4',
            url: '/widgets/linechart/linechart.html?id=' + this.sentimentId
          })
          // widgets.push({
          //   title: 'Sentiments',
          //   x: 0,
          //   y: 45,
          //   w: 12,
          //   h: 15,
          //   i: '5',
          //   url: '/widgets/comments/comments.html?id=' + this.sentimentId
          // })
        }
      } catch(err) {}
      try {
        project.current.links.forEach((link) => {
          if (link.type == 'Website'){
            var similarweb = link.url.replace(/.*?:\/\//g, "")
            //this.similarweb = similarweb.substring(0, similarweb.indexOf('/'))
            // this.similarweb = link.url.split(/^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/g)[3]
            this.similarweb = similarweb
            console.log(link.url)
            console.log(this.similarweb)
          }
        })
        if (this.similarweb) {
          widgets.push({
            title: 'SimilarWeb',
            x: 6,
            y: 30,
            w: 6,
            h: 15,
            i: '5',
            url: '/widgets/similarweb/index.html?url=' + this.similarweb
          })
        }
      } catch(err) {}
      // widgets.push({
      //   title: 'Google trends',
      //   x: 6,
      //   y: 45,
      //   w: 6,
      //   h: 10,
      //   i: '6',
      //   url: '/widgets/google-trends/index.html?keyword=' + project.current.name
      // })
      // tellow, peaks, headstart
      if (project._id == '5a74890501bf07000150410c' || project._id == '5a78a6d15b82e50001b5ae12' || project._id == '5a73628f8f45f500017ebb7b') {
        widgets.push({
          title: 'iTrend',
          x: 0,
          y: 45,
          w: 6,
          h: 15,
          i: '6',
          url: '/widgets/itrend/index.html?id=' + project._id
        })
      }
      this.widgets = widgets
      this.project = project
    }, (err) => {
      console.log(err)
    })
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  methods: {
    resizedWidget: () => {
      window.dispatchEvent(new Event('resize'))
    },
    toggleSettings: function(event) {
      this.isDraggable = !this.isDraggable
      this.isResizable = !this.isResizable
      // let btnText = event.currentTarget.querySelector('span').textContent
      // if (btnText == 'Customize') {
      //   event.currentTarget.querySelector('span').textContent = 'Save settings'
      // } else {
      //   event.currentTarget.querySelector('span').textContent = 'Customize'
      // }
      document.querySelectorAll('.iframe-mask').forEach(function(item, i){
        item.classList.toggle('hide')
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.heading-logo img
  height: 34px
  margin-right: 7px
</style>
