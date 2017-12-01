<template>
  <div>
    <div class="container">
      <h3 class="page-title">Log in / Sign up</h3>
      <div class="buttons-wrap">
        <a href="/auth/facebook" class="btn btn-primary btn-lg btn-block" style="background: #395d8e">Facebook</a>
        <a href="/auth/google" class="btn btn-primary btn-lg btn-block" style="background: #d8153b">Google</a>
      </div>
      <br>
      <div class="alert alert-danger hide" role="alert">
        This is a danger alert—check it out!
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'auth',
  mounted: function() {
    document.getElementById('main').classList.add('center')
  }
}
</script>

<style lang="sass" scoped>
.page-title
  text-align: center
  margin-bottom: 20px
.buttons-wrap
  width: 400px
  margin: 0 auto
</style>