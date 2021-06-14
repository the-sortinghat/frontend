<template>
  <div>
    <Navbar />
    <div v-if="serviceLoaded" class="flex flex-col p-5">
      <h1 class="text-3xl">{{ service.name }} (Service)</h1>
      <p class="my-3 text-justify">{{ service.responsibility }}</p>
      <div class="flex flex-col lg:flex-row lg:w-full lg:justify-between">
        <div class="card">
          <Table
            v-for="{ title, columns, data } in tables"
            :key="title"
            :title="title"
            :columns="columns"
            :data="data"
            class="mt-5"
          />
        </div>
        <div class="card">
          <h2 class="text-lg">Metrics:</h2>
          <MetricsList :metrics="metrics" />
        </div>
      </div>
    </div>
    <div v-else class="flex justify-center items-center w-full h-screen">
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Table from '@/components/Table.vue'
import MetricsList from '@/components/MetricsList.vue'

export default {
  components: {
    Navbar,
    Table,
    MetricsList,
  },
  data: () => ({
    service: undefined,
  }),
  computed: {
    serviceId() {
      return this.$route.params.id
    },
    serviceLoaded() {
      return this.service !== undefined
    },
    metrics() {
      return this.service.metrics
    },
    databases() {
      return this.service.databases
    },
    syncOperations() {
      return this.service.syncOperations
    },
    asyncOperations() {
      return this.service.asyncOperations
    },
    tables() {
      return [
        {
          title: 'Databases',
          columns: this.getArrayKeys(this.databases),
          data: this.convertArrayDataIntoTable(this.databases),
        },
        {
          title: 'Sync Operations',
          columns: this.getArrayKeys(this.syncOperations),
          data: this.convertArrayDataIntoTable(this.syncOperations),
        },
        {
          title: 'Async Operations',
          columns: this.getArrayKeys(this.asyncOperations),
          data: this.convertArrayDataIntoTable(this.asyncOperations),
        },
      ]
    },
  },
  async created() {
    this.service = await this.$getServiceData(this.serviceId)
  },
  methods: {
    getArrayKeys(array) {
      return array.length > 0 ? Object.keys(array[0]) : []
    },
    convertArrayDataIntoTable(array) {
      return array.map((item) => Object.keys(item).map((elem) => item[elem]))
    },
  },
}
</script>

<style></style>
