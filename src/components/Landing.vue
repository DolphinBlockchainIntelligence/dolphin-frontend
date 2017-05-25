<template>
<div class="landing container">
  <section class="intro">
    <h1>{{ intro.title }}</h1>
    <h3>{{ intro.subtitle }}</h3>
    <h4>{{ intro.description }}</h4>
  </section>
  <section class="about">
    <h1>{{ about.title }}</h1>
    <h4>{{ about.description }}</h4>
  </section>
  <section class="features">
    <h1>{{ features.title }}</h1>
    <ul>
      <li v-for="feature in features.items">{{ feature }}</li>
    </ul>
  </section>
  <section class="screenshots">
    <h1>{{ screenshots.title }}</h1>
    <h3>{{ screenshots.subtitle }}</h3>
  </section>
  <section class="roadmap">
    <h1>{{ roadmap.title }}</h1>
    <h3>{{ roadmap.subtitle }}</h3>
    <ul>
      <li v-for="stage in roadmap.stages">{{ stage }}</li>
    </ul>
  </section>
  <section class="team">
    <h1>{{ team.title }}</h1>
    <h3>{{ team.subtitle }}</h3>
    <ul>
      <li v-for="member in team.members">{{ member }}</li>
    </ul>
  </section>
  <section class="mentions">
    <h1>{{ mentions.title }}</h1>
    <ul>
      <li v-for="mention in mentions.items">{{ mention }}</li>
    </ul>
  </section>
  <section class="socials">
    <ul>
      <li v-for="social in socials">{{ social }}</li>
    </ul>
  </section>
</div>
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
    socials: []
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
