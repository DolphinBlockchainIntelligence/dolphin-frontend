<template lang="pug">
  .landing
    section.section.intro
      .container
        img(:src="intro.logo" class="logo")
        h1.title {{ intro.title }}
        h3.subtitle {{ intro.subtitle }}
        p.description {{ intro.description }}
    section.section.about
      .container
        h3.title {{ about.title }}
        p.description {{ about.description }}
        p.text-center: b-button(:size="'lg'" :variant="'outline-success'" href="https://goo.gl/fuMCKU") Read the whitepaper
    section.section.features
      .container
        h3.title {{ features.title }}
        ul.list
          li.item(v-for="feature in features.items")
            div.item-img(:style="'background-image: url(' + feature.img + ')'")
            h4.item-title {{ feature.title }}
            p.item-description {{ feature.description }}
    section.section.screenshots
      .container
        h3.title {{ screenshots.title }}
        h4.subtitle {{ screenshots.subtitle }}
        img(:src="screenshots.imgs[0]")
    section.section.roadmap
      .container
        h3.title {{ roadmap.title }}
        h4.subtitle {{ roadmap.subtitle }}
        ul: li(v-for="stage in roadmap.stages")
          h5 {{ stage.title }}
          ul: li(v-for="goal in stage.goals") {{ goal }}
    section.section.team
      .container
        h3.title {{ team.title }}
        h4.subtitle {{ team.subtitle }}
        ul: li(v-for="member in team.members")
          div.item-img(:style="'background-image: url(' + member.img + ')'")
          h5 {{ member.name }}
          div {{ member.role }}
          ul: li(v-for="description in member.description") {{ description }}
          ul: li(v-for="link in member.links")
            a(:href="link.url") {{ link.name }}
    section.section.mentions
      .container
        h3.title {{ mentions.title }}
        ul.items: li(v-for="mention in mentions.items")
          a(:href="mention.url"): img(:src="mention.img" :alt="mention.title")
    section.section.socials
      .container
        ul
          li(v-for="social in socials")
            a(href="social.url") {{ social.title }}
</template>

<script>
import axios from 'axios'
export default {
  name: 'landing',
  data: () => ({
    intro: [],
    about: [],
    features: [],
    screenshots: [],
    roadmap: [],
    team: [],
    mentions: [],
    socials: {}
  }),
  created () {
    axios.get('/static/data/landing.json')
    .then(response => {
      this.intro = response.data.intro
      this.about = response.data.about
      this.features = response.data.features
      this.screenshots = response.data.screenshots
      this.roadmap = response.data.roadmap
      this.team = response.data.team
      this.mentions = response.data.mentions
      this.socials = response.data.socials
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>

<style lang="sass">
.landing
  margin-top: -56px !important
.section
  padding: 50px 0
  .title
    text-align: center
    margin-bottom: 30px
  .subtitle
    text-align: center
.intro
  min-width: 100vw
  min-height: 100vh
  background: url('/static/img/background.png') center
  background-size: cover
  color: #fff
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
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
.about
  background-color: #f0f0f0
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  .description
    font-size: 18px
.features
  .list
    display: flex
    flex-wrap: wrap
    list-style: none
    padding: 0
    justify-content: space-between
    .item
      width: 400px
      display: flex
      justify-content: center
      align-items: center
      flex-direction: column
      .item-img
        width: 150px
        height: 150px
        background-size: cover
        margin-bottom: 30px
      .item-title
        text-align: center
      .item-description
        text-align: center
.screenshots
  img
    width: 100%
.team
  .item-img
    width: 150px
    height: 150px
    background-size: cover
    margin-bottom: 30px
.mentions
  .items
    list-style: none
    padding: 0
    display: flex
    justify-content: space-between
    align-items: center
    img
      height: 75px
</style>
