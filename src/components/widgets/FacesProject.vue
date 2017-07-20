<template>
  <div class="mdl-cell mdl-cell--6-col draggable" key="faces">
    <div class="demo-card-wide mdl-card mdl-shadow--2dp widget-faces widget">
      <div class="mdl-card__title">
        <h2 class="mdl-card__title-text">Faces</h2>
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
      <ul>
        <li class="mdl-list__item mdl-list__item--two-line">
          <span class="mdl-list__item-primary-content">
            <i class="material-icons mdl-list__item-avatar">person</i>
            <span>Bryan Cranston</span>
            <span class="mdl-list__item-sub-title">CEO</span>
          </span>
          <span class="mdl-list__item-secondary-content">
            <a class="mdl-list__item-secondary-action" href="#"><i class="material-icons">assignment</i></a>
          </span>
        </li>
        <li class="mdl-list__item mdl-list__item--two-line">
          <span class="mdl-list__item-primary-content">
            <i class="material-icons mdl-list__item-avatar">person</i>
            <span>Aaron Paul</span>
            <span class="mdl-list__item-sub-title">Blockchain developer</span>
          </span>
          <span class="mdl-list__item-secondary-content">
            <a class="mdl-list__item-secondary-action" href="#"><i class="material-icons">assignment</i></a>
          </span>
        </li>
        <li class="mdl-list__item mdl-list__item--two-line">
          <span class="mdl-list__item-primary-content">
            <i class="material-icons mdl-list__item-avatar">person</i>
            <span>Bob Odenkirk</span>
            <span class="mdl-list__item-sub-title">IOS developer</span>
          </span>
          <span class="mdl-list__item-secondary-content">
            <a class="mdl-list__item-secondary-action" href="#"><i class="material-icons">assignment</i></a>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
export default {
  name: "faces-project",
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
