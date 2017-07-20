<template>
  <div class="mdl-cell mdl-cell--6-col draggable widget-faces-search" key="faces-search">
    <div class="demo-card-wide mdl-card mdl-shadow--2dp widget-faces widget">
      <div class="mdl-card__title">
        <h2 class="mdl-card__title-text">Faces: search</h2>
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
    </div>
  </div>
</template>


<script>
import axios from 'axios'
export default {
  name: "portfolio",
  props: ['id'],
  data: function data() {
    return {

    }
  },
  mounted () {
  },
  methods: {
    removeWidget: function () {
      this.$root.$emit('removeWidget', this.id)
    }
  }
}
</script>
<style>
</style>
