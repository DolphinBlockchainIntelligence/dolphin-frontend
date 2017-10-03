<template>
  <div>
    <Navbar>
      <span slot="page-title">Experts evaluations</span>
      <li slot="nav"><router-link to="/experts-evaluations/add" class="waves-effect waves-light btn"><span>Create evaluation</span></router-link></li>
    </Navbar>
    <br>
    <div class="content-wrapper">
      <div class="datatable-options mdl-textfield mdl-js-textfield mdl-shadow--2dp">
        <input class="mdl-textfield__input" v-model="query" placeholder="Search" />
      </div>
      <table class="table mdl-data-table mdl-js-data-table mdl-shadow--2dp">
        <thead>
          <tr>
            <th>
              <i class="material-icons"></i>
              <span>Coin</span>
            </th>
            <th>
              <i class="material-icons"></i>
              <span>Expert</span>
            </th>
            <th v-for="parameter in evaluationsParameters">
              <span>{{parameter.name}}</span>
              <i class="material-icons"></i>
            </th>
            <th>
              <i class="material-icons"></i>
              <span>Expert total rating</span>
            </th>
            <th>
              <span>Expert comments</span>
            </th>
          </tr>
        </thead>
        <tbody name="table-row">
          <tr v-for="evaluation in evaluations" key="tr" class="table-row-item">
            <td>
              {{evaluation.coin}}
            </td>
            <td>
              {{evaluation.name}}
            </td>
            <td v-for="parameter in evaluation.parameters">
              <star-rating :increment="0.01" :fixed-points="2" :read-only="true" :star-size="28" :border-width="1" border-color="#3f51b5" inactive-color="#fff" active-color="#3f51b5" :rating="parameter.rating"></star-rating>
            </td>
            <td>
              <star-rating :increment="0.01" :fixed-points="2" :read-only="false" :star-size="28" :border-width="1" border-color="#3f51b5" inactive-color="#fff" active-color="#3f51b5" :rating="evaluation.rating"></star-rating>
            </td>
            <td>
              <a href="#">Read more</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import StarRating from 'vue-star-rating'
import Navbar from './blocks/Navbar'
export default {
  name: 'experts-evaluations',
  data: () => ({
    evaluations: [
      {
        coin: 'ETH',
        photo: 'https://randomuser.me/api/portraits/men/85.jpg',
        name: 'Edward Umnik',
        rating: 2.5,
        userRating: 0,
        parameters: [
         {
          name: 'Idea',
          rating: 2.6
         },
         {
          name: 'Team',
          rating: 4.6
         },
         {
          name: 'Business Model',
          rating: 1.4
         },
         {
          name: 'Market',
          rating: 3
         }
        ]
      },
      {
        coin: 'DNT',
        photo: 'https://randomuser.me/api/portraits/women/84.jpg',
        name: 'Angelina Pseudofemme',
        rating: 4.5,
        userRating: 0,
        parameters: [
         {
          name: 'Idea',
          rating: 2.6
         },
         {
          name: 'Team',
          rating: 4.6
         },
         {
          name: 'Business Model',
          rating: 1.4
         },
         {
          name: 'Market',
          rating: 1.4
         }
        ]
      },
      {
        coin: 'AE',
        photo: 'https://randomuser.me/api/portraits/women/80.jpg',
        name: 'Margella Mizentroptna',
        rating: 4.5,
        userRating: 0,
        parameters: [
         {
          name: 'Idea',
          rating: 2.6
         },
         {
          name: 'Team',
          rating: 4.6
         },
         {
          name: 'Business Model',
          rating: 1.4
         },
         {
          name: 'Market',
          rating: 1.4
         }
        ]
      },
      {
        coin: 'WAVES',
        photo: 'https://randomuser.me/api/portraits/men/80.jpg',
        name: 'Machell Jindow',
        rating: 2.5,
        userRating: 0,
        parameters: [
         {
          name: 'Idea',
          rating: 2.6
         },
         {
          name: 'Team',
          rating: 4.6
         },
         {
          name: 'Model',
          rating: 1.4
         },
         {
          name: 'Market',
          rating: 1.4
         }
        ]
      }
    ]
  }),
  computed: {
    evaluationsParameters () {
      try {
        return this.evaluations[0].parameters
      } catch(err) {
        return []
      }
    }
  },
  components: {
    StarRating,
    Navbar
  }
}
</script>