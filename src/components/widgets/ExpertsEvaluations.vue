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
          <div class="scrollBlock__el expertsCard" v-for="n in 10">
            <div class="expertsCard__header">
              <div class="expertsCard__img">
                <img src="/static/img/widgets/experts.svg"/>
              </div>
              <div class="expertsCard__ratio">
                <div class="expertsCard__ratio_name">Edward Umnik</div>
                  <i class="material-icons">star</i>
                  <i class="material-icons">star_half</i>
                  <i class="material-icons">star_border</i>
                  <i class="material-icons">star_border</i>
                  <i class="material-icons">star_border</i>
                  <span class="expertsCard__ratio_count">2,4</span>
              </div>
            </div>
            <div class="expertsCard__body">
              <table>
                <tr>
                  <td>
                    Idea
                  </td>
                  <td>
                    <i class="material-icons">star</i>
                    <i class="material-icons">star_half</i>
                    <i class="material-icons">star_border</i>
                    <i class="material-icons">star_border</i>
                    <i class="material-icons">star_border</i>
                  </td>
                </tr>
                <tr>
                  <td>
                    Idea
                  </td>
                  <td>
                    <i class="material-icons">star</i>
                    <i class="material-icons">star_half</i>
                    <i class="material-icons">star_border</i>
                    <i class="material-icons">star_border</i>
                    <i class="material-icons">star_border</i>
                  </td>
                </tr>
                <tr>
                  <td>
                    Idea
                  </td>
                  <td>
                    <i class="material-icons">star</i>
                    <i class="material-icons">star_half</i>
                    <i class="material-icons">star_border</i>
                    <i class="material-icons">star_border</i>
                    <i class="material-icons">star_border</i>
                  </td>
                </tr>
              </table>
            </div>
            <div class="expertsCard__footer">
              <a id="show-dialog" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                Review
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
import {lory} from 'lory.js'

export default {
  name: "experts-evaluations",
  props: ['id'],
  data: function data() {
    return {

    }
  },
  mounted () {
    var dialog = document.querySelector('dialog')
    var showDialogButton = document.querySelector('#show-dialog')
    if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog)
    }
    showDialogButton.addEventListener('click', () => {
      dialog.showModal()
    })
    dialog.querySelector('.close').addEventListener('click', () => {
      dialog.close()
    })
  },
  created () {
  },
  methods: {
    removeWidget: () => {
      this.$root.$emit('removeWidget', this.id)
    }
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
    height: 100%
    width: 200px
.expertsCard
  padding: 10px
  box-shadow: 0 0 2px #ccc
  .expertsCard__header
    display: table
    width: 100%
    border-bottom: 1px solid #ddd
    padding-bottom: 8px
    .expertsCard__img
      width: 40px
      height: 40px
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
  .expertsCard__body
    table
      td
        font-size: 16px
        color: #ccc
        padding: 4px
        i
          font-size: 20px
          color: rgba(0,0,0,.87)
.customDialog
  width: 80%
</style>
