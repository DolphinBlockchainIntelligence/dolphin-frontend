<template>
  <main class="mdl-layout__content">
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--12-col">
        <h4>Widget market</h4>
      </div>
    </div>
    <ul class="widgetsList">
      <li class="widgetsList__el" v-for="widget in widgets">
        <div class="mdl-card mdl-shadow--2dp">
          <div class="mdl-card__title mdl-card--expand" :style=" {'background':`url('${widget.img}') no-repeat ${widget.bg}` }">
            <star-rating :increment="0.01" :fixed-points="2" :read-only="true" :star-size="10" :border-width="1" border-color="#3f51b5" inactive-color="#fff" active-color="#3f51b5" :rating="widget.rating"></star-rating>
            <a class="author" href="#">{{widget.autor}}</a>
          </div>
          <div class="mdl-card__supporting-text">
            <h4>{{widget.name}}</h4>
            <p>{{widget.text}}</p>

          </div>
          <div class="mdl-card__actions mdl-card--border">
            <div class="widgets_action">
              <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" v-if="widget.purchase">
                ADD
              </a>
              <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" v-if="!widget.purchase">
                BUY
              </a>
            </div>
            <div class="widgets_price">
              <div v-if="widget.purchase">
                <p class="free">{{widget.price}}</p>
              </div>
              <div v-if="!widget.purchase">
                <p class="not_free">{{widget.price}}</p>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </main>
</template>


<script>
import StarRating from 'vue-star-rating'
export default {
  name: 'store',
  data: () => ({
    widgets: [
      {
        img: '/static/img/widgets/sentiments.svg',
        bg: '#fff',
        autor: 'Dolphin BI',
        name: 'Sentiments',
        rating: 5,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.',
        price: '$560',
        purchase: false
      },
      {
        img: '/static/img/widgets/faces.svg',
        bg: '#fff',
        autor: 'Dolphin BI',
        name: 'ICOface',
        rating: 4.5,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.',
        price: 'Free',
        purchase: true
      },
      {
        img: '/static/img/widgets/funds-raised.svg',
        bg: '#fff',
        autor: 'Dolphin BI',
        name: 'Funds raised',
        rating: 4.5,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.',
        price: 'Free',
        purchase: true
      },
      {
        img: '/static/img/widgets/funding-amounts.svg',
        bg: '#fff',
        autor: 'Dolphin BI',
        name: 'Funding amounts',
        rating: 4.5,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.',
        price: 'Free',
        purchase: true
      },
      {
        img: '/static/img/widgets/experts.svg',
        bg: '#fff',
        autor: 'Dolphin BI',
        name: 'Experts evaluations',
        rating: 4.5,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.',
        price: 'Free',
        purchase: true
      },
      {
        img: '/static/img/widgets/code.svg',
        bg: '#fff',
        autor: 'Dolphin BI',
        name: 'Code audit',
        rating: 4.5,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.',
        price: 'Free',
        purchase: true
      },
      {
        img: '/static/img/widgets/portfolio.svg',
        bg: '#fff',
        autor: 'Dolphin BI',
        name: 'Portfolio',
        rating: 4.5,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.',
        price: 'Free',
        purchase: true
      },
      {
        img: '/static/img/widgets/likes.svg',
        bg: '#fff',
        autor: 'Dolphin BI',
        name: 'Likes',
        rating: 4.5,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.',
        price: 'Free',
        purchase: true
      },
      {
        img: '/static/img/widgets/description.svg',
        bg: '#fff',
        autor: 'Dolphin BI',
        name: 'Description',
        rating: 4.5,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.',
        price: 'Free',
        purchase: true
      }
    ]
  }),
  components: {
    StarRating
  }
}
</script>


<style lang="sass" scoped>
.widgetsList
  margin-left: -25px
  .widgetsList__el
    display: inline-block
    vertical-align: top
    margin-left: 25px
    margin-bottom: 25px
    .mdl-card
      width: 320px !important
      height: 295px
    .mdl-card__title
      height: 110px
      color: #424242
      position: relative
      background-size: 90px !important
      background-position: 95% 20% !important
    .author
      font-weight: bold
      opacity: .7
      color: #3f51b5 !important
      font-size: 14px
      &:hover
        opacity: 1
    .star-rating
      position: absolute
      top: 10px
      left: 14px
      color: #424242
    .mdl-card__supporting-text
      h4
        margin: 0
    .mdl-card__actions
      display: flex
      justify-content: space-between
      align-items: baseline
      .widgets_price
        flex: 0 0 auto
        padding: 0 20px
        .free
          color: green
        .not_free
          color: red
      .widgets_action
        flex: 1 0 auto
</style>
