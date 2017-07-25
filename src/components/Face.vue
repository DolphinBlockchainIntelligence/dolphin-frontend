<template>
  <div id="Face">
    <div class="container">
      <div class="row" style="margin-top: 50px; margin-bottom: 30px; text-align: center">
        <form class="form-inline">
          <label for="exampleInputName2" style="margin-right: 20px">Search by picture</label>
            <span class="btn btn-primary btn-file">
              Upload picture <input type="file" id="searchphoto">
            </span>
        </form>
      </div>
      <hr>
      <div id="faces" class="row">
        <div v-for="face in faces" class="col-xs-6 col-md-3">
          <a href="#" :data-id="face.id" class="thumbnail card" @click.prevent="faceClick()">
            <img :src="'https://s3.amazonaws.com/icofaces/'+ face.id + '.jpg'" :alt="face.name" />
          </a>
        </div>
      </div>
    </div>
    <b-modal id="myModal" title="Submit your name" ref="my_modal">
      <template slot="modal-title" name="modal-footer">
        <button id="similar" type="button" class="btn btn-warning" style="float: left; padding: 5px 50px">Find similar faces</button>
      </template>
      <img src="" style="max-width: 300px; max-height: 300px; margin: 10px;" align="left">
      <h3></h3>
      <p></p>
      <template slot="modal-footer" name="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </template>
    </b-modal>
    <!-- <div id="myModal" class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <button id="similar" type="button" class="btn btn-warning" style="float: left; padding: 5px 50px">Find similar faces</button>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              </div>
              <div class="modal-body">
                  <img src="" style="max-width: 300px; max-height: 300px; margin: 10px;" align="left">
                  <h3></h3>
                  <p></p>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              </div>
          </div>
      </div>
    </div> -->
  </div>
</template>


<script>
import $ from 'jquery'
import axios from 'axios'
import AWS from 'aws-sdk'
export default {
  name: "Face",
  data: function data() {
    return {
      faces: {},
      modal: {}
    }
  },
  created: function () {
    axios.get('/static/data/faces.json')
    .then(response => {
      this.faces = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  mounted: function () {

  },
  methods: {
    faceClick: function () {
      console.log(this.modal)
      this.$refs.my_modal.show()
    }
  }
}
</script>


<style lang="sass">
.form-inline
  margin: 0 auto
.col-xs-6
  text-align: center
  margin-bottom: 30px
.thumbnail
  display: block !important
  // z-index: 1500
  &:hover
    border-color: #0275d8
    cursor: pointer
  img
    height: 180px
    max-width: 171px
.btn-file
  position: relative
  overflow: hidden
.btn-file input[type=file]
  position: absolute
  top: 0
  right: 0
  min-width: 100%
  min-height: 100%
  font-size: 100px
  text-align: right
  filter: alpha(opacity=0)
  opacity: 0
  outline: none
  background: white
  cursor: inherit
  display: block
  // z-index: 1500
  cursor: pointer
// .modal
//   z-index: 2000
</style>
