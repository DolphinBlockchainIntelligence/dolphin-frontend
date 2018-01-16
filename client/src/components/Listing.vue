<template>
  <div class="container">
    <div class="heading">
      <h3 class="heading-text">Listing</h3>
      <div class="heading-actions">
        <a href="/base/edit/" target="_blank" class="btn btn-primary">Add project</a>
      </div>
    </div>
    <br>
    <form class="filters">
      <input type="text" class="form-control search" id="search" placeholder="Search" v-model="searchQuery">
      <select name="stage" id="stage" class="form-control stage" v-model="status">
        <option value="">Status</option>
        <option value="Development">Development</option>
        <option value="Live">Live</option>
        <option value="Died">Dead</option>
      </select>
      <select name="industry" id="industry" class="form-control industry" v-model="industry">
        <option value="">Industry</option>
        <option value="Platform">Platform</option>
        <option value="Market">Market</option>
        <option value="trading">trading</option>
      </select>
    </form>
    <br>
    <table class="table table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Ticker</th>
          <th scope="col">Status</th>
          <th scope="col">Industry</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" @click="goToProject(project._id, project.name)" :key="project._id" class="pointer">
          <td>{{project.name}}</td>
          <td>{{project.symbol}}</td>
          <td>{{project.stage}}</td>
          <td>{{project.category}}</td>
          <td>{{project.description}}</td>
        </tr>
      </tbody>
    </table>
    <b-pagination size="md" :total-rows="totalRows" v-model="currentPage" :per-page="25" align="center"></b-pagination>
    <br>
  </div>
</template>


<script>
// import { mapState } from 'vuex'
import axios from 'axios'
import routes from '../router'
export default {
  name: 'listing',
  data: () => ({
    projects: [],
    currentPage: 1,
    totalRows: 0,
    searchQuery: '',
    status: '',
    industry: ''
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
  // computed: {
  //   ...mapState([
  //     'user'
  //   ])
  // },
  mounted: function() {
    document.getElementById('main').classList.remove('center')
    this.getListing(1, this.searchQuery, this.industry, this.status)
  },
  watch: {
    searchQuery: function (query) {
      this.getListing('1', this.searchQuery, this.industry, this.status)
      this.currentPage = 1
    },
    currentPage: function (page) {
      this.getListing(page, this.searchQuery, this.industry, this.status)
    },
    industry: function() {
      this.getListing('1', this.searchQuery, this.industry, this.status)
    },
    status: function() {
      this.getListing('1', this.searchQuery, this.industry, this.status)
    }
  },
  methods: {
    goToProject: function(_id, name) {
      routes.push({ name: 'Project', params: { _id: _id, name: name }})
    },
    getListing: function(page, searchQuery, industry, status) {
      axios.get('/base/json?page='+page+'&q='+searchQuery+'&i='+industry+'&s='+status, {
      }).then((response) => {
        this.totalRows = response.data.info.total
        this.projects = response.data.items
        console.log(this.projects)
      }, (err) => {
        console.log(err)
      })
    }
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