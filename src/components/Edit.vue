<template>
  <div  id="row.id">
    <a v-bind:href="topicUrl">{{topicUrl}}</a>
    <a v-bind:href="topicStarterUrl">{{topicStarterUrl}}</a>
  </div>
</template>
<script>
  export default {
    props:['topicUrl', 'topicStarterUrl']
  }
</script>
