<template lang="pug">
#app
  b-navbar(toggleable='', type='inverse', variant='success')
    .container
      b-nav-toggle(target='nav_collapse')
      b-link.navbar-brand(to='/')
        span Dolphin BI
      b-collapse#nav_collapse(is-nav='')
        b-nav(is-nav-bar='')
          b-nav-item(to='/list') {{$t('coinsList')}}
  router-view
</template>

<script>
import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'roboto-fontface'
import 'material-design-icons-iconfont'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import Polyglot from 'vue-polyglot'
Vue.use(Polyglot, {
  languagesAvailable: ['en']
})
Vue.locales({
  'en': {
    "coinsList": "BTT sentiments (alpha)",
    "features": "Features",
    "team": "Team",
    "subscription": "Subscription",
    "profile": "Profile",
    "signOut": "Sign out",
    "landingIntroTitle": "Dolphin",
    "landingIntroSubtitle": "blockchain intelligence",
    "landingIntroDescription": "an open-source platform for collaborative crypto-asset investment analysis"
  }
});

window.App = {
  name: 'app',
  methods: {
    showAppIn: function(lang) {
      this.$polyglot.setLang({lang: lang})
    }
  }
}
export default window.App
</script>

<style lang="sass">
#app
  font-family: 'Roboto', sans-serif
  .navbar
    background-color: #3B1D7C !important
    position: relative
    z-index: 2
    &+div
      margin-top: 20px
.page-title
  margin-bottom: 20px
</style>
