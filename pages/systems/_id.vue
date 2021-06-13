<template>
  <div v-if="systemLoaded" class="flex flex-col p-5">
    <div class="flex justify-between">
      <h1 class="text-3xl">{{ system.name }} (System)</h1>
      <div class="flex">
        <div
          v-for="nfr in system.nonFunctionalRequirements"
          :key="nfr"
          class="m-1 p-2 rounded-3xl bg-purple-700 text-white text-sm"
        >
          {{ nfr }}
        </div>
      </div>
    </div>
    <p class="my-3 text-justify">{{ system.description }}</p>

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
