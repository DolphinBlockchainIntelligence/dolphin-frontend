<template>
  <div class="app" id="app">
    <div class="asideOpen layout" id="layout">
      <aside>
        <a href="/dashboard/" class="brand">
          <img src="../static/img/dolphin.png" class="brand-logo" alt="Dolphin BI">
          <span class="brand-name">Dolphin BI</span>
        </a>
        <ul class="nav collection">
          <li><router-link to="/" class="collection-item waves-effect waves-teal">Dashboard</router-link></li>
          <li><router-link to="/sentiments" class="collection-item waves-effect waves-teal">Sentiments</router-link></li>
          <li v-for="page in pages"><a to="#" class="collection-item waves-effect waves-teal" @click.prevent="goToPage(page.id, page.url)">{{page.title}}</a></li>
        </ul>
      </aside>
      <main class="main">
        <router-view :key="$route.path" />
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
    this.$store.dispatch('LOAD_ASSETS_LIST')
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
.hide
  display: none !important
.content-wrapper
  padding: 0 14px
</style>
<style lang="sass" scoped>
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
</style>
