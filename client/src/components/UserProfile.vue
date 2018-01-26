<template>
  <div>
    <div v-if="user">
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
              <b-form-file v-model="userProfile.photo" @change="onFileChange" accept=".jpg, .jpeg, .png, .gif"
                           placeholder="Choose a file..."></b-form-file>
              <div v-if="fileError">
                <small class="form-text text-muted alert alert-danger">{{ fileError }}.</small>
              </div>
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
          <button class="btn btn-primary" v-bind:class="{preLoader: preLoader, disabled:!showSave}"
                  @click.prevent="saveChanges">
            <span v-if="preLoader">Loading...</span>
            <span v-else>Save</span>
          </button>
        </div>
      </div>
      <br>
    </div>
    <div v-else>
      <auth/>
    </div>
  </div>
</template>


<script>
  import {mapState} from 'vuex'
  import axios from 'axios'
  import Navbar from './blocks/Navbar'
  import Auth from './Auth'

  export default {
    name: 'userprofile',
    props: ['id'],
    components: {Auth},
    computed: {
      ...mapState([
        'user'
      ])
    },
    data: () => ({
//      userProfile: false,
      userProfile: {
        "realName": "",
        "photo": "",
        "photoUrl": "",
        "profileText": "",
        "social": {
          "Facebook": "",
          'Twitter': "",
          'Reddit': "",
          'Github': "",
          'Youtube': "",
          'Bitcointalk': ""
        }
      },
      showSave: false,
      preLoader: false,
      fileError: false
    }),
    mounted: function () {
      this.getUserProfile()
    },
    watch: {
      userProfile: {
        handler: function (a) {
          if (!this.fileError)
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
          this.preLoader = true
          var data = new FormData();

          data.append('photo', this.userProfile.photo);
          data.append('realName', this.userProfile.realName);
          data.append('photoUrl', this.userProfile.photoUrl);
          data.append('profileText', this.userProfile.profileText);
          data.append('Facebook', this.userProfile.social.Facebook);
          data.append('Twitter', this.userProfile.social.Twitter);
          data.append('Reddit', this.userProfile.social.Reddit);
          data.append('Github', this.userProfile.social.Github);
          data.append('Youtube', this.userProfile.social.Youtube);
          data.append('Bitcointalk', this.userProfile.social.Bitcointalk);

          var config = {
            onUploadProgress: function (progressEvent) {
              var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            },
            headers: {'Content-Type': 'multipart/form-data'}
          };

          axios.post(
            '/private/user/profile', data, config).then((response) => {
            if (response.data == 'ok') {
              this.preLoader = false
              this.showSave = false
              console.log(this.userProfile)
            }
          }, (err) => {
            this.preLoader = false
            this.showSave = false
            console.log(err)
          })
        }
      },
      onFileChange(event) {
        this.fileError = null
        console.log(event.target.files[0].size)
        if (event.target.files[0].size > 8000000) {
          this.fileError = 'File size should be less than 8Mb'
          this.showSave = false
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
