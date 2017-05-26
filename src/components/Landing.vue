<template lang="pug">
  .landing.container
    section.intro
      h1 {{ $t('landingIntroTitle') }}
      h3 {{ $t('landingIntroSubtitle') }}
      h4 {{ $t('landingIntroDescription') }}
    section.about
      h1 {{ about.title }}
      h4 {{ about.description }}
    section.features
      h1 {{ features.title }}
      ul
        li(v-for='feature in features.items') {{ feature }}
    section.screenshots
      h1 {{ screenshots.title }}
      h3 {{ screenshots.subtitle }}
    section.roadmap
      h1 {{ roadmap.title }}
      h3 {{ roadmap.subtitle }}
      ul
        li(v-for='stage in roadmap.stages') {{ stage }}
    section.team
      h1 {{ team.title }}
      h3 {{ team.subtitle }}
      ul
        li(v-for='member in team.members') {{ member }}
    section.mentions
      h1 {{ mentions.title }}
      ul
        li(v-for='mention in mentions.items') {{ mention }}
    section.socials
      ul
        li(v-for='social in socials')
          a(href='social.url') {{ social.title }}
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
