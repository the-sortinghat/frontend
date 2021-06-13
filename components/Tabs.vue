<template>
  <div class="flex flex-col">
    <div class="flex">
      <button
        :id="graphStyleId"
        type="button"
        class="flex-1 w-full p-4 text-purple-700 border-b-4 focus:outline-none"
        @click="graphTabClick"
      >
        Graph
      </button>
      <button
        :id="metricsStyleId"
        type="button"
        class="flex-1 w-full p-4 text-purple-700 border-b-4 focus:outline-none"
        @click="metricsTabClick"
      >
        Metrics
      </button>
    </div>
    <div class="flex flex-1 mt-4">
      <Graph
        v-if="showGraph"
        style="height: 700px"
        :nodes="nodes"
        :links="links"
        :subtitles="subtitles"
      />
      <MetricsList v-if="showMetrics" :metrics="metrics" />
    </div>
  </div>
</template>

<script>
import Graph from '@/components/Graph.vue'
import MetricsList from '@/components/MetricsList.vue'

export default {
  components: {
    Graph,
    MetricsList,
  },
  props: {
    graphData: {
      type: Object,
      default: () => ({}),
    },
    metricsData: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    show: true,
  }),
  computed: {
    nodes() {
      return this.graphData.nodes
    },
    links() {
      return this.graphData.links
    },
    subtitles() {
      return this.graphData.subtitles
    },
    metrics() {
      return this.metricsData
    },
    showGraph() {
      return this.show
    },
    showMetrics() {
      return !this.showGraph
    },
    graphStyleId() {
      return this.showGraph ? 'btn-clicked' : ''
    },
    metricsStyleId() {
      return this.showMetrics ? 'btn-clicked' : ''
    },
  },
  methods: {
    changeVisibility() {
      this.show = !this.show
    },
    graphTabClick() {
      if (!this.showGraph) {
        this.changeVisibility()
      }
    },
    metricsTabClick() {
      if (!this.showMetrics) {
        this.changeVisibility()
      }
    },
  },
}
</script>

<style>
#btn-clicked {
  border-bottom-width: 4px;
  border-color: rgb(109, 40, 217);
}
</style>
