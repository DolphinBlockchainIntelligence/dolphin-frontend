<template>
  <main class="mdl-layout__content">
    <div class="mdl-grid">
      <template v-for="(child, index) in widgets">
        <component :is="child" :key="child.name"></component>
      </template>
    </div>
  </main>
</template>


<script>
import SentimentsStatistics from './widgets/SentimentsStatistics.vue'
import SentimentsLineChart from './widgets/SentimentsLineChart.vue'
import SentimentsComments from './widgets/SentimentsComments.vue'
import FacesSearch from './widgets/FacesSearch.vue'
import FacesProject from './widgets/FacesProject.vue'
export default {
  name: "dashboard",
  data: function data() {
    return {
      widgets: ['SentimentsLineChart', 'SentimentsStatistics', 'SentimentsComments', 'FacesProject', 'FacesSearch']
    }
  },
  components: {
    SentimentsLineChart,
    SentimentsStatistics,
    SentimentsComments,
    FacesSearch,
    FacesProject
  }
}
</script>
