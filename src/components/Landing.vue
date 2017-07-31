<template lang="pug">
.landing
  section.section.intro: .container
    img(:src="intro.logo" class="logo")
    .heading
      h1.title {{ intro.title }}
      h3.subtitle {{ intro.subtitle }}
    p.description {{ intro.description }}
  section.section.about: .container
    .heading
      h3.title {{ about.title }}
    p.description {{ about.description }}
    p.text-center: b-button(:size="'lg'" :variant="'outline-success'" href="https://goo.gl/fuMCKU") Read the whitepaper
  section.section.features: .container
    .heading
      h3.title {{ features.title }}
    ul.list: li.item(v-for="feature in features.items")
      div.item-img(:style="'background-image: url(' + feature.img + ')'")
      h4.item-title {{ feature.title }}
      p.item-description {{ feature.description }}
  section.section.screenshots: .container
    .heading
      h3.title {{ screenshots.title }}
      h4.subtitle {{ screenshots.subtitle }}
    img(:src="screenshots.imgs[0]")
  section.section.roadmap: .container
    .heading
      h3.title {{ roadmap.title }}
      h4.subtitle {{ roadmap.subtitle }}
    ul: li(v-for="stage in roadmap.stages")
      h5 {{ stage.title }}
      ul: li(v-for="goal in stage.goals") {{ goal }}
  section.section.team: .container
    .heading
      h3.title {{ team.title }}
      h4.subtitle {{ team.subtitle }}
    ul.row
      li.mb-2.col-xs-12.col-md-6.col-lg-3(v-for="member in team.members")
        b-card.card(show-footer)
          img(:src="member.img" :alt="member.name")
          h5 {{ member.name }}
          div {{ member.role }}
          ul: li(v-for="description in member.description") {{ description }}
          div(slot="footer")
            .card-block
              a.card-link(v-for="link in member.links" :href="link.url") {{ link.name }}
  section.section.mentions: .container
    .heading
      h3.title {{ mentions.title }}
    ul.items: li(v-for="mention in mentions.items")
      a(:href="mention.url"): img(:src="mention.img" :alt="mention.title")
  section.section.socials: .container
    ul
      li: a(href="https://www.facebook.com/groups/dolphinblockchainintelligence/" target="_blank"): SocialFb
      li: a(href="https://twitter.com/dolphin_bi" target="_blank"): SocialTw
      li: a(href="https://www.linkedin.com/company/dolphin-blockchain-intelligence" target="_blank"): SocialLn
      li: a(href="http://eepurl.com/cQEwDT" target="_blank"): SocialEmail
      li: a(href="https://github.com/DolphinBlockchainIntelligence" target="_blank"): SocialGh
      li: a(href="https://t.me/joinchat/AAAAAArUuUw5_lK-v9Vw7A" target="_blank"): SocialTg
      li: a(href="#" target="_blank"): SocialVk
</template>

<script>
import SocialFb from '../assets/img/socials/fb.svg'
import SocialGh from '../assets/img/socials/gh.svg'
import SocialLn from '../assets/img/socials/ln.svg'
import SocialTg from '../assets/img/socials/tg.svg'
import SocialTw from '../assets/img/socials/tw.svg'
import SocialVk from '../assets/img/socials/vk.svg'
import SocialEmail from '../assets/img/socials/email.svg'
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
  components: {
    SocialFb,
    SocialGh,
    SocialLn,
    SocialTg,
    SocialTw,
    SocialVk,
    SocialEmail
  },
  created () {
    axios.get('/data/landing.json')
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
  &:nth-child(even)
    background-color: #f0f0f0
.intro
  width: 100vw
  height: 100vh
  background: #3A0767 url('/static/img/background.png') center
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
    @media(max-height: 720px)
      height: 170px
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
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  .description
    font-size: 18px
    max-width: 760px
    text-align: center
    margin: 0 auto 30px
.features
  .list
    display: flex
    list-style: none
    padding: 0
    justify-content: space-between
    .item
      width: 400px
      display: flex
      flex-direction: column
      align-items: center
      justify-content: flex-start
      .item-img
        width: 100px
        height: 100px
        background-size: cover
        margin: 0 auto 30px
      .item-title
        text-align: center
        font-size: 1.3rem
      .item-description
        text-align: center
.screenshots
  img
    width: 100%
.team
  .row
    &>li
      list-style: none
      opacity: .7
      &:hover
        opacity: 1
    .card
      ul
        padding: 0
        list-style: none
      .card-footer .card-block
        padding: 7px 0px
  img
    margin: -20px 0 20px -20px
    width: 100%
    width: calc(100% + 40px)
.mentions
  .items
    list-style: none
    padding: 0
    display: flex
    justify-content: space-between
    align-items: center
    img
      height: 75px
      opacity: .7
      &:hover
        opacity: 1
.socials
  ul
    list-style: none
    display: flex
    justify-content: center
    margin: 0
    padding: 0
    li
      margin: 0 20px
  .social
    height: 80px
    width: 80px
    opacity: .7
    &:hover
      opacity: 1
</style>
