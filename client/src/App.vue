<template>
  <div class="app" id="app">
    <div class="asideOpen layout" id="layout">
      <aside>
        <div class="brand">
          <img src="/static/img/dolphin.png" class="brand-logo" alt="Dolphin BI">
          <span class="brand-name">Dolphin BI</span>
        </div>
        <ul class="nav collection">
          <li><a href="/#/" class="collection-item waves-effect waves-teal">Dashboard</a></li>
          <li><a href="/#/sentiments" class="collection-item waves-effect waves-teal">Sentiments</a></li>
          <li v-for="page in pages"><a href="#" class="collection-item waves-effect waves-teal" @click.prevent="goToPage(page.id, page.url)">{{page.title}}</a></li>
        </ul>
      </aside>
      <main class="main">
        <nav>
          <div class="nav-wrapper">
            <ul class="left hide-on-med-and-down">
              <li><a href="#" @click.prevent="asideToggle()" class="asideToggle"><i class="material-icons">menu</i></a></li>
            </ul>
            <a href="#" class="brand-logo">{{pageTitle}}</a>
            <ul class="right hide-on-med-and-down">
              <li><a href="sass.html"><i class="material-icons">search</i></a></li>
              <li><a href="badges.html"><i class="material-icons">view_module</i></a></li>
              <li><a href="collapsible.html"><i class="material-icons">refresh</i></a></li>
              <li><a href="mobile.html"><i class="material-icons">more_vert</i></a></li>
            </ul>
          </div>
        </nav>
        <div class="content-wrapper">
          <router-view :key="$route.path" />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import routes from './router'
export default {
  name: 'app',
  data: () => ({
  }),
  beforeCreate: function () {
    this.$store.dispatch('LOAD_REGISTER')
  },
  mounted () {

  },
  computed: {
    ...mapState([
      'pages',
      'pageTitle'
    ])
  },
  methods: {
    goToPage(id, url) {
      routes.push({ name: 'Page', params: { id: id }})
    },
    asideToggle() {
      document.getElementById('layout').classList.toggle('asideOpen')
    }
  }
}
</script>

<style lang="sass">
.layout
  position: relative
  &.asideOpen
    aside
      left: 0 !important
    main
      padding-left: 300px
  aside
    position: fixed
    height: 100vh
    width: 300px
    top: 0
    left: -300px
    transition: left 0.3s
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2)
    .asideToggle
      position: absolute
      right: -28px
      top: 10px
    .brand
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      margin: 20px 0
      img
        width: 100px
      span
        font-family: "Roboto", sans-serif
        font-weight: normal
        font-size: 2.1rem
        color: #333
    & > .nav.collection
      border: 0
      a
        color: #333
  main
    padding-left: 0
    min-height: 100vh
    transition: padding-left 0.3s
    .content-wrapper
      padding: 0 14px
    & > nav
      background-color: #00bcd4
</style>
