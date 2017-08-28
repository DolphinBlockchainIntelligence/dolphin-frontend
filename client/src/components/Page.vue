<template>
  <div>
    <div class="iframe-wrapper">
      <iframe id="pages-iframe" :src="page.url+'/'" width="100%"></iframe>
    </div>
  </div>
</template>


<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'page',
  props: ['id'],
  data: () => ({
  }),
  components: {
  },
  created () {
    this.TO_SET_PAGE_TITLE(this.page.title)
  },
  mounted () {
  },
  computed: {
    page (state) {
      for (var i in this.pages) {
        if (this.$route.params.id == this.pages[i].id) {
          return this.pages[i]
        }
      }
    },
    ...mapState([
      'pages'
    ])
  },
  methods: {
    ...mapActions([
      'TO_SET_PAGE_TITLE'
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