<template>
  <div v-if="systemLoaded" class="flex flex-col">
    <h1 class="text-xl font-bold">{{ system.name }} (System)</h1>
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
    <Tabs :graph-data="graphData" :metrics-data="metrics" />
  </div>
  <div v-else class="flex justify-center items-center w-full h-screen">
    <p>Loading...</p>
  </div>
</template>

<script>
import Tabs from '@/components/Tabs.vue'

export default {
  components: {
    Tabs,
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
  },

  async created() {
    this.sys = await this.$getSystemData(this.systemId)
    this.graphData.nodes = this.sys.modules.map((m) => ({
      ...m,
      onClick: () => this.goToModulesPage(m.id),
    }))

    this.graphData.links = this.sys.links
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
