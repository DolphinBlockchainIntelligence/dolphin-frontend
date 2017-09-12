<template>
  <div>
    <Navbar>
      <span slot="page-title">{{page.title}}</span>
    </Navbar>
    <div class="iframe-wrapper">
      <iframe id="pages-iframe" :src="'/apps/'+page.url+'/'" width="100%"></iframe>
    </div>
  </div>
</template>


<script>
import { mapState } from 'vuex'
import Navbar from './blocks/Navbar'
export default {
  name: 'page',
  props: ['id'],
  components: {
    Navbar
  },
  computed: {
    page (state) {
      for (var i in this.pages) {
        if (this.id == this.pages[i].id) {
          return this.pages[i]
        }
      }
    },
    ...mapState([
      'pages'
    ])
  }
}
</script>


<style lang="sass" scoped>
.iframe-wrapper
  height: calc(100vh - 68px)
  margin: 0 -14px
iframe
  border: none
  height: 100%
</style>