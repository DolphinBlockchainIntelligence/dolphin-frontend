<template lang="pug">
.landing
  section.section.intro: .container
    img(src="/static/img/dolphin.png" class="logo")
    .heading
      h1.title Dolphin
      h3.subtitle blockchain intelligence
      p.description an open-source platform for collaborative crypto-asset investment analysis
    p.text-center: b-button(:size="'lg'" :variant="'outline'" href="http://presale.dolphin.bi/") Read more
</template>

<style lang="sass">
@import '../assets/grid-breakpoints.scss'
.landing
  margin-top: -56px !important
.section
  padding: 50px 0
  .heading
    margin-bottom: 30px
    .title
      text-align: center
    .subtitle
      text-align: center
      margin-bottom: 30px
      padding: 0
  &:nth-child(even)
    background-color: #f0f0f0
.intro
  min-width: 100vw
  min-height: 100vh
  background: url('/static/img/background.png') center
  color: #fff
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  background-attachment: fixed
  background-position: center
  background-repeat: no-repeat
  background-size: cover
  .container
    text-align: center
  .logo
    margin-bottom: 30px
  .title
    font-weight: 600
    letter-spacing: .5px
    font-size: 68px
  .subtitle
    padding-bottom: 40px
  .subtitle, .description
    font-size: 18px
    font-weight: 100
.btn
    padding: 1rem 2rem
    font-size: 1.25rem
    font-weight: 500
    color: #ffe484
    border-color: #ffe484
    &:hover
      background-color: #ffe484
</style>
