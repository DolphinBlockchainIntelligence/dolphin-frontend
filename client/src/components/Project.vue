<template>
  <div class="project">
    <h1>{{name}}</h1>
    <p>{{project}}</p>
    <a href="#" class="btn btn-primary" v-if="user.icobaseEditor">Edit</a>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'page',
  props: ['_id', 'name'],
  data: () => ({
    project: []
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