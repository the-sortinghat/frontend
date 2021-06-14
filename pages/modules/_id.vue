<template>
  <div class="bg-gray-50">
    <Navbar />
    <div v-if="moduleLoaded" class="flex flex-col p-5">
      <h1 class="text-3xl">{{ module.name }} (Module)</h1>
      <p class="my-3 text-justify">{{ module.responsibility }}</p>
      <Tabs :graph-data="graphData" :metrics-data="metrics" />
    </div>
    <div v-else class="flex justify-center items-center w-full h-screen">
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Tabs from '@/components/Tabs.vue'

export default {
  components: {
    Navbar,
    Tabs,
  },
  data: () => ({
    module: undefined,
    graphData: {
      nodes: [],
      links: [],
      subtitles: [
        { name: 'Service', image: require('@/assets/node.svg') },
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
