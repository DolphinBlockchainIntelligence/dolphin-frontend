<template>
  <div class="container">
    <h3>Listing</h3>
    <br>
    <form class="filters">
      <input type="text" class="form-control search" id="search" placeholder="Search">
      <select name="stage" id="stage" class="form-control stage">
        <option value="All">Stage</option>
        <option value="Development">Development</option>
        <option value="Live">Live</option>
        <option value="Died">Died</option>
      </select>
      <select name="industry" id="industry" class="form-control industry">
        <option value="All">Industry</option>
        <option value="Platform">Platform</option>
        <option value="Market">Market</option>
      </select>
    </form>
    <br>
    <table class="table table-hover">
      <thead class="thead-dark">
          <tr>
            <th scope="col">Logo</th>
            <th scope="col">Name</th>
            <th scope="col">Ticker</th>
            <th scope="col">Stage</th>
            <th scope="col">Industry</th>
            <th scope="col">Description</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="project in projects">
            <td><img :src="project.logo" :alt="project.name"></td>
            <td>{{project.name}}</td>
            <td>{{project.symbol}}</td>
            <td>{{project.stage}}</td>
            <td>{{project.category}}</td>
            <td>{{project.description}}</td>
          </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  name: 'listing',
  data: () => ({
    projects: []
    // projects: [
    //   {
    //     '_id': 'sdf8i69',
    //     'logo': 'https://www.tokendata.io/assets/logos/district0x.png',
    //     'name': 'District0x',
    //     'ticker': 'DNT',
    //     'stage': 'Died',
    //     'industry': 'Platform',
    //     'description': 'Network of decentralized markets and communities'
    //   },
    //   {
    //     '_id': 'sdf8i70',
    //     'logo': 'https://www.tokendata.io/assets/logos/modum.png',
    //     'name': 'Modum',
    //     'ticker': 'MOD',
    //     'stage': 'Died',
    //     'industry': 'Market',
    //     'description': 'Data integrity for supply chain operations'
    //   }
    // ]
  }),
  mounted: function() {
    document.getElementById('main').classList.remove('center')
    // axios.get('/base/json?page=1', {
    axios.get('/base/json', {
    }).then((response) => {
      this.projects = response.data.items
    }, (err) => {
      console.log(err)
    })
  }
}
</script>

<style lang="sass" scoped>
.filters
  display: flex
  .search
    flex: 0 1 auto
  .stage, .industry
    flex: 0 1 200px
    margin-left: 20px
</style>