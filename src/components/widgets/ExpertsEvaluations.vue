<template>
  <div class="mdl-cell mdl-cell--12-col draggable widget-faces-search" key="faces-search">
    <div class="demo-card-wide mdl-card mdl-shadow--2dp widget-faces widget">
      <div class="mdl-card__title">
        <h2 class="mdl-card__title-text">Experts evaluations</h2>
      </div>
      <div class="mdl-card__menu">
        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect btn-info">
          <i class="material-icons">info</i>
        </button>
        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect btn-drag">
          <i class="material-icons">pan_tool</i>
        </button>
        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect btn-remove" @click="removeWidget()">
          <i class="material-icons">delete</i>
        </button>
      </div>
      <dialog class="mdl-dialog customDialog">
        <h4 class="mdl-dialog__title">Allow data collection?</h4>
        <div class="mdl-dialog__content">
          <p>
            Таким образом начало повседневной работы по формированию позиции позволяет выполнять важные задания по разработке систем массового участия. Товарищи! новая модель организационной деятельности играет важную роль в формировании дальнейших направлений развития. Идейные соображения высшего порядка, а также сложившаяся структура организации обеспечивает широкому кругу (специалистов) участие в формировании систем массового участия. Значимость этих проблем настолько очевидна, что укрепление и развитие структуры влечет за собой процесс внедрения и модернизации системы обучения кадров, соответствует насущным потребностям. Не следует, однако забывать, что начало повседневной работы по формированию позиции позволяет выполнять важные задания по разработке систем массового участия.
          </p>
        </div>
        <div class="mdl-dialog__actions">
          <button type="button" class="mdl-button">Agree</button>
          <button type="button" class="mdl-button close">Disagree</button>
        </div>
      </dialog>
      <div class="widget-content">
        <div class="scrollBlock">
          <div class="scrollBlock__el expertsCard" v-for="expert in experts">
            <div class="expertsCard__header">
              <div class="expertsCard__img">
                <img :src="expert.photo"/>
              </div>
              <div class="expertsCard__ratio">
                <div class="expertsCard__ratio_name">{{expert.name}}</div>
                <star-rating :increment="0.01" :fixed-points="2" star-size="30" border-width="1" border-color="#212E51" inactive-color="#fff" active-color="#212E51"  :rating="expert.rating"></star-rating>
              </div>
            </div>
            <div class="expertsCard__body">
              <table>
                <tr>
                  <td>{{expert.themeName_1}}</td>
                  <td><star-rating :increment="0.01" :fixed-points="2" star-size="28" border-width="1" border-color="#3f51b5" inactive-color="#fff" active-color="#3f51b5" :rating="expert.themeCount_1"></star-rating></td>
                </tr>
                <tr>
                  <td>{{expert.themeName_2}}</td>
                  <td><star-rating :increment="0.01" :fixed-points="2" star-size="28" border-width="1" border-color="#3f51b5" inactive-color="#fff" active-color="#3f51b5" :rating="expert.themeCount_2"></star-rating></td>
                </tr>
                <tr>
                  <td>{{expert.themeName_3}}</td>
                  <td><star-rating :increment="0.01" :fixed-points="2" star-size="28" border-width="1" border-color="#3f51b5" inactive-color="#fff" active-color="#3f51b5" :rating="expert.themeCount_3"></star-rating></td>
                </tr>
              </table>
            </div>
            <a @click.prevent="showReview($event)" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
              Review
            </a>

          </div>
        </div>
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
        photo: '/static/img/widgets/experts.svg',
        name: 'Edward Umnik',
        rating: 2.5,
        themeName_1: 'Idea',
        themeCount_1: 2.6,
        themeName_2: 'Team',
        themeCount_2: 4.6,
        themeName_3: 'Model',
        themeCount_3: 1.4
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
  mounted () {
    // var dialog = document.querySelector('dialog')
    // var showDialogButton = document.querySelector('#show-dialog')
    // if (!dialog.showModal) {
    //   dialogPolyfill.registerDialog(dialog)
    // }
    // showDialogButton.addEventListener('click', () => {
    //   dialog.showModal()
    // })
    // dialog.querySelector('.close').addEventListener('click', () => {
    //   dialog.close()
    // })
  },
  created () {
  },
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
    height: 340px
    width: 280px
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
      padding-right: 10px
    .expertsCard__ratio
      display: table-cell
      vertical-align: top
      i
        color: rgba(0,0,0,.87)
        font-size: 18px
      .expertsCard__ratio_count
        color: #ddd
        font-size: 24px
    .expertsCard__ratio_name
      font-size: 24px
  .expertsCard__body
    table
      td
        font-size: 20px
        color: #757575
        padding: 14px 4px
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
