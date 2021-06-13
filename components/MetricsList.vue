<template>
  <div class="flex w-full justify-center">
    <div>
      <div
        v-for="{ name, measure } in measurableMetrics"
        :key="name"
        class="flex flex-row mb-8"
      >
        <div class="bg-purple-700 text-white w-48 mr-8 p-3 rounded-xl">
          {{ name }}
        </div>

        <Ruler :measure="measure" />
      </div>
      <div
        v-for="{ name, value } in nonMeasurableMetrics"
        :key="name"
        class="flex flex-row items-center mb-8"
      >
        <div class="bg-purple-700 text-white w-48 mr-8 p-3 rounded-xl">
          {{ name }}
        </div>

        <div style="max-width: 400px">
          {{ value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Ruler from '@/components/Ruler.vue'

export default {
  components: {
    Ruler,
  },
  props: {
    metrics: {
      type: Object,
      required: true,
      default: () => ({}),
      validator: (value) => {
        const keys = JSON.stringify(['measurable', 'nonMeasurable'].sort())
        const objKeys = JSON.stringify(Object.keys(value).sort())
        return keys === objKeys
      },
    },
  },
  computed: {
    nonMeasurableMetrics() {
      return this.metrics.nonMeasurable
    },
    measurableMetrics() {
      return this.metrics.measurable
    },
  },
}
</script>

<style></style>
