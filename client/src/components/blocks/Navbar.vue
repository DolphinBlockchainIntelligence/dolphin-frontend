<template>
  <nav>
    <div class="nav-wrapper">
      <ul class="left hide-on-med-and-down horizontal menu">
        <li><a href="#" @click.prevent="asideToggle()" class="asideToggle"><i class="material-icons">menu</i></a></li>
      </ul>
      <span class="brand-logo">
        <slot name="page-title"></slot>
      </span>
      <nav class="global-nav show-for-smedium">
        <ul class="dropdown menu right-side">
          <slot name="nav"></slot>
  <!--         <template v-if="!user">
            <li><a href="/auth/facebook">Sign in via Facebook</a></li>
          </template>
          <template v-else>
            <li><a href="#">{{user._id}}</a></li>
          </template> -->
        </ul>
      </nav>
    </div>
  </nav>
</template>


<script>
// const userUrl = '/private/user/'
// import { mapState } from 'vuex'
export default {
  name: 'Navbar',
  // data: () => ({
  //   user: undefined
  // }),
  // created: function () {
  //   axios.get(userUrl, {
  //   }).then((response) => {
  //     this.user = response.data
  //   }, (err) => {
  //     console.log(err)
  //   })
  // },
  computed: {
    // ...mapState([
    //   'user'
    // ])
  },
  methods: {
    asideToggle() {
      document.getElementById('layout').classList.toggle('asideOpen')
    }
  }
}
</script>


<style lang="sass" scoped>
nav
  background-color: #00bcd4
  .nav-wrapper
    display: flex
</style>
