<template>
  <div>
    <Navbar>
      <span slot="page-title">Add evaluation</span>
    </Navbar>
    <br>
    <div class="content-wrapper">
      <div class="row">
        <form class="col s12">
          <table>
            <tr>
              <td>
                Idea
                <star-rating :increment="0.01" :fixed-points="2" :read-only="false" :star-size="28" :border-width="1" border-color="#3f51b5" inactive-color="#fff" active-color="#3f51b5" :rating="0"></star-rating>
              </td>
            </tr>
            <tr>
              <td>
                Team
                <star-rating :increment="0.01" :fixed-points="2" :read-only="false" :star-size="28" :border-width="1" border-color="#3f51b5" inactive-color="#fff" active-color="#3f51b5" :rating="0"></star-rating>
              </td>
            </tr>
            <tr>
              <td>
                Business model
                <star-rating :increment="0.01" :fixed-points="2" :read-only="false" :star-size="28" :border-width="1" border-color="#3f51b5" inactive-color="#fff" active-color="#3f51b5" :rating="0"></star-rating>
              </td>
            </tr>
            <tr>
              <td>
                Market
                <star-rating :increment="0.01" :fixed-points="2" :read-only="false" :star-size="28" :border-width="1" border-color="#3f51b5" inactive-color="#fff" active-color="#3f51b5" :rating="0"></star-rating>
              </td>
            </tr>
            <tr>
              <td>
                Comment
                <div class="input-field">
                  <v-text-area name="ta" id="ta"></v-text-area>
                </div>
              </td>
            </tr>
          </table>
          <button type="submit" class="waves-effect waves-light btn">Create evaluation</button>
        </form>
      </div>
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
    experts: [
      {
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
          name: 'Model',
          rating: 1.4
         },
         {
          name: 'Market',
          rating: 1.4
         }
        ]
      },
      {
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
          name: 'Model',
          rating: 1.4
         },
         {
          name: 'Market',
          rating: 1.4
         }
        ]
      },
      {
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
          name: 'Model',
          rating: 1.4
         },
         {
          name: 'Market',
          rating: 1.4
         }
        ]
      },
      {
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
  components: {
    StarRating,
    Navbar
  }
}
</script>