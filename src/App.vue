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
          //- b-nav-item(to='#') {{$t('features')}}
          //- b-nav-item(to='#') {{$t('team')}}
          //- b-nav-item(to='#') {{$t('subscription')}}
          //- b-nav-item(to='#') ICO
        b-nav.ml-auto(is-nav-bar='')
          b-nav-item-dropdown(text='Lang', right-alignment='', right='')
            b-dropdown-item(v-on:click='showAppIn("en")') EN
            b-dropdown-item(v-on:click='showAppIn("zh")') 中文
            b-dropdown-item(v-on:click='showAppIn("ru")') RU
          //- b-nav-item-dropdown(right-alignment='', right='')
            template(slot='text')
              span(style='font-weight: bold;') UserName
            b-dropdown-item(to='#') {{$t('profile')}}
            b-dropdown-item(to='#') {{$t('signOut')}}
  router-view
</template>

<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import Polyglot from 'vue-polyglot'
Vue.use(Polyglot, {
  languagesAvailable: ['en', 'ru', 'zh']
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
  },
  'ru': {
    "coinsList": "BTT сантименты (альфа)",
    "features": "Преимущества",
    "team": "Команда",
    "subscription": "Подписка",
    "profile": "Профиль",
    "signOut": "Выход",
    "landingIntroTitle": "Dolphin",
    "landingIntroSubtitle": "blockchain intelligence",
    "landingIntroDescription": "open source платформа для совместного управления и анализа криптосистем"
  },
  'zh': {
    "coinsList": "BTT sentiments (alpha)",
    "features": "特徵",
    "team": "球隊",
    "subscription": "訂閱",
    "profile": "輪廓",
    "signOut": "登出",
    "landingIntroTitle": "Dolphin",
    "landingIntroSubtitle": "blockchain intelligence",
    "landingIntroDescription": "一個用於協作加密資產投資分析的開源平台"
  }
});

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'roboto-fontface'
import 'material-design-icons-iconfont'
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
    .navbar-nav .nav-link
      position: relative
      top: 2px
    &+div
      margin-top: 20px
</style>
