<template>
  <div class="container">
    <div class="heading">
      <h3 class="heading-text">Listing</h3>
      <div class="heading-actions">
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
        <option :value="i" v-for="i in industries" :key="i">{{i}}</option>
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
        <tr v-for="(project, id) in projects" @click="goToProject(project._id, project.name)" :key="id" class="pointer">
          <td>{{project.name}}</td>
          <td>{{project.symbol}}</td>
          <td>{{project.stage}}</td>
          <td>{{project.industry}}</td>
          <td>{{project.description}}</td>
        </tr>
      </tbody>
    </table>
    <b-pagination size="md" :total-rows="totalRows" v-model="currentPage" :per-page="25" align="center"></b-pagination>
    <br>
  </div>
</template>

<script>
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
    industry: '',
    category: '',
    industries: ['Coal', 'Oil & Gas', 'Oil & Gas Related Equipment and Services', 'Renewable Energy', 'Uranium', 'Chemicals', 'Metals & Mining', 'Construction Materials', 'Paper & Forest Products', 'Containers & Packaging', 'Aerospace & Defense', 'Machinery, Equipment & Components', 'Construction & Engineering', 'Diversified Trading & Distributing', 'Professional & Commercial Services', 'Industrial Conglomerates', 'Freight & Logistics Services', 'Passenger Transportation Services', 'Transport Infrastructure', 'Automobiles & Auto Parts', 'Textiles & Apparel', 'Homebuilding & Construction Supplies', 'Household Goods', 'Leisure Products', 'Hotels & Entertainment Services', 'Media & Publishing', 'Diversified Retail', 'Other Specialty Retailers', 'Beverages', 'Food & Tobacco', 'Personal &Household Products & Services', 'Food & Drug Retailing', 'Banking Services', 'Investment Banking & Investment Services', 'Insurance', 'Real Estate Operations', 'Residential & Commercial REIT', 'Collective Investments', 'Holding Companies', 'Healthcare Equipment & Supplies', 'Healthcare Providers & Services', 'Pharmaceuticals', 'Biotechnology & Medical Research', 'Semiconductors & Semiconductor Equipment', 'Communications & Networking', 'Electronic Equipment & Parts', 'Office Equipment', 'Computers, Phones & Household Electronics', 'Software & IT Services', 'Telecommunications Services', 'Electrical Utilities & IPPs', 'Natural Gas Utilities', 'Water Utilities', 'Multiline Utilities'],
    categories: ['Blockchain infrastructure', 'Crypto-currency', 'Distributed Application', 'Identity Platform', 'Smart-contract platform', 'Tokenized Application', 'Non-software (just fundraising)', 'Other']
  }),
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
  .stage, .industry, .category
    flex: 0 1 200px
    margin-left: 20px
</style>