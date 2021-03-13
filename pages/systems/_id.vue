<template>
  <div v-if="systemLoaded" class="flex flex-col">
    <h1 class="text-xl font-bold">{{ system.name }}</h1>
    <div class="flex flex-col lg:flex-row lg:w-1/2 lg:justify-between">
      <div class="card">
        <h2 class="text-lg">Description:</h2>
        <p>{{ system.description }}</p>
      </div>
      <div class="card">
        <h2 class="text-lg">Non-Functional Requirements:</h2>
        <ul>
          <li v-for="nfr of system.nonFunctionalRequirements" :key="nfr">
            {{ nfr }}
          </li>
        </ul>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row lg:w-full lg:justify-between">
      <div class="card">
        <h2 class="text-lg">Modules:</h2>
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
    sys: undefined,
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
    systemId() {
      return this.$route.params.id
    },

    systemLoaded() {
      return this.sys !== undefined
    },

    system() {
      return this.sys
    },

    metrics() {
      return this.sys.metrics
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
    this.sys = await this.$getSystemData(this.systemId)
    this.graphData.nodes = this.sys.modules.map((m) => ({
      ...m,
      onModuleClick: () => this.goToModulesPage(m.id),
    }))

    // fake links to test if graph component is correct
    this.graphData.links = [
      { source: 0, target: 1, type: 'sync' },
      { source: 0, target: 2, type: 'sync' },
      { source: 2, target: 1, type: 'async' },
      { source: 2, target: 3, type: 'async' },
      { source: 3, target: 4, type: 'async' },
      { source: 4, target: 3, type: 'async' },
      { source: 4, target: 2, type: 'async' },
      { source: 4, target: 2, type: 'sync' },
      { source: 4, target: 1, type: 'async' },
    ]
  },

  methods: {
    goToModulesPage(id) {
      this.$router.push({
        path: `/modules/${id}`,
        params: { id },
      })
    },
  },
}
</script>
