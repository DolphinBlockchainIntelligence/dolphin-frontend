<template>
  <div class="container">
    <h3>Calendar</h3>
    <br>
    <form class="filters">
      <input type="text" class="form-control search" id="search" placeholder="Search">
    </form>
    <br>
    <table class="table table-hover">
      <thead class="thead-dark">
          <tr>
            <th scope="col">Logo</th>
            <th scope="col">Name</th>
            <th scope="col">Ticker</th>
            <th scope="col">Stage</th>
            <th scope="col">Status</th>
            <th scope="col">Start date</th>
            <th scope="col">End date</th>
            <th scope="col">Token to sell</th>
            <th scope="col">% of total supply</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="project in projects">
            <td><img :src="project.logo" :alt="project.name"></td>
            <td>{{project.name}}</td>
            <td>{{project.ticker}}</td>
            <td>{{project.stage}}</td>
            <td>{{project.status}}</td>
            <td>{{project.startDate}}</td>
            <td>{{project.endDate}}</td>
            <td>{{project.tokenToSell}}</td>
            <td>{{project.totalTokensPercent}}</td>
          </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
export default {
  name: 'calendar',
  data: () => ({
    projects: [
      {
        '_id': 'sdf8i69',
        'logo': 'https://www.tokendata.io/assets/logos/district0x.png',
        'name': 'District0x',
        'ticker': 'DNT',
        'stage': 'Presale',
        'status': 'Ongoing',
        'startDate': '2017-11-28T11:58:19.870Z',
        'endDate': '2017-11-28T11:58:19.870Z',
        'tokenToSell': '1000000',
        'totalTokensPercent': '100%',
      },
      {
        '_id': 'sdf8i70',
        'logo': 'https://www.tokendata.io/assets/logos/modum.png',
        'name': 'Modum',
        'ticker': 'MOD',
        'stage': 'ICO',
        'status': 'Upcoming',
        'startDate': '2017-11-28T11:58:19.870Z',
        'endDate': '2017-11-28T11:58:19.870Z',
        'tokenToSell': '1000000',
        'totalTokensPercent': '100%',
      },
      {
        '_id': 'sdf8i7sdfhh0',
        'logo': 'https://www.tokendata.io/assets/logos/adshares.png',
        'name': 'Adshares',
        'ticker': 'ADST',
        'stage': 'ICO',
        'status': 'Past',
        'startDate': '2017-11-28T11:58:19.870Z',
        'endDate': '2017-11-28T11:58:19.870Z',
        'tokenToSell': '1000000',
        'totalTokensPercent': '100%',
      }
    ]
  }),
  mounted: function() {
    document.getElementById('main').classList.remove('center')
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