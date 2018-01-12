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
          <label for="2" class="col-sm-3 text-right col-form-label"><sup>*</sup> Category&nbsp;:</label>
          <div class="col-sm-9">
            <select type="text" class="form-control" id="2">
              <option selected></option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>

        <div class="form-group row">
          <label for="3" class="col-sm-3 text-right col-form-label"><sup>*</sup> Keywords&nbsp;:</label>
          <div class="col-sm-9">
            <select type="text" class="form-control" id="3">
              <option selected></option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>

        <div class="form-group row">
          <label for="4" class="col-sm-3 text-right col-form-label"><sup>*</sup> 2 sentences description&nbsp;:</label>
          <div class="col-sm-9">
            <textarea type="text" class="form-control" id="4"></textarea>
          </div>
        </div>

        <div class="form-group row">
          <label for="5" class="col-sm-3 text-right col-form-label"><sup>*</sup> The formal business entity&nbsp;:</label>
          <div class="col-sm-9">
            <select type="text" class="form-control" id="5">
              <option selected></option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>

        <div class="form-group row">
          <label for="6" class="col-sm-3 text-right col-form-label">Project homeland&nbsp;:</label>
          <div class="col-sm-9">
            <select type="text" class="form-control" id="6">
              <option selected></option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>

        <div class="form-group row"><!-- обрати внимание - есть несколько сотояний -->
          <label for="7" class="col-sm-3 text-right col-form-label"><sup>*</sup> Project platform&nbsp;:</label>
          <div class="col-sm-3">
            <select type="text" class="form-control" id="7">
              <option selected>Other</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div class="col-sm-6">
             <input type="text" class="form-control" value="Etherium">
          </div>
        </div>

        <div class="form-group row">
          <label for="8" class="col-sm-3 text-right col-form-label">Project code repository&nbsp;:</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="8">
          </div>
        </div>

        <div class="form-group row"><!-- добавить дэйтпикер -->
          <label for="9" class="col-sm-3 text-right col-form-label">Release date of MVP&nbsp;:</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="9">
          </div>
        </div>

        <div class="form-group row">
          <label for="10" class="col-sm-3 text-right col-form-label">Status&nbsp;:</label>
          <div class="col-sm-9">
            <select type="text" class="form-control" id="10">
              <option selected></option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>

        <div class="form-group row">
          <label for="10" class="col-sm-3 text-right col-form-label">Links&nbsp;:</label>
          <div class="col-sm-9">
            <button class="btn btn-light">Add link</button>
          </div>
        </div>

        <div class="form-group row">
          <label for="11" class="col-sm-3 text-right col-form-label"></label>
          <div class="col-sm-3">
            <select type="text" class="form-control" id="11">
              <option selected></option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
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
            <select type="text" class="form-control" id="12">
              <option selected></option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
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
          <label for="13" class="col-sm-3 text-right col-form-label"><sup>*</sup> Name of the token&nbsp;:</label>
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
            <select type="text" class="form-control" id="15">
              <option selected></option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>

        <div class="form-group row">
          <label for="16" class="col-sm-3 text-right col-form-label"><sup>*</sup> Your token gives the right&nbsp;:</label>
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
          <label for="17" class="col-sm-3 text-right col-form-label">Distribution of tokens&nbsp;:</label>
          <div class="col-sm-9">
            <textarea type="text" class="form-control" id="17"></textarea>
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


export default {
  name: 'page',
  // props: ['_id']
}
</script>

<style lang="sass" scoped>
.form-group
  label
    sup
      color: red
      padding: 0 2px
</style>