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
          <label for="2" class="col-sm-3 text-right col-form-label">Category&nbsp;:</label>
          <div class="col-sm-9">
            <multiselect id="2"
              :options="['one', 'two', 'three']" placeholder="" select-label="" deselect-label="">
            </multiselect>
          </div>
        </div>

        <div class="form-group row">
          <label for="3" class="col-sm-3 text-right col-form-label">Keywords&nbsp;:</label>
          <div class="col-sm-9">
            <multiselect id="3"
              v-model="selectedKeywords" :options="optionsKeywords" :multiple="true" placeholder="" select-label="" deselect-label="" :taggable="true" @tag="addTag">
            </multiselect>
          </div>
        </div>

        <div class="form-group row">
          <label for="4" class="col-sm-3 text-right col-form-label">2 sentences description&nbsp;:</label>
          <div class="col-sm-9">
            <textarea type="text" class="form-control" id="4"></textarea>
          </div>
        </div>

        <div class="form-group row">
          <label for="5" class="col-sm-3 text-right col-form-label">The formal business entity&nbsp;:</label>
          <div class="col-sm-9">
            <multiselect id="5"
              :options="['one', 'two', 'three']" placeholder="" select-label="" deselect-label="">
            </multiselect>
          </div>
        </div>

        <div class="form-group row">
          <label for="6" class="col-sm-3 text-right col-form-label">Project homeland&nbsp;:</label>
          <div class="col-sm-9">
            <multiselect id="6"
              :options="['one', 'two', 'three']" placeholder="" select-label="" deselect-label="">
            </multiselect>
          </div>
        </div>

        <div class="form-group row"><!-- обрати внимание - есть несколько сотояний -->
          <label for="7" class="col-sm-3 text-right col-form-label"><sup>*</sup> Project platform&nbsp;:</label>
          <div class="col-sm-3">
            <multiselect id="7"
              :options="['other', 'one', 'two', 'three']" placeholder="" select-label="" deselect-label="">
            </multiselect>
          </div>
          <div class="col-sm-6">
             <input type="text" class="form-control" value="Etherium">
          </div>
        </div>

        <div class="form-group row">
          <label for="8" class="col-sm-3 text-right col-form-label"><sup>*</sup> Status&nbsp;:</label>
          <div class="col-sm-9">
            <multiselect id="8"
              :options="['one', 'two', 'three']" placeholder="" select-label="" deselect-label="">
            </multiselect>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 text-right col-form-label">Links&nbsp;:</label>
          <div class="col-sm-9">
            <button class="btn btn-light">Add link</button>
          </div>
        </div>

        <div class="form-group row">
          <label for="9" class="col-sm-3 text-right col-form-label"></label>
          <div class="col-sm-3">
            <multiselect id="9"
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
          <label for="1" class="col-sm-3 text-right col-form-label"></label>
          <div class="col-sm-3">
            <multiselect id="10"
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

        <div class="form-group row">
          <label for="11" class="col-sm-3 text-right col-form-label"><sup>*</sup> Name of the token&nbsp;:</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="11">
          </div>
        </div>

        <div class="form-group row">
          <label for="12" class="col-sm-3 text-right col-form-label"><sup>*</sup> Token's ticker code&nbsp;:</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="12">
          </div>
        </div>

        <div class="form-group row">
          <label for="13" class="col-sm-3 text-right col-form-label"><sup>*</sup> Token platform&nbsp;:</label>
          <div class="col-sm-9">
            <multiselect id="13"
              :options="['one', 'two', 'three']" placeholder="" select-label="" deselect-label="">
            </multiselect>
          </div>
        </div>

        <div class="form-group row">
          <label for="14" class="col-sm-3 text-right col-form-label"><sup>*</sup> Your token gives the right&nbsp;:</label>
          <div class="col-sm-9">
            <textarea type="text" class="form-control" id="14"></textarea>
          </div>
        </div>

        <div class="form-group row">
          <label for="15" class="col-sm-3 text-right col-form-label">Total emission&nbsp;:</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="15">
          </div>
        </div>

        <div class="form-group row">
          <label for="16" class="col-sm-3 text-right col-form-label">Distribution of tokens&nbsp;:</label>
          <div class="col-sm-9">
            <textarea type="text" class="form-control" id="16"></textarea>
          </div>
        </div>

        <div class="form-group row">
          <label for="17" class="col-sm-3 text-right col-form-label">Extra emission&nbsp;:</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="17">
          </div>
        </div>
        <hr>
        <div class="form-group row">
          <label for="18" class="col-sm-3 text-right col-form-label">Legal Entity Name&nbsp;:</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="18">
          </div>
        </div>
        <div class="form-group row">
          <label for="19" class="col-sm-3 text-right col-form-label">Legal Entity Location&nbsp;:</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="19">
          </div>
        </div>
        <div class="form-group row">
          <label for="20" class="col-sm-3 text-right col-form-label">Legal Entity ID&nbsp;:</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="20">
          </div>
        </div>
        <div class="form-group row">
          <label for="21" class="col-sm-3 text-right col-form-label">Date of registration&nbsp;:</label>
          <div class="col-sm-4">
            <div class="input-group">
              <date-picker id="21" value="regDate" :config="configs.basic" :wrap="configs.wrap"></date-picker>
              <i class="material-icons input-group-addon">date_range</i>
            </div>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-sm-3 text-right">
            <button type="submit" class="btn btn-primary btn-block">Add sale</button>
          </div>
          <div class="col-sm-9"></div>
        </div>
        <hr>

        <h4>ICO</h4>
        <div class="form-group row">
          <label for="22" class="col-sm-3 text-right col-form-label"><sup>*</sup>  Event type&nbsp;:</label>
          <div class="col-sm-9">
            <multiselect id="22"
              :options="['one', 'two', 'three']" placeholder="" select-label="" deselect-label="">
            </multiselect>
          </div>
        </div>
        <div class="form-group row">
          <label for="23" class="col-sm-3 text-right col-form-label"><sup>*</sup>  Start/Finish&nbsp;:</label>
          <div class="col-sm-4">
            <div class="input-group">
              <date-picker value="" id="23" :config="configs.basic" :wrap="configs.wrap"></date-picker>
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
          <label for="24" class="col-sm-3 text-right col-form-label">Token to sell&nbsp;:</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="24">
          </div>
        </div>
        <div class="form-group row">
          <label for="25" class="col-sm-3 text-right col-form-label">SoftCap&nbsp;:</label>
          <div class="col-sm-6">
            <input type="text" class="form-control" id="25">
          </div>
          <div class="col-sm-3">
            <multiselect
              :options="['one', 'two', 'three']" placeholder="USD" select-label="" deselect-label="">
            </multiselect>
          </div>
        </div>

        <div class="form-group row">
          <label for="26" class="col-sm-3 text-right col-form-label">HardCap&nbsp;:</label>
          <div class="col-sm-6">
            <input type="text" class="form-control" id="26">
          </div>
          <div class="col-sm-3">
            <multiselect
              :options="['one', 'two', 'three']" placeholder="USD" select-label="" deselect-label="">
            </multiselect>
          </div>
        </div>

        <div class="form-group row">
          <label for="27" class="col-sm-3 text-right col-form-label"><sup>*</sup> Acceptable coins&nbsp;:</label>
          <div class="col-sm-9">
            <multiselect id="27"
              :options="['one', 'two', 'three']" placeholder="" select-label="" deselect-label="">
            </multiselect>
          </div>
        </div>

        <div class="form-group row">
          <label for="28" class="col-sm-3 text-right col-form-label"><sup>*</sup> Special requirements&nbsp;:</label>
          <div class="col-sm-9">
            <multiselect id="28"
              :options="['one', 'two', 'three']" placeholder="" select-label="" deselect-label="">
            </multiselect>
          </div>
        </div>

        <div class="form-group row">
          <label for="29" class="col-sm-3 text-right col-form-label">Actually raised&nbsp;:</label>
          <div class="col-sm-7">
            <input type="text" class="form-control" id="29">
          </div>
          <span class="col-form-label">USD</span>
        </div>

        <div class="form-group row">
          <label for="30" class="col-sm-3 text-right col-form-label">Actual finish date&nbsp;:</label>
          <div class="col-sm-9">
            <div class="input-group">
              <date-picker value="date" id="30" :config="configs.basic" :wrap="configs.wrap"></date-picker>
              <i class="material-icons input-group-addon">date_range</i>
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label for="31" class="col-sm-3 text-right col-form-label">ERC20 token address&nbsp;:</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="31">
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-sm-3 text-right">
            <button type="submit" class="btn btn-primary btn-block">Save</button>
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


export default {
  name: 'page',
  // props: ['_id']
  components: { Multiselect, datePicker },
  data () {
    return {
      date: null,
      configs: {
        wrap: true,
        basic: {
          format: 'DD/MM/YYYY',
          useCurrent: false,
        },       
      },
      optionsKeywords: [],
      selectedKeywords: [],
    }
  },
  methods: {
      addTag (newTag) {
        console.log(newTag)
        const tag = {
          name: newTag,
          code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
        }
        console.log(tag)
        this.optionsKeywords.push(newTag)
        this.selectedKeywords.push(newTag)
      },

  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="sass" scoped>
  //.multiselect
    //z-index: 3
  .form-group
    .input-group .form-control
      z-index: 0
    label
      sup
        color: red
        padding: 0 2px
</style>