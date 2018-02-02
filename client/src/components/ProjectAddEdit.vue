<template>
  <div class="project">
    <div class="container">
      <div class="heading">
        <h3 class="heading-text">Text</h3>
      </div>
    </div>
    <br>
    <div class="container">
      <form>
        <div class="form-group row">
          <label for="1" class="col-sm-3 text-right col-form-label"><sup>*</sup> Project Name&nbsp;:</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="1">
          </div>
        </div>

        <div class="form-group row">
          <label class="col-sm-3 text-right col-form-label"> Logotype&nbsp;:</label>
          <div class="col-sm-9">
            <file-upload v-model="files" post-action="/">Upload</file-upload>
          </div>
        </div>

         <div class="form-group row">
          <label for="2" class="col-sm-3 text-right col-form-label">Category&nbsp;:</label>
          <div class="col-sm-9">
            <multiselect id="2"
              :options="['one', 'two', 'three']" placeholder="" select-label="" deselect-label="">
            </multiselect>
          </div>
        </div>

         <div class="form-group row">
          <label for="3" class="col-sm-3 text-right col-form-label">Industry&nbsp;:</label>
          <div class="col-sm-9">
            <multiselect id="3"
              :options="['one', 'two', 'three']" placeholder="" select-label="" deselect-label="">
            </multiselect>
          </div>
        </div>

        <div class="form-group row">
          <label for="4" class="col-sm-3 text-right col-form-label">Keywords&nbsp;:</label>
          <div class="col-sm-9">
            <multiselect id="4"
              v-model="selectedKeywords" :options="optionsKeywords" :multiple="true" placeholder="" select-label="" deselect-label="" :taggable="true" @tag="addTagKeyword">
            </multiselect>
          </div>
        </div>

        <div class="form-group row">
          <label for="5" class="col-sm-3 text-right col-form-label">Hashtag&nbsp;:</label>
          <div class="col-sm-9">
            <multiselect id="5"
              v-model="selectedHashtag" :options="optionsHashtag" :multiple="true" placeholder="" select-label="" deselect-label="" :taggable="true" @tag="addTagHashtag">
            </multiselect>
          </div>
        </div>

        <div class="form-group row">
          <label for="6" class="col-sm-3 text-right col-form-label">2 sentences description&nbsp;:</label>
          <div class="col-sm-9">
            <textarea type="text" class="form-control" id="6"></textarea>
          </div>
        </div>

        <div class="form-group row">
          <label for="7" class="col-sm-3 text-right col-form-label">The formal business entity&nbsp;:</label>
          <div class="col-sm-9">
            <multiselect id="7"
              :options="['one', 'two', 'three']" placeholder="" select-label="" deselect-label="">
            </multiselect>
          </div>
        </div>

        <div class="form-group row">
          <label for="8" class="col-sm-3 text-right col-form-label">Project homeland&nbsp;:</label>
          <div class="col-sm-9">
            <multiselect id="8"
              :options="['one', 'two', 'three']" placeholder="" select-label="" deselect-label="">
            </multiselect>
          </div>
        </div>

        <div class="form-group row"><!-- обрати внимание - есть несколько сотояний -->
          <label for="9" class="col-sm-3 text-right col-form-label"><sup>*</sup> Project platform&nbsp;:</label>
          <div class="col-sm-9">
            <multiselect id="9"
              :options="['other', 'one', 'two', 'three']" placeholder="" select-label="" deselect-label="">
            </multiselect>
          </div>
        </div>

        <div class="form-group row">
          <label for="10" class="col-sm-3 text-right col-form-label"><sup>*</sup> Status&nbsp;:</label>
          <div class="col-sm-9">
            <multiselect id="10"
              :options="['one', 'two', 'three']" placeholder="" select-label="" deselect-label="">
            </multiselect>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-sm-3 text-right col-form-label"> Digest report&nbsp;:</label>
          <div class="col-sm-9">
            <file-upload v-model="files" post-action="/">Upload PDF file</file-upload>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-sm-3 text-right col-form-label"> Basic report&nbsp;:</label>
          <div class="col-sm-9">
            <file-upload v-model="files" post-action="/">Upload PDF file</file-upload>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-sm-3 text-right col-form-label"> Detailed report&nbsp;:</label>
          <div class="col-sm-9">
            <file-upload v-model="files" post-action="/">Upload PDF file</file-upload>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-sm-3 text-right col-form-label">Links&nbsp;:</label>
          <div class="col-sm-9">
            <button class="btn btn-light">Add link</button>
          </div>
        </div>

        <div class="form-group row">
          <label for="11" class="col-sm-3 text-right col-form-label"></label>
          <div class="col-sm-3">
            <multiselect id="11"
              :options="['one', 'two', 'three']" placeholder="" select-label="" deselect-label="">
            }
            </multiselect>
          </div>
          <div class="col-sm-5">
             <input type="text" class="form-control">
          </div>
          <div class="col-sm-1">
             <button class="btn btn btn-warning btn-block">-</button>
          </div>
        </div>

        <div class="form-group row">
          <label for="12" class="col-sm-3 text-right col-form-label"></label>
          <div class="col-sm-3">
            <multiselect id="12"
              :options="['one', 'two', 'three']" placeholder="" select-label="" deselect-label="">
            </multiselect>
          </div>
          <div class="col-sm-5">
             <input type="text" class="form-control">
          </div>
          <div class="col-sm-1">
             <button class="btn btn btn-warning btn-block">-</button>
          </div>
        </div>
        <hr>

        <h4>Token</h4>

        <div class="form-group row">
          <label for="13" class="col-sm-3 text-right col-form-label">Name of the token&nbsp;:</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="13">
          </div>
        </div>

        <div class="form-group row">
          <label for="14" class="col-sm-3 text-right col-form-label"><sup>*</sup> Token's ticker code&nbsp;:</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="14">
          </div>
        </div>

        <div class="form-group row">
          <label for="15" class="col-sm-3 text-right col-form-label"><sup>*</sup> Token platform&nbsp;:</label>
          <div class="col-sm-9">
            <multiselect id="15"
              :options="['one', 'two', 'three']" placeholder="" select-label="" deselect-label="">
            </multiselect>
          </div>
        </div>

        <div class="form-group row">
          <label for="16" class="col-sm-3 text-right col-form-label">Your token gives the right&nbsp;:</label>
          <div class="col-sm-9">
            <textarea type="text" class="form-control" id="16"></textarea>
          </div>
        </div>

        <div class="form-group row">
          <label for="17" class="col-sm-3 text-right col-form-label">Total emission&nbsp;:</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="17">
          </div>
        </div>

        <div class="form-group row">
          <label for="18" class="col-sm-3 text-right col-form-label">Distribution of tokens&nbsp;:</label>
          <div class="col-sm-9">
            <textarea type="text" class="form-control" id="18"></textarea>
          </div>
        </div>

        <div class="form-group row">
          <label for="19" class="col-sm-3 text-right col-form-label">Extra emission&nbsp;:</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="19">
          </div>
        </div>
        <hr>

        <h4>Legal Entity</h4>

        <div class="form-group row">
          <label for="20" class="col-sm-3 text-right col-form-label">Legal Entity Name&nbsp;:</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="20">
          </div>
        </div>
        <div class="form-group row">
          <label for="21" class="col-sm-3 text-right col-form-label">Legal Entity Location&nbsp;:</label>
          <div class="col-sm-9">
            <multiselect id="21"
              :options="['one', 'two', 'three']" placeholder="" select-label="" deselect-label="">
            </multiselect>
          </div>
        </div>
        <div class="form-group row">
          <label for="22" class="col-sm-3 text-right col-form-label">Legal Entity ID&nbsp;:</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="22">
          </div>
        </div>
        <div class="form-group row">
          <label for="23" class="col-sm-3 text-right col-form-label">Date of registration&nbsp;:</label>
          <div class="col-sm-4">
            <div class="input-group">
              <date-picker id="23" value="regDate" :config="configs.basic" :wrap="configs.wrap"></date-picker>
              <i class="material-icons input-group-addon">date_range</i>
            </div>
          </div>
        </div>
        <hr>

        <h4>Events</h4>

        <div class="form-group row">
          <div class="col-sm-12 text-right">
            <button type="submit" class="btn btn-primary">Add event</button>
          </div>
        </div>
        <div class="form-group row">
          <label for="24" class="col-sm-3 text-right col-form-label"><sup>*</sup>  Event type&nbsp;:</label>
          <div class="col-sm-9">
            <multiselect id="24"
              :options="['one', 'two', 'three']" placeholder="" select-label="" deselect-label="">
            </multiselect>
          </div>
        </div>
        <div class="form-group row">
          <label for="25" class="col-sm-3 text-right col-form-label"><sup>*</sup>  Start/Finish&nbsp;:</label>
          <div class="col-sm-4">
            <div class="input-group">
              <date-picker value="" id="25" :config="configs.basic" :wrap="configs.wrap"></date-picker>
              <i class="material-icons input-group-addon">date_range</i>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="input-group">
              <date-picker value="" :config="configs.basic" :wrap="configs.wrap"></date-picker>
              <i class="material-icons input-group-addon">date_range</i>
            </div>
          </div>
        </div>
        <div class="form-group row">
          <label for="26" class="col-sm-3 text-right col-form-label">Token to sell&nbsp;:</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="26">
          </div>
        </div>
        <div class="form-group row">
          <label for="27" class="col-sm-3 text-right col-form-label">SoftCap&nbsp;:</label>
          <div class="col-sm-6">
            <input type="text" class="form-control" id="27">
          </div>
          <div class="col-sm-3">
            <multiselect
              :options="['one', 'two', 'three']" placeholder="USD" select-label="" deselect-label="">
            </multiselect>
          </div>
        </div>

        <div class="form-group row">
          <label for="28" class="col-sm-3 text-right col-form-label">HardCap&nbsp;:</label>
          <div class="col-sm-6">
            <input type="text" class="form-control" id="28">
          </div>
          <div class="col-sm-3">
            <multiselect
              :options="['one', 'two', 'three']" placeholder="USD" select-label="" deselect-label="">
            </multiselect>
          </div>
        </div>

        <div class="form-group row">
          <label for="29" class="col-sm-3 text-right col-form-label"><sup>*</sup> Acceptable coins&nbsp;:</label>
          <div class="col-sm-9">
            <multiselect id="29"
              :options="['one', 'two', 'three']" placeholder="" select-label="" deselect-label="">
            </multiselect>
          </div>
        </div>

        <div class="form-group row">
          <label for="30" class="col-sm-3 text-right col-form-label"><sup>*</sup> Special requirements&nbsp;:</label>
          <div class="col-sm-9">
            <multiselect id="30"
              :options="['one', 'two', 'three']" placeholder="" select-label="" deselect-label="">
            </multiselect>
          </div>
        </div>

        <div class="form-group row">
          <label for="31" class="col-sm-3 text-right col-form-label">Actually raised&nbsp;:</label>
          <div class="col-sm-6">
            <input type="text" class="form-control" id="31">
          </div>
          <span class="col-form-label">USD</span>
        </div>

        <div class="form-group row">
          <label for="32" class="col-sm-3 text-right col-form-label">Actual finish date&nbsp;:</label>
          <div class="col-sm-9">
            <div class="input-group">
              <date-picker value="date" id="32" :config="configs.basic" :wrap="configs.wrap"></date-picker>
              <i class="material-icons input-group-addon">date_range</i>
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label for="33" class="col-sm-3 text-right col-form-label">ERC20 token address&nbsp;:</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="33">
          </div>
        </div>

        <div class="form-group row">
          <label for="34" class="col-sm-3 text-right col-form-label">Average price&nbsp;:</label>
          <div class="col-sm-6">
            <input type="text" class="form-control" id="34">
          </div>
          <div class="col-sm-3">
            <multiselect
              :options="['one', 'two', 'three']" placeholder="USD" select-label="" deselect-label="">
            </multiselect>
          </div>
        </div>


        <hr>
        <h4>Team</h4>
        <div class="form-group row">
          <div class="col-sm-12 text-right">
            <button type="submit" class="btn btn-primary">Add team member</button>
          </div>
        </div>
        <div class="form-group row">
          <label for="35" class="col-sm-3 text-right col-form-label"><sup>*</sup> Role&nbsp;:</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="35" placeholder="CEO">
          </div>
        </div>

        <div class="form-group row">
          <label for="36" class="col-sm-3 text-right col-form-label"><sup>*</sup> Name&nbsp;:</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="36" placeholder="John Smith">
          </div>
        </div>

        <div class="form-group row">
          <label for="37" class="col-sm-3 text-right col-form-label"> Linkedin&nbsp;:</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="37" placeholder="https://linkedin.com/...">
          </div>
        </div>

        <div class="form-group row">
          <label for="38" class="col-sm-3 text-right col-form-label"> Twitter&nbsp;:</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="38" placeholder="https://twitter.com/...">
          </div>
        </div>

        <div class="form-group row">
          <label for="39" class="col-sm-3 text-right col-form-label"> Facebook&nbsp;:</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="39" placeholder="https:facebook.com/...">
          </div>
        </div>

        <div class="form-group row">
          <label for="40" class="col-sm-3 text-right col-form-label"> Photo&nbsp;:</label>
          <div class="col-sm-9">
            <file-upload v-model="files" post-action="/" id="40">Upload</file-upload>
          </div>
        </div>
        <hr>

        <div class="row">
          <div class="col-sm-3 text-right">
            <button type="submit" class="btn btn-primary btn-block">Submit form</button>
          </div>
        </div>
      </form>
      <br><br>
    </div>
   
    
    
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import routes from '../router'
import Multiselect from 'vue-multiselect'
import datePicker from 'vue-bootstrap-datetimepicker'
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'
import FileUpload from 'vue-upload-component/dist/vue-upload-component.part.js'
import 'vue-upload-component/dist/vue-upload-component.part.css'

export default {
  name: 'page',
  // props: ['_id']
  components: { Multiselect, datePicker, FileUpload },
  data () {
    return {
      date: null,
      files: [],
      configs: {
        wrap: true,
        basic: {
          format: 'DD/MM/YYYY',
          useCurrent: false,
        },
      },
      optionsKeywords: [],
      selectedKeywords: [],
      optionsHashtag: [],
      selectedHashtag: [],
    }
  },
  methods: {
      addTagKeyword (newTag) {
        console.log(newTag)
        const tag = {
          name: newTag,
          code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
        }
        console.log(tag)
        this.optionsKeywords.push(newTag)
        this.selectedKeywords.push(newTag)
      },
      addTagHashtag (newTag) {
        console.log(newTag)
        const tag = {
          name: newTag,
          code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
        }
        console.log(tag)
        this.optionsHashtag.push(newTag)
        this.selectedHashtag.push(newTag)
      },
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="sass" scoped>
  .file-uploads
    background: #f8f9fa
    border-color: #f8f9fa
    padding: .5rem .75rem
    color: #111
    border-radius: 0.25rem
    margin: 0
    cursor: pointer
  .form-group
    .input-group .form-control
      z-index: 0
    label
      sup
        color: red
        padding: 0 2px
</style>