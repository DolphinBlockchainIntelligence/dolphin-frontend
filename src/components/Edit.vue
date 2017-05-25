<template>
  <div  id="row.id">
    <a v-bind:href="topicUrl">{{topicUrl}}</a>
    <a v-bind:href="topicStarterUrl">{{topicStarterUrl}}</a>
    <h1>{{data}}</h1>
  </div>
</template>
<script>
  export default {
    props:['topicUrl', 'topicStarterUrl', 'data']
  }
</script>
