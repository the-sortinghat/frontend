<template>
  <div v-if="moduleLoaded" class="flex flex-col">
    <h1 class="text-xl font-bold">{{ module.name }}</h1>
    <div class="flex flex-col lg:flex-row lg:w-1/2 lg:justify-between">
      <div class="card">
        <h2 class="text-lg">Responsability:</h2>
        <p>{{ module.responsability }}</p>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row lg:w-full lg:justify-between">
      <div class="card">
        <h2 class="text-lg">Services:</h2>
        <Graph :nodes="nodes" :links="links" :subtitles="subtitles" />
      </div>
      <div class="card">
        <h2 class="text-lg">Metrics:</h2>
        <MetricsList :metrics="metrics" />
      </div>
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
  data: () => ({
    module: undefined,
    graphData: {
      nodes: [],
      links: [],
      subtitles: [
        { name: 'Module', image: require('@/assets/node.svg') },
        { name: 'Synchronous call', image: require('@/assets/arrow.svg') },
        {
          name: 'Asynchronous call',
          image: require('@/assets/arrow_dash.svg'),
        },
      ],
    },
  }),
  computed: {
    moduleId() {
      return this.$route.params.id
    },
    moduleLoaded() {
      return this.module !== undefined
    },
    services() {
      return this.module.services
    },
    metrics() {
      return this.module.metrics
    },
    nodes() {
      return this.graphData.nodes
    },
    links() {
      return this.graphData.links
    },
    subtitles() {
      return this.graphData.subtitles
    },
  },
  async created() {
    this.module = await this.$getModuleData(this.moduleId)
    this.createNodes()
  },
  methods: {
    createNodes() {
      this.graphData.nodes = this.services.map((service) => ({
        ...service,
        onClick: () => this.goToServicePage(service.id),
      }))
    },
    goToServicePage(id) {
      this.$router.push({
        path: `/services/${id}`,
        params: { id },
      })
    },
  },
}
</script>

<style></style>
