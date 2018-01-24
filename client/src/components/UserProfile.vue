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
          <div v-if="!userProfile.photo">
            <input type="file" class="form-control-file" @change="onFileChange">
          </div>
          <div v-else>
            <img :src="userProfile.photo" height="100"/>
            <button @click="removeImage">Remove image</button>
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
      // userProfile: false
      userProfile: {
        "realName": "Eugen Soloviov",
        "photo": "",
        "profileText": "lalala",
        "social": {
          "Facebook": 'https://www.facebook.com/ArtemEVS',
          'Twitter': 'https://twitter/123',
          'Reddit': '',
          'Github': '',
          'Youtube': '',
          'Bitcointalk': ''
        }
      },
      showSave: false,
      preloader: false
    }),
    mounted: function () {
      this.getUserProfile();
    },
    watch: {
      userProfile: {
        handler: function (a) {
          this.showSaveBtn()
          console.log(a)
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
          this.preloader = true
          axios.post('/private/user/profile', this.userProfile).then((response) => {
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
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files
        if (!files.length)
          return;
        this.createImage(files[0])
      },
      createImage(file) {
        var reader = new FileReader()

        reader.onload = (e) => {
          this.userProfile.photo = e.target.result
        };
        reader.readAsDataURL(file)
      },
      removeImage: function (e) {
        this.userProfile.photo = ''
      }
    }
  }
</script>
