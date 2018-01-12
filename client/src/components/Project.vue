<template>
  <div class="container">
    <div class="heading">
      <h3 class="heading-text">{{project.current.name}} ({{project.current.symbol}})</h3>
      <div class="heading-actions">
        <a :href="'http://new.petrusenko.pro/base/edit/?'+_id" target="_blank" class="btn btn-primary" v-if="user.icobaseEditor">Edit</a>
        <!-- <a :href="'http://new.petrusenko.pro/base/edit/?'+_id" target="_blank" class="btn btn-primary">Edit</a> -->
      </div>
    </div>
    <br>

    <grid-layout
      :layout="widgets"
      :col-num="12"
      :row-height="30"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >
      <!-- <grid-item
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
      <grid-item
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
              <!-- <iframe v-if="widgets[0].id" :src="'/apps/'+widgets[0].url+'?id='+widgets[0].id" frameborder="0" /> -->
              <!-- <iframe v-else :src="'/apps/'+widgets[0].url" frameborder="0" /> -->
              <iframe :src="'/widgets/ico-info/index.html?id='+_id" frameborder="0" />
            </div>
          </div>
      </grid-item>
      <grid-item
        :x="widgets[1].x"
        :y="widgets[1].y"
        :w="widgets[1].w"
        :h="widgets[1].h"
        :i="widgets[1].i"
        :key="widgets[1].id">
          <div class="widget">
            <div class="widget-header">
              <div class="title">{{widgets[1].title}}</div>
              <div class="actions">
                <a href="#"><i class="material-icons" @click.prevent="showSettings($event)">settings</i></a>
                <a href="#"><i class="material-icons" @click.prevent="showHelp($event)">help_outline</i></a>
              </div>
            </div>
            <div class="iframe-mask hide"></div>
            <div class="iframe-wrapper">
              <!-- <iframe v-if="widgets[1].id" :src="'/apps/'+widgets[1].url+'?id='+widget.id" frameborder="0" /> -->
              <!-- <iframe v-else :src="'/apps/'+widget.url" frameborder="0" /> -->
              <iframe :src="'/widgets/linechart/linechart.html?id='+sentimentId" frameborder="0" />
            </div>
          </div>
      </grid-item>
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
    widgets: [{
      title: 'Project info',
      x: 0,
      y: 0,
      w: 12,
      h: 12,
      i: '1',
      url: '/widgets/ico-info/index.html?id='
    },
    {
      title: 'Sentiments',
      x: 0,
      y: 12,
      w: 12,
      h: 12,
      i: '2',
      url: ''
    }]
  }),
  components: {
    GridLayout,
    GridItem
  },
  mounted: function() {
    axios.get('/base/' + this._id, {
    }).then((response) => {
      this.project = response.data
      console.log(this.project)
      this.sentimentId = 47417
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
    // loadWidgets: function(){

    // }
  }
}
</script>