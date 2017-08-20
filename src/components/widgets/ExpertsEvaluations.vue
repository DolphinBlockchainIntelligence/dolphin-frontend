<template>
  <div id="experts-evaluations">
    <div class="scrollBlock">
      <div class="scrollBlock__el expertsCard" v-for="expert in experts">
        <div class="expertsCard__header">
          <a class="expertsCard__img" href="#">
            <img :src="expert.photo"/>
          </a>
          <div class="expertsCard__ratio">
            <a class="expertsCard__ratio_name" href="#">{{expert.name}}</a>
            <star-rating :increment="0.01" :fixed-points="2" :star-size="28" :border-width="1" border-color="#212E51" inactive-color="#fff" active-color="#212E51" :rating="expert.rating"></star-rating>
          </div>
        </div>
        <div class="expertsCard__body">
          <table>
            <tr v-for="parameter in expert.parameters">
              <td>{{parameter.name}}</td>
              <td><star-rating :increment="0.01" :fixed-points="2" :read-only="true" :star-size="28" :border-width="1" border-color="#3f51b5" inactive-color="#fff" active-color="#3f51b5" :rating="parameter.rating"></star-rating></td>
            </tr>
          </table>
        </div>
        <a @click.prevent="showReview($event)" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
          Review
        </a>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
import StarRating from 'vue-star-rating'
export default {
  name: "experts-evaluations",
  props: ['id'],
  data: () => ({
    experts: [
      {
        photo: 'https://randomuser.me/api/portraits/men/85.jpg',
        name: 'Edward Umnik',
        rating: 2.5,
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
         }
        ]
      },
      {
        photo: 'https://randomuser.me/api/portraits/women/84.jpg',
        name: 'Angelina Pseudofemme',
        rating: 4.5,
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
         }
        ]
      },
      {
        photo: 'https://randomuser.me/api/portraits/women/80.jpg',
        name: 'Margella Mizentroptna',
        rating: 4.5,
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
         }
        ]
      },
      {
          photo: 'https://randomuser.me/api/portraits/men/80.jpg',
          name: 'Machell Jindow',
          rating: 2.5,
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
           }
          ]
        }

    ],
    reviews: [
      {
        id: '',
        title: '',
        text: ''
      }
    ]
  }),
  methods: {
    removeWidget: () => {
      this.$root.$emit('removeWidget', this.id)
    },
    showReview: (event) => {
      console.log(event.target)
    }
  },
  components: {
    StarRating
  }
}


</script>
<style lang="sass" scoped>
.title
  padding: 0 10px
.scrollBlock
  width: 100%
  white-space: nowrap
  overflow-y: hidden
  overflow-x: auto
  padding: 10px
  -webkit-overflow-scrolling: touch
  &__el
    display: inline-block
    margin-right: 10px
    vertical-align: top
    height: 298px
.expertsCard
  padding: 25px 10px 35px
  box-shadow: 0 0 2px #ccc
  position: relative
  .mdl-button
    position: absolute
    bottom: 0
    left: 0
    width: 100%
    padding: 0
  .expertsCard__header
    display: table
    width: 100%
    border-bottom: 1px solid #ddd
    padding-bottom: 25px
    .expertsCard__img
      width: 50px
      height: 50px
      display: table-cell
      vertical-align: top
      padding-right: 12px
      img
        width: 50px
        height: 50px
        border-radius: 100%
        box-shadow: 0 0 16px #ccc
        transition: box-shadow .2s
      &:hover
        img
          box-shadow: box-shadow 0 0 20px #ddd
    .expertsCard__ratio
      display: table-cell
      vertical-align: top
      font-size: 20px
      i
        color: rgba(0,0,0,.87)
        font-size: 18px
      .expertsCard__ratio_count
        color: #ddd
        font-size: 24px
    .expertsCard__ratio_name
      font-size: 20px
      text-overflow: ellipsis
      white-space: nowrap
      width: 220px
      display: block
      overflow: hidden
      line-height: 28px
      display: block
      color: #3f51b5
      opacity: .9
      transition: opacity .2s
      text-decoration: none
      &:hover
        opacity: 1
  .expertsCard__body
    table
      td
        font-size: 20px
        color: #757575
        padding: 14px 1px
        vertical-align: middle
        i
          font-size: 20px
          color: rgba(0,0,0,.87)
        .star-rating
          .rating-text
            margin-top: 0 !important
.customDialog
  width: 80%
</style>
