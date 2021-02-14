<template>
  <div class="container flex flex-col">
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
  computed: {
    systemId() {
      return this.$route.params.id
    },

    system() {
      return {
        id: this.systemId,
        name: 'InterSCity',
        description: 'foo bar baz',
        nonFunctionalRequirements: ['foo', 'bar', 'baz'],
        modules: [
          { id: 1, name: 'module 1' },
          { id: 2, name: 'module 2' },
          { id: 3, name: 'module 3' },
          { id: 4, name: 'module 4' },
          { id: 5, name: 'module 5' },
        ],
        metrics: [
          {
            metric: 'services per module',
            measure: { min: 0, max: 5, value: 1 },
          },
          {
            metric: 'modules sharing DB',
            measure: { min: 0, max: 8, value: 0 },
          },
          {
            metric: 'synchronous coupling level',
            measure: { min: 0, max: 10, value: 3 },
          },
          {
            metric: 'asynchronous coupling level',
            measure: { min: 0, max: 9, value: 6 },
          },
        ],
      }
    },
  },

  methods: {
    displayMetric(metric, { min, value, max }) {
      return `${metric}: ${min}--(${value})--${max}`
    },
  },
}
</script>
