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
  background: white
  height: 64px
  max-height: 64px
  .nav-wrapper
    border-bottom: 1px solid #eee
    display: flex
    .top-bar
      background: white
      width: 100%
      padding: 0 7px
      ul
        background: white
      .top-bar-left
        .menu
          align-items: center

.asideToggle
  color: rgb(10, 10, 10)
  position: relative
  top: 1px

.page-title
  padding-left: 0
  font-size: 2.1rem
  font-weight: normal

.button-customize
  display: flex
  align-items: center
  padding: 23px
  border-left: 1px solid #eee
  background: none
  color: rgb(10, 10, 10)
  font-size: 1rem
  .material-icons
    font-size: 1rem
    margin-right: 7px
</style>
