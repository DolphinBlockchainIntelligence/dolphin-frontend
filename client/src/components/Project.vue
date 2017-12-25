<template>
  <div class="container">
    <div class="heading">
      <h3 class="heading-text">{{project.current.name}} ({{project.current.symbol}})</h3>
      <div class="heading-actions">
        <a :href="'http://new.petrusenko.pro/base/edit/?'+_id" target="_blank" class="btn btn-primary" v-if="user.icobaseEditor">Edit</a>
        <!-- <a :href="'http://new.petrusenko.pro/base/edit/?'+_id" target="_blank" class="btn btn-primary">Edit</a> -->
      </div>
    </div>
    <br>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'page',
  props: ['_id', 'name'],
  data: () => ({
    project: {}
  }),
  mounted: function() {
    axios.get('/base/' + this._id, {
    }).then((response) => {
      this.project = response.data
      console.log(this.project)
    }, (err) => {
      console.log(err)
    })
  },
  computed: {
    ...mapState([
      'user'
    ])
  }
}
</script>