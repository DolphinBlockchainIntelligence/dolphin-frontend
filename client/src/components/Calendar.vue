<template>
  <div class="container">
    <div class="heading">
      <h3 class="heading-text">Calendar</h3>
      <div class="heading-actions">
        <!-- <a href="/base/edit/" target="_blank" class="btn btn-primary">Add project</a> -->
      </div>
    </div>
    <br>
    <form class="filters">
      <input type="text" class="form-control search" id="search" placeholder="Search" v-model="searchQuery">
    </form>
    <br>
    <table class="table table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Ticker</th>
          <th scope="col">Stage</th>
          <th scope="col">Start date</th>
          <th scope="col">End date</th>
          <th scope="col">Token to sell</th>
          <th scope="col">% of total supply</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" @click="goToProject(project._id, project.name)" :key="project._id" class="pointer">
          <td>{{project.name}}</td>
          <td>{{project.symbol}}</td>
          <td>{{project.saletype}}</td>
          <td>{{project.start}}</td>
          <td>{{project.end}}</td>
          <td>{{project.tokenToSell}}</td>
          <td>{{project.totalTokensPercent}}</td>
        </tr>
      </tbody>
    </table>
    <b-pagination size="md" :total-rows="totalRows" v-model="currentPage" :per-page="25" align="center"></b-pagination>
    <br>
  </div>
</template>


<script>
import axios from 'axios'
// import moment from 'moment/src/moment'
import moment from 'moment'
import routes from '../router'

export default {
  name: 'calendar',
  data: () => ({
    projects: [
      // {
      //   '_id': 'sdf8i69',
      //   'logo': 'https://www.tokendata.io/assets/logos/district0x.png',
      //   'name': 'District0x',
      //   'ticker': 'DNT',
      //   'stage': 'Presale',
      //   'status': 'Ongoing',
      //   'start': '2017-11-12',
      //   'end': '2017-11-28',
      //   'tokenToSell': '1000000',
      //   'totalTokensPercent': '100%',
      // },
      // {
      //   '_id': 'sdf8i70',
      //   'logo': 'https://www.tokendata.io/assets/logos/modum.png',
      //   'name': 'Modum',
      //   'ticker': 'MOD',
      //   'stage': 'ICO',
      //   'status': 'Upcoming',
      //   'start': '2017-11-12',
      //   'end': '2017-11-28',
      //   'tokenToSell': '1000000',
      //   'totalTokensPercent': '100%',
      // },
      // {
      //   '_id': 'sdf8i7sdfhh0',
      //   'logo': 'https://www.tokendata.io/assets/logos/adshares.png',
      //   'name': 'Adshares',
      //   'ticker': 'ADST',
      //   'stage': 'ICO',
      //   'status': 'Past',
      //   'start': '2017-11-12',
      //   'end': '2017-11-28',
      //   'tokenToSell': '1000000',
      //   'totalTokensPercent': '100%',
      // }
    ],
    currentPage: 1,
    totalRows: 0,
    searchQuery: ''
  }),
  computed: {
    // projectsComputed() {
    //   this.projects.forEach(function(item){
    //     try {
    //       item.start = moment(Date.parse(item.start)).fromNow()
    //     } catch(err) {}
    //   })
    //   console.log(this.project)
    // }
  },
  watch: {
    searchQuery: function (query) {
      this.getListing('1', this.searchQuery)
      this.currentPage = 1
    },
    currentPage: function (page) {
      this.getListing(page, this.searchQuery)
    }
  },
  mounted: function() {
    document.getElementById('main').classList.remove('center')
    // axios.get('/events/json', {
    // }).then((response) => {
    //   this.projects = response.data.items
    // }, (err) => {
    //   console.log(err)
    // })
    this.getListing(1, '')
  },
  methods: {
    goToProject: function(_id, name) {
      routes.push({ name: 'Project', params: { _id: _id, name: name }})
    },
    getListing: function(page, searchQuery) {
      axios.get('/base/events/json?page='+page+'&q='+searchQuery, {
      }).then((response) => {
        this.totalRows = response.data.info.total
        this.projects = response.data.items
        this.projects.forEach(function(item){
          try {
            item.start = moment(Date.parse(item.start)).format('YYYY-DD-MM')
            item.end = moment(Date.parse(item.end)).format('YYYY-DD-MM')
          } catch(err) {}
        })
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