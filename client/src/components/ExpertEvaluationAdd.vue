<template>
  <div class="container">
    <div class="heading">
      <h3 class="heading-text">Add expert opinion</h3>
    </div>
    <br>
    <form @submit.prevent="onSubmit()">
      <div class="form-group">
        <label>Idea</label>
        <star-rating :increment="1" :fixed-points="2" :read-only="false" :star-size="28" :border-width="1" border-color="#3f51b5" inactive-color="#fff" active-color="#3f51b5" v-model="idea"></star-rating>
      </div>
      <div class="form-group">
        <label>Team</label>
        <star-rating :increment="1" :fixed-points="2" :read-only="false" :star-size="28" :border-width="1" border-color="#3f51b5" inactive-color="#fff" active-color="#3f51b5" v-model="team"></star-rating>
      </div>
      <div class="form-group">
        <label>Busmodel</label>
        <star-rating :increment="1" :fixed-points="2" :read-only="false" :star-size="28" :border-width="1" border-color="#3f51b5" inactive-color="#fff" active-color="#3f51b5" v-model="busmodel"></star-rating>
      </div>
      <div class="form-group">
        <label>Market</label>
        <star-rating :increment="1" :fixed-points="2" :read-only="false" :star-size="28" :border-width="1" border-color="#3f51b5" inactive-color="#fff" active-color="#3f51b5" v-model="market"></star-rating>
      </div>
      <div class="form-group">
        <label>Tech</label>
        <star-rating :increment="1" :fixed-points="2" :read-only="false" :star-size="28" :border-width="1" border-color="#3f51b5" inactive-color="#fff" active-color="#3f51b5" v-model="tech"></star-rating>
      </div>
      <div class="form-group">
        <label>Code</label>
        <star-rating :increment="1" :fixed-points="2" :read-only="false" :star-size="28" :border-width="1" border-color="#3f51b5" inactive-color="#fff" active-color="#3f51b5" v-model="code"></star-rating>
      </div>
      <div class="form-group">
        <label>Legal</label>
        <star-rating :increment="1" :fixed-points="2" :read-only="false" :star-size="28" :border-width="1" border-color="#3f51b5" inactive-color="#fff" active-color="#3f51b5" v-model="legal"></star-rating>
      </div>

      <div class="form-group">
        <label for="review">Review</label>
        <textarea rows="4" v-model="review" class="form-control" id="review"></textarea>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import StarRating from 'vue-star-rating'


export default {
  name: 'ExpertEvaluationAdd',
  data: () => ({
    idea: 0,
    team: 0,
    busmodel: 0,
    market: 0,
    tech: 0,
    code: 0,
    legal: 0,
    review: ''
  }),
  components: {
    StarRating
  },
  methods: {
    onSubmit: function(){
      var form = {
        idea: this.idea,
        team: this.team,
        busmodel: this.busmodel,
        market: this.market,
        tech: this.tech,
        code: this.code,
        legal: this.legal,
        review: this.review
      }
      console.log(form)
      axios.post('/base/rating/5a252cfd6ea08d0f96839aaa', form)
      .then(function(response){
        console.log(response.status);
      }); 
    }
  },
}


</script>