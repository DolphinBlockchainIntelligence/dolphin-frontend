<template>
  <div class="container">
    <router-view :key="$route.path" />
  </div>
</template>

<script>

</script>

<style lang="sass">
.container
  width: 100%
</style>
