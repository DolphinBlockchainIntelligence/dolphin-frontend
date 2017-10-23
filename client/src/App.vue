<template>
  <div class="app" id="app">
    <div class="asideOpen layout" id="layout">
      <aside>
        <div class="aside-header">
          <a href="https://presale.dolphin.bi/" class="brand">
            <img src="../static/img/dolphin.png" class="brand-logo" alt="Dolphin BI">
            <span class="brand-name">Dolphin BI</span>
          </a>
        </div>
        <div class="aside-body">
          <ul class="vertical menu">
            <li><router-link to="/" class="collection-item waves-effect waves-teal">Dashboard</router-link></li>
            <li v-for="page in pages"><a to="#" class="collection-item waves-effect waves-teal" @click.prevent="goToPage(page.id, page.url)">{{page.title}}</a></li>
            <li class="get-tokens"><a href="https://presale.dolphin.bi/" class="waves-effect waves-light btn" target="_blank">Get presale tokens</a></li>
          </ul>
        </div>
        <div class="aside-footer">
          <template v-if="!user">
            <div class="not-auth">
              <div class="not-auth__text">Sign in with</div>
              <a class="flex-link" href="/auth/facebook"><i class="flaticon-facebook"></i></a>
              <a class="flex-link" href="/auth/google"><i class="flaticon-google"></i></a>
            </div>
          </template>
          <template v-else>
            <div class="auth">
              <a href="#"><i class="material-icons">perm_identity</i> <span>user._id</span></a>
            </div>
          </template>
        </div>
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
  computed: {
    ...mapState([
      'pages',
      'pageTitle',
      'user'
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
    display: flex
    flex-direction: column
    height: 100vh
    width: 300px
    top: 0
    left: -300px
    transition: left 0.3s
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2)
    .aside-body
      flex: 1 0 auto
      ul
        li
          border-bottom: 1px solid #eee
          border-top: 1px solid #eee
          a
            padding: 21px 14px
            &:hover, &:focus
              background: #f2f2f2
          &+li
            border-top: 0px solid #eee
        .get-tokens
          a
            color: #fff
            background: #1779ba
            &:hover, &:focus
              background: #1468a0
    .aside-footer
      .not-auth__text
        flex: 1 0 auto
        padding: 21px 14px
        text-align: center
      .not-auth, .auth
        display: flex
        align-items: center
        justify-content: center
        vertical-align: middle
        border-top: 1px solid #eee
        .flex-link
          padding: 21px 14px
          flex: 1 0 auto
          border-left: 1px solid #eee
          &:hover, &:focus
            background: #f2f2f2
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
