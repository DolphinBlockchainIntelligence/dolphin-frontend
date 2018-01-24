<template>
  <div class="container">
    <div class="heading">
      <h3 class="heading-text">Profile</h3>
    </div>
    <br>
    <div class="form-horizontal">
      <div class="form-group row">
        <label class="col-md-2 control-label">Name</label>
        <div class="col-md-10">
          <input type="text" class="form-control" v-model="userProfile.realName">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-md-2 control-label">Profile</label>
        <div class="col-md-10">
                    <textarea class="form-control"
                              v-model="userProfile.profileText">{{userProfile.profileText}}</textarea>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-md-2 control-label">Photo</label>
        <div class="col-md-10">
          <b-form-file v-model="userProfile.photo"  @change="onFileChange" accept=".jpg, .jpeg, .png, .gif" placeholder="Choose a file..."></b-form-file>
          <div v-if="fileerror"><small class="form-text text-muted alert alert-danger">{{ fileerror }}.</small></div>
          <div v-if="userProfile.photoUrl">
            <img :src="userProfile.photoUrl" height="100"/>
          </div>
        </div>
      </div>
      <div v-for="(socialLink, key) in userProfile['social']">
        <div class="form-group row">
          <label class="col-md-2 control-label">{{key}}</label>
          <div class="col-md-10">
            <input type="text" class="form-control" v-model="userProfile.social[key]">
          </div>
        </div>
      </div>
      <button class="btn btn-primary" v-bind:class="{preloader: preloader, disabled:!showSave}"
              @click.prevent="saveChanges">
        <span v-if="preloader">Loading...</span>
        <span v-else>Save</span>
      </button>
    </div>
    <br>
  </div>
</template>


<script>
  import {mapState} from 'vuex'
  import axios from 'axios'
  import Navbar from './blocks/Navbar'

  export default {
    name: 'userprofile',
    props: ['id'],
    data: () => ({
      userProfile: false,
      showSave: false,
      preloader: false,
      fileerror: false
    }),
    mounted: function () {
      this.getUserProfile()
    },
    watch: {
      userProfile: {
        handler: function (a) {
          if (!this.fileerror)
            this.showSaveBtn()
          // console.log(a)
        },
        deep: true
      }
    },
    methods: {
      getUserProfile() {
        axios.get('/private/user/profile', {}).then((response) => {
          this.userProfile = response.data
          console.log(this.userProfile)
        }, (err) => {
          console.log(err)
        })
      },
      showSaveBtn() {
        this.showSave = true
      },
      saveChanges() {
        if (this.showSave) {
          let config = { headers: { 'Content-Type': 'multipart/form-data' } }
          this.preloader = true
          axios.post(
            '/private/user/profile', this.userProfile, config).then((response) => {
            if (response.data == 'ok') {
              this.preloader = false
              this.showSave = false
              console.log(this.userProfile)
            }
          }, (err) => {
            this.preloader = false
            this.showSave = false
            console.log(err)
          })
        }
      },
      onFileChange (event) {
        console.log(event.target.files[0].size)
        if (event.target.files[0].size > 8000000) {
          this.fileerror = 'File size should be less than 8Mb'
          this.showSave = false
        } else {
          this.fileerror = null
        }
      }
    }
  }
</script>

<style>
  .hidden {
    display: none;
  }
</style>
