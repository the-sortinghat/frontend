<template>
  <div v-if="systemLoaded" class="container flex flex-col">
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
    <div class="flex flex-col lg:flex-row lg:w-1/2 lg:justify-between">
      <div class="card">
        <h2 class="text-lg">Modules:</h2>
        <ul>
          <li v-for="{ name, id } of system.modules" :key="name">
            <NuxtLink :to="`/modules/${id}`" class="underline text-blue-500">
              {{ name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="card">
        <h2 class="text-lg">Metrics:</h2>
        <ul>
          <li v-for="{ metric, measure } of system.metrics" :key="metric">
            {{ displayMetric(metric, measure) }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    sys: undefined,
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
  },

  async created() {
    this.sys = await this.$getSystemData(this.systemId)
  },

  methods: {
    displayMetric(metric, { min, value, max }) {
      return `${metric}: ${min}--(${value})--${max}`
    },
  },
}
</script>
