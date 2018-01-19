<template>
  <div class="app" id="app">
      <b-navbar toggleable="lg">
        <router-link to="/" class="navbar-brand">
          <div class="brand-logo">
            <img src="/static/img/dolphin.svg" class="d-inline-block align-top" alt="">
          </div>
        </router-link>
        <b-navbar-toggle target="navbarNavDropdown"></b-navbar-toggle>
        <b-collapse is-nav id="navbarNavDropdown">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/listing" class="nav-link" href="#">Listing</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/calendar" class="nav-link" href="#">Calendar</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">About</a>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item nav-btn">
              <router-link to="/project/edit/0/" class="btn btn-outline-info">Add project</router-link>
            </li>
            <li class="nav-item nav-btn">
              <a class="btn btn-outline-info" href="https://presale.dolphin.bi/orderreport">Order an ICO report</a>
            </li>
            <li class="nav-item auth" v-if="user">
              <a href="#"><span>{{user.name}}</span></a>
              <a href="#" @click.prevent="logout()"><i class="material-icons">exit_to_app</i></a>
            </li>
            <li class="nav-item not-auth" v-else>
              <router-link to="/auth" class="nav-link" href="#">Log in / Sign up</router-link>
            </li>
          </ul>
        </b-collapse>

    </b-navbar>

    <main id="main" class="main">
      <router-view :key="$route.path" />
    </main>
    <footer class="footer">
      <div class="footer-top">
        <div class="flex-item">
          <h3>Services</h3>
          <ul>
            <li><a href="#">Add project</a></li>
            <li><a href="https://presale.dolphin.bi/orderreport">Get report on your project</a></li>
          </ul>
        </div>
        <div class="flex-item">
          <h3>Company</h3>
          <ul>
            <li><a href="https://presale.dolphin.bi/" target="_blank">About</a></li>
            <li><a href="https://presale.dolphin.bi/#team" target="_blank">Team</a></li>
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
            <li><a href="https://twitter.com/dolphin_bi" target="_blank">Twitter</a></li>
            <li><a href="https://www.facebook.com/dolphin.blockchain.intelligence/" target="_blank">Facebook</a></li>
            <li><a href="https://t.me/dolphin_bi_en" target="_blank">Telegram</a></li>
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
import axios from 'axios'

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
    },
    logout() {
      axios.post('/auth/logout', {
      }).then((response) => {
        console.log(response.data)
        if (response.data.status == 'ok') {
          // setCookie('karamba', null, {path: '/'})
          // setCookie('connect.sid', null, {path: '/', secure: true})

          // this.$cookie.delete('karamba')
          // this.$cookie.delete('connect.sid')
          // this.$cookie.delete('Session_id')
          // this.$cookie.delete('Secure_session_id')
          // document.cookie = ''
          // console.log('karamba before')
          // console.log(this.$cookie.get('karamba'))
          // console.log('connect.sid before')
          // console.log(this.$cookie.get('connect.sid'))

          // this.$cookie.set('karamba', null, {expires: -1, path: '/'})
          // this.$cookie.set('connect.sid', null, {expires: -1, path: '/'})
          // document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); })
          // this.$store.dispatch('LOAD_USER')

          location.reload()
          // console.log('karamba')
          // console.log(this.$cookie.get('karamba'))
          // console.log('connect.sid')
          // console.log(this.$cookie.get('connect.sid'))
        }
      }, (err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="sass">
body
  font-family: 'Roboto', sans-serif

// helper
.pointer
  cursor: pointer

.heading
  display: flex
  margin-bottom: 8px
  justify-content: center
  align-items: center
  .heading-text
    flex: 1 0 auto
    margin: 0

</style>

<style lang="sass" scoped>
.navbar
  margin-bottom: 20px
  background: white
  border-bottom: 1px solid #eee
  box-shadow: 0 0 20px 5px rgba(0,0,0,.05)
.navbar-brand
  display: flex
  justify-content: center
  align-items: center
  .brand-logo
    margin-right: 16px
    img
      height: 47px
  .brand-names
    display: flex
    flex-direction: column
    justify-content: space-around
  .brand-name
    font-size: 36px
    line-height: 1.1em
    font-weight: 600
    position: relative
    top: -2px
  .brand-subname
    font-size: 11.7px
    line-height: 1.1em
    position: relative
    left: 2px
    bottom: 0px

.social img
  height: 24px
  width: 24px

.footer
  // border-top: 1px solid #eee
  box-shadow: 0 0 20px 5px rgba(0,0,0,.05)
  // background: #ddd
  color: white
  a
    color: white
  .footer-top
    padding: 20px
    background: #2C3E50
    @media (min-width: 576px)
      display: flex
      justify-content: space-around
    @media (max-width: 767px)
      flex-wrap: wrap
      .flex-item
        flex:  0 0 50%
        margin-top: 15px
    .flex-item
      ul
        list-style: none
        margin: 0
        padding: 0
        text-align: left
  .footer-bottom
    padding: 20px
    background: #2C3E50
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

.nav-btn
    &+.nav-btn
      margin-top: 15px
      @media (min-width: 992px)
        margin-left: 16px
        margin-top: 0

.not-auth, .auth
  margin-left: 16px
  display: flex
  align-items: center
  vertical-align: middle
  @media (min-width: 992px)
    justify-content: center
  a
    display: flex
    align-items: center
    justify-content: center
    vertical-align: middle
    text-decoration: none
.navbar-nav:not(.mr-auto)
  @media (max-width: 991px)
      li:nth-child(1)
        order: 2
      li:nth-child(2)
        order: 3
      li:nth-child(3)
        order: 1
        margin: 0
</style>

<style lang="sass" scoped>
  // .layout
  //   position: relative
  //   &.asideOpen
  //     aside
  //       left: 0 !important
  //     main
  //       padding-left: 300px
  //   aside
  //     position: fixed
  //     display: flex
  //     flex-direction: column
  //     height: 100vh
  //     width: 300px
  //     top: 0
  //     left: -300px
  //     transition: left 0.3s
  //     box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2)
  //     .aside-body
  //       flex: 1 0 auto
  //       ul
  //         li
  //           border-bottom: 1px solid #eee
  //           border-top: 1px solid #eee
  //           a
  //             padding: 21px 14px
  //             &:hover, &:focus
  //               background: #f2f2f2
  //           &+li
  //             border-top: 0px solid #eee
  //         .get-tokens
  //           a
  //             color: #fff
  //             background: #1779ba
  //             &:hover, &:focus
  //               background: #1468a0
  //     .aside-footer
  //       .not-auth__text
  //         flex: 1 0 auto
  //         padding: 21px 14px
  //         text-align: center
  //       .not-auth, .auth
  //         display: flex
  //         align-items: center
  //         justify-content: center
  //         vertical-align: middle
  //         border-top: 1px solid #eee
  //         .flex-link
  //           padding: 21px 14px
  //           flex: 1 0 auto
  //           border-left: 1px solid #eee
  //           color: #333
  //           &:hover, &:focus
  //             background: #f2f2f2
  //     .asideToggle
  //       position: absolute
  //       right: -28px
  //       top: 10px
  //     & > .nav.collection
  //       border: 0
  //       a
  //         color: #333
  //   main
  //     padding-left: 0
  //     min-height: 100vh
  //     transition: padding-left 0.3s
</style>
