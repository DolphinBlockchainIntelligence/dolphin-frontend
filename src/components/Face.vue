<template>
  <div id="Face">
    <div class="container">
      <div class="row" style="margin-top: 50px; margin-bottom: 30px; text-align: center">
        <form id="searchByPhoto" class="form-inline" @submit.prevent="searchByPhoto()">
          <label for="exampleInputName2" style="margin-right: 20px">Search by picture</label>
            <span class="btn btn-primary btn-file">
              Upload picture <input id="searchByPhotoInput" type="file" onchange="document.getElementById('searchByPhoto').submit()">
            </span>
        </form>
      </div>
      <hr>
      <div id="faces" class="row">
        <template v-if="notFound">
          <h3 style="margin: 0 auto">Not found any similar faces</h3>
          </br>
        </template>
        <template v-else>
          <div v-for="face in faces" class="col-xs-6 col-md-3">
            <a href="#" :data-id="face.id" class="thumbnail card" @click.prevent="faceClick($event)">
              <img :src="'https://s3.amazonaws.com/icofaces/'+ face.id + '.jpg'" :alt="face.name" :data-id="face.id"/>
            </a>
          </div>
        </template>
      </div>
    </div>
    <b-modal id="myModal" title="Submit your name" ref="my_modal" :hide-footer="true">
      <template slot="modal-title" name="modal-footer">
        <button :data-face="modal.face" @click.prevent="similarClick($event)" id="similar" type="button" class="btn btn-warning" style="float: left; padding: 5px 50px">Find similar faces</button>
      </template>
      <img class="img-thumbnail" :src="'https://s3.amazonaws.com/icofaces/' + modal.id + '.jpg'" style="max-width: 217px; max-height: 300px; margin: 10px;" align="left">
      <h3><a :href="modal.url" target="_blank">{{ modal.name }}</a></h3>
      <p>
        {{ modal.role }} of </b>
        <a :href="modal.site" target="_blank"> {{ modal.project }}</a>
      </p>
    </b-modal>
  </div>
</template>


<script>
import axios from 'axios'
import AWS from 'aws-sdk'
AWS.config.update({
    accessKeyId: 'AKIAIACAV2QTUVXMA2UA',
    secretAccessKey: ''
})
let s3 = new AWS.S3({region: 'us-east-1'})
let rekognition = new AWS.Rekognition({region: 'us-east-1'})
export default {
  name: 'Face',
  data: function data() {
    return {
      faces: {},
      modal: {},
      notFound: false
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
    faceClick: function (event) {
      this.modal = this.faces[event.currentTarget.dataset.id]
      this.$refs.my_modal.show()
    },
    similarClick: function (event) {
      rekognition.searchFaces({
          CollectionId: "icofaces",
          FaceId: event.currentTarget.dataset.face,
          FaceMatchThreshold: 70,
          MaxFaces: 10
      }, function(err, data) {
          if(err) return alert('Error');
          if(data && data.FaceMatches) {
              this.faces = data.FaceMatches
          }
      });
    },
    searchByPhoto: function (event) {
      let file = document.getElementById('searchByPhotoInput').files[0]
      s3.upload({
          Bucket: 'icosearch',
          Key: file.name,
          Body: file,
          ACL: 'public-read'
      }, function(err, data) {
          if(err) return alert('Error')
          rekognition.searchFacesByImage({
              CollectionId: "icofaces",
              FaceMatchThreshold: 70,
              MaxFaces: 10,
              Image: {
                  S3Object: {
                      Bucket: data.Bucket,
                      Name: data.Key
                  }
              }
          }, function(err, data) {
              if(err) return alert('Error')
              if(data && data.FaceMatches) {
                  this.faces = data.FaceMatches
              }
          })
      })
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
  cursor: pointer
</style>
