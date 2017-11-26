<template>
  <nav>
    <div class="nav-wrapper">
      <div class="top-bar">
        <div class="top-bar-left">
          <ul class="menu">
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
  // margin-bottom: 20px
  .nav-wrapper
    // display: flex
    margin: 0 16px
    .top-bar
      background: white
      width: 100%
      // padding: 0 7px
      display: flex
      justify-content: center
      align-items: center
      ul
        background: white
        margin: 0
        padding: 0
        list-style: none
      .top-bar-left
        flex: 1 0 auto
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
  line-height: 1em
  // display: flex
  // align-items: center
  // padding: 23px
  // background: none
  // color: rgb(10, 10, 10)
  // font-size: 1rem
  // .material-icons
  //   font-size: 1.4rem
</style>
