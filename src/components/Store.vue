<template>
  <main class="mdl-layout__content">
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--12-col">
        <h4>{{ heading }}</h4>
        <!-- <i class="material-icons">account_circle</i> -->
        <!-- <i class="material-icons">assignment</i> -->
      </div>
    </div>
    <div v-model="widgets" class="mdl-grid draggable-container" id="draggable-container" :options="{draggable:'.draggable'}">
      <div class="mdl-cell mdl-cell--12-col draggable" key="sentimentsLineChart">
        <div class="demo-card-wide mdl-card mdl-shadow--2dp">
          <div class="mdl-card__title">
            <h4 class="mdl-card__title-text">New widgets</h4>
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
            <button id="demo-menu-lower-right" class="mdl-button mdl-js-button mdl-button--icon">
              <i class="material-icons">more_vert</i>
            </button>
            <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="demo-menu-lower-right">
              <li class="mdl-menu__item">Some Action</li>
              <li class="mdl-menu__item">Another Action</li>
              <li disabled class="mdl-menu__item">Disabled Action</li>
              <li class="mdl-menu__item">Yet Another Action</li>
            </ul>
          </div>
          <div v-if="!chartError">
            <div id="sentimentsLineChart" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
            <!-- <div v-else class="nodata">
              <p>Data not find</p>
            </div> -->
          </div>
        </div>
      </div>

    </div>
  </main>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
import Vue from 'vue'
import routes from '../router'
import moment from 'moment'
export default {
  name: 'list',
  data: () => ({
    query: '',
    sortBy: '',
    sortOrder: '',
    postsList: []
  }),
  mounted () {
    document.querySelector('.mdl-layout').classList.remove('mdl-layout--fixed-drawer')
  },
  created () {
    // document.querySelector('body').classList.remove('body-landing-lite')
    let component = this
    axios.get('/static/data/announceList.json')
    .then(response => {
      this.postsList = Object.values(response.data)
      this.postsList.map((currElement, index) => {
        currElement.DateTimeLastPost = moment(currElement.DateTimeLastPost).calendar()
      })
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    dataHref: function (url, event) {
      event.preventDefault()
      event.stopPropagation()
      window.open(url, '_blank')
    },
    goToPost(url) {
      routes.push({ name: 'Post', params: { id: url }})
    },
    sort: function (sortBy) {
      this.sortBy = sortBy
      let classList = event.currentTarget.querySelector('i').classList
      let siblings = document.querySelectorAll('.table thead tr .material-icons').forEach(function(item) {
        item.classList.remove('up')
        item.classList.remove('down')
      })
      if (this.sortOrder == 'asc') {
        this.sortOrder = 'desc'
        classList.remove('up')
        classList.add('down')
      } else {
        this.sortOrder = 'asc'
        classList.remove('down')
        classList.add('up')
      }
    }
  },
  computed: {
    // momentList: function () {
    //   let list = this.postsList.map((currElement, index) => {
    //     currElement.DateTimeLastPost = moment(currElement.DateTimeLastPost).calendar()
    //   })
    //   return list
    // },
    computedList: function () {
      let vm = this
      let list = this.postsList.filter(function (item) {
        return list = item.announce.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
      })
      if (this.sortBy) {
        list = _.orderBy(list, [this.sortBy], [this.sortOrder])
      } else {
        list = _.orderBy(list, ['NumReplies', 'DateTimeLastPost', 'announce'], ['desc', 'desc', 'asc'])
      }
      list = list.map((currElement, index) => {
        currElement['order'] = ++index
        return currElement
      })
      return list
    }
  }
}
</script>

<style lang="sass">

</style>
