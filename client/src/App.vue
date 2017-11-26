<template>
  <div class="app" id="app">
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
      <router-link to="/" class="navbar-brand">
        <img src="../static/img/dolphin.png" height="30" class="d-inline-block align-top" alt="">
        Dolphin BI
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">Listing</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Calendar</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Add project</a>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="btn btn-outline-info" href="https://presale.dolphin.bi/orderreport">Order an ICO report</a>
          </li>
          <li class="nav-item auth" v-if="user._id">
            <a href="#"><span>{{user._id}}</span></a>
            <a href="#"><i class="material-icons">exit_to_app</i></a>
          </li>
          <li class="nav-item not-auth" v-else>
            <router-link to="/auth" class="nav-link" href="#">Log in / Sign up</router-link>
          </li>
        </ul>
      </div>

    </nav>

    <main id="main" class="main">
      <router-view :key="$route.path" />
    </main>
    <footer class="footer">
      <div class="footer-top">
        <div class="flex-item">
          <h3>Services</h3>
          <ul>
            <li><a href="#">Add project</a></li>
            <li><a href="#">Get report on your project</a></li>
          </ul>
        </div>
        <div class="flex-item">
          <h3>Company</h3>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Team</a></li>
            <li><a href="#">Contacts</a></li>
          </ul>
        </div>
        <div class="flex-item">
          <h3>Legal</h3>
          <ul>
            <li><a href="#">Privacy policy</a></li>
            <li><a href="#">Terms of service</a></li>
          </ul>
        </div>
        <div class="flex-item">
          <h3>Follow us</h3>
          <ul>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Telegram</a></li>
            <li><a href="#">Email</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2017 Dolphin Blockchain Intelligence B.V.</p>
      </div>
    </footer>
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
    this.$store.dispatch('LOAD_USER')
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

<style lang="sass" scoped>
.navbar
  margin-bottom: 20px
.brand
  display: flex
  justify-content: flex-start
  align-items: center
  img
    width: 40px
    margin-right: 8px
  span
    font-family: "Roboto", sans-serif
    font-weight: normal
    font-size: 2.1rem
    color: #333
.social img
  height: 24px
  width: 24px

.footer
  border-top: 1px solid #eee
  .footer-top
    padding: 20px
    display: flex
    justify-content: space-around
    border-bottom: 1px solid #eee
    .flex-item
      ul
        list-style: none
        margin: 0
        padding: 0
        text-align: left
  .footer-bottom
    padding: 20px
    text-align: center
    p
      margin: 0
</style>

<style lang="sass">
@import 'src/assets/sticky-footer.sass'
.hide
  display: none !important

.content-wrapper
  padding: 0 16px

main
  &.center
    display: flex
    justify-content: center
    align-items: center

.not-auth, .auth
  margin-left: 16px
  display: flex
  align-items: center
  justify-content: center
  vertical-align: middle
  a
    display: flex
    align-items: center
    justify-content: center
    vertical-align: middle
    text-decoration: none
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
          color: #333
          &:hover, &:focus
            background: #f2f2f2
    .asideToggle
      position: absolute
      right: -28px
      top: 10px
    & > .nav.collection
      border: 0
      a
        color: #333
  main
    padding-left: 0
    min-height: 100vh
    transition: padding-left 0.3s

</style>
