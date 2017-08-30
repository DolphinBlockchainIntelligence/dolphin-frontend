<template>
  <nav>
    <div class="nav-wrapper">
      <ul class="left hide-on-med-and-down">
        <li><a href="#" @click.prevent="asideToggle()" class="asideToggle"><i class="material-icons">menu</i></a></li>
      </ul>
      <span class="brand-logo">
        <slot name="page-title"></slot>
      </span>
      <ul class="right hide-on-med-and-down">
        <slot name="nav"></slot>
      </ul>
    </div>
  </nav>
</template>


<script>
export default {
  name: 'Navbar',
  data: () => ({
  }),
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
</style>
