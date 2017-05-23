<template>
<div class="landing container">
  <section class="intro">
    <h1>{{ landing.intro.title }}</h1>
    <h3>{{ landing.intro.subtitle }}</h3>
    <h4>{{ landing.intro.description }}</h4>
  </section>
  <section class="about">
    <h1>{{ landing.about.title }}</h1>
    <h4>{{ landing.about.description }}</h4>
  </section>
  <section class="features">
    <h1>{{ landing.features.title }}</h1>
    <ul>
      <li v-for="feature in landing.features.items">{{ feature }}</li>
    </ul>
  </section>
  <section class="screenshots">
    <h1>{{ landing.screenshots.title }}</h1>
    <h3>{{ landing.screenshots.subtitle }}</h3>
  </section>
  <section class="roadmap">
    <h1>{{ landing.roadmap.title }}</h1>
    <h3>{{ landing.roadmap.subtitle }}</h3>
    <ul>
      <li v-for="stage in landing.roadmap.stages">{{ stage }}</li>
    </ul>
  </section>
  <section class="team">
    <h1>{{ landing.team.title }}</h1>
    <h3>{{ landing.team.subtitle }}</h3>
    <ul>
      <li v-for="member in landing.team.members">{{ member }}</li>
    </ul>
  </section>
  <section class="mentions">
    <h1>{{ landing.mentions.title }}</h1>
    <ul>
      <li v-for="mention in landing.mentions.items">{{ mention }}</li>
    </ul>
  </section>
  <section class="socials">
    <ul>
      <li v-for="social in landing.socials">{{ social }}</li>
    </ul>
  </section>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'landing',
  data: () => ({
    landing: []
  }),
  created () {
    axios.get('/static/data/landing.json')
    .then(response => {
      this.landing = response.data
      console.log(this.landing)
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>
