<template>
  <nav>
    <div class="nav-wrapper">
      <div class="top-bar">
        <div class="top-bar-left">
          <ul class="menu">
            <li><a href="#" @click.prevent="asideToggle()" class="asideToggle"><i class="material-icons">menu</i></a></li>
            <li class="menu-text page-title"><slot name="page-title"></slot></li>
          </ul>
        </div>
        <div class="top-bar-right">
          <ul class="menu">
            <slot name="nav"></slot>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>


<script>
export default {
  name: 'Navbar',
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
    .top-bar
      width: 100%
      .top-bar-left
        .menu
          align-items: center

.asideToggle
  color: rgb(10, 10, 10)
  position: relative
  top: 1px

.page-title
  padding-left: 0

.button-customize
  display: flex
  align-items: center
  .material-icons
    font-size: .9rem
    margin-right: 7px
</style>
