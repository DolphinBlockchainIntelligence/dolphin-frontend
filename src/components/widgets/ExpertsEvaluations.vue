<template>

  <div class="mdl-cell mdl-cell--12-col draggable widget-faces-search" key="faces-search">
    <div class="demo-card-wide mdl-card mdl-shadow--2dp widget-faces widget">
      <div class="mdl-card__title">
        <h2 class="mdl-card__title-text">Experts evaluations</h2>
      </div>
      <div class="mdl-card__menu">
        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
          <i class="material-icons">info</i>
        </button>
        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
          <i class="material-icons">pan_tool</i>
        </button>
        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
          <i class="material-icons">filter_list</i>
        </button>
        <button id="demo-menu-lower-right"
                class="mdl-button mdl-js-button mdl-button--icon">
          <i class="material-icons">more_vert</i>
        </button>
        <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
            for="demo-menu-lower-right">
          <li class="mdl-menu__item">Some Action</li>
          <li class="mdl-menu__item">Another Action</li>
          <li disabled class="mdl-menu__item">Disabled Action</li>
          <li class="mdl-menu__item">Yet Another Action</li>
        </ul>
        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" @click="removeWidget()">
          <i class="material-icons">delete</i>
        </button>
      </div>
      <div class="scrollBlock">
        <div class="scrollBlock__el expertsCard" v-for="n in 10">
          <div class="expertsCard__header">
            <div class="expertsCard__img">
              <img src="/static/img/widgets/experts.svg"/>
            </div>
            <div class="expertsCard__ratio">
              <div class="expertsCard__ratio_name">Edward Umnik</div>
                <i class="material-icons">star</i>
                <i class="material-icons">star_half</i>
                <i class="material-icons">star_border</i>
                <i class="material-icons">star_border</i>
                <i class="material-icons">star_border</i>
                <span class="expertsCard__ratio_count">2,4</span>
            </div>
          </div>
          <div class="expertsCard__body">
            <table>
              <tr>
                <td>
                  Idea
                </td>
                <td>
                  <i class="material-icons">star</i>
                  <i class="material-icons">star_half</i>
                  <i class="material-icons">star_border</i>
                  <i class="material-icons">star_border</i>
                  <i class="material-icons">star_border</i>
                </td>
              </tr>
              <tr>
                <td>
                  Idea
                </td>
                <td>
                  <i class="material-icons">star</i>
                  <i class="material-icons">star_half</i>
                  <i class="material-icons">star_border</i>
                  <i class="material-icons">star_border</i>
                  <i class="material-icons">star_border</i>
                </td>
              </tr>
              <tr>
                <td>
                  Idea
                </td>
                <td>
                  <i class="material-icons">star</i>
                  <i class="material-icons">star_half</i>
                  <i class="material-icons">star_border</i>
                  <i class="material-icons">star_border</i>
                  <i class="material-icons">star_border</i>
                </td>
              </tr>
            </table>
          </div>
          <div class="expertsCard__footer">
            <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
              Rate
            </a>
            <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
              Review
            </a>
          </div>


      </div>
    </div>


  </div>
</div>

</template>


<script>
import axios from 'axios'
import {lory} from 'lory.js'
// import { Lory, Item, Prev, Next } from 'vue-lory'

export default {
  name: "experts-evaluations",
  props: ['id'],
  data: function data() {
    return {

    }
  },
  mounted () {
    // const slider = document.querySelector('.js_slider');
    // console.log(slider);
    // const initLory = lory(slider, {
    //   infinite: 1,
    //   slidesToScroll: 4
    // });
    // console.log(initLory);
    // initLory.next();
  },
  created () {
    // const slider = document.querySelector('.js_slider');
    // console.log(slider);
    // lory(slider, {
    //
    // });
  },
  methods: {
    removeWidget: function () {
      this.$root.$emit('removeWidget', this.id)
    }
  }
}
</script>
<style lang="sass" scoped>
.scrollBlock
  // height: 200px
  width: 100%
  white-space: nowrap
  overflow-y: hidden
  overflow-x: auto
  padding-bottom: 10px
  // background: yellow
  -webkit-overflow-scrolling: touch
  &__el
    display: inline-block
    margin-right: 10px
    vertical-align: top
    height: 100%
    width: 200px
    // background: blue
.expertsCard
  padding: 10px
  box-shadow: 0 0 2px #ccc
  .expertsCard__header
    display: table
    width: 100%
    border-bottom: 1px solid #ddd
    padding-bottom: 8px
    .expertsCard__img
      width: 40px
      height: 40px
      display: table-cell
      vertical-align: top
      padding-right: 10px
    .expertsCard__ratio
      display: table-cell
      vertical-align: top
      i
        color: blue
        font-size: 18px
      .expertsCard__ratio_count
        color: #ddd
        font-size: 24px
  .expertsCard__body
    table
      td
        font-siae: 16px
        color: #ccc
        padding: 4px
        i
          font-size: 20px
          color: blue

</style>
