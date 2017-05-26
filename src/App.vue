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
          b-nav-item(to='#') {{$t('features')}}
          b-nav-item(to='#') {{$t('team')}}
          b-nav-item(to='#') {{$t('subscription')}}
          b-nav-item(to='#') ICO
        b-nav.ml-auto(is-nav-bar='')
          b-nav-item-dropdown(text='Lang', right-alignment='', right='')
            b-dropdown-item(v-on:click='showAppIn("en")') EN
            b-dropdown-item(v-on:click='showAppIn("zh")') 中文
            b-dropdown-item(v-on:click='showAppIn("ru")') RU
          b-nav-item-dropdown(right-alignment='', right='')
            template(slot='text')
              span(style='font-weight: bold;') UserName
            b-dropdown-item(to='#') {{$t('profile')}}
            b-dropdown-item(to='#') {{$t('signOut')}}
  br
  router-view
  br
</template>

<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import Polyglot from 'vue-polyglot'
Vue.use(Polyglot, {
  languagesAvailable: ['en', 'ru', 'zh']
})

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'material-design-icons-iconfont'
window.App = {
  name: 'app',
  methods: {
    showAppIn: function(lang) {
      this.$polyglot.getLocale({baseURL: '/static/i18n', lang: lang})
      this.$polyglot.setLang({lang: lang})
    }
  },
  beforeCreate() {
    this.$polyglot.getLocale({baseURL: '/static/i18n', lang: 'en'})
  }
}
export default window.App
</script>
