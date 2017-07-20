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
      </div>
      <div class="search-bar">
        <input type="text" name="" value="" class="bootstrap-input">
        <button type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Name</button>
        <button type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Role</button>
        <button type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Team</button>
        <button type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Photo</button>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
export default {
  name: "faces-search",
  data: function data() {
    return {

    }
  },
  mounted () {
    // document.querySelector('.mdl-layout').classList.add('mdl-layout--fixed-drawer')
    // this.sentimentsPieChart()
    // this.sentimentsLineChart()
    this.sentimentsComments()
    // this.getHeading()
    // const el = document.getElementById('draggable-container')
    // const sortable = Sortable.create(el)
  },
  methods: {
    sentimentsComments: function () {
      const postId = this.$route.params.id
      axios.get('/static/data/btt-sentiments/D'+ postId +'.json')
      .then(response => {
        this.comments = response.data
      })
      .catch(e => {
        this.commentsError = true
        this.errors.push(e)
      })
    },
  }
}
</script>
<style>
</style>
