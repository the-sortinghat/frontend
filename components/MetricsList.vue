<template>
  <div>
    <div
      v-for="{ metric, measure } in metrics"
      :key="metric"
      class="flex flex-row justify-between mb-8"
    >
      <div class="bg-purple-700 text-white w-32 mr-8 p-3 rounded-xl">
        {{ metric }}
      </div>

      <Ruler :measure="measure" />
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
      type: Array,
      required: true,
      default: () => [],
      validator: (value) => {
        const keys = JSON.stringify(['metric', 'measure'].sort())
        return value.every((val) => {
          const objKeys = JSON.stringify(Object.keys(val).sort())
          return objKeys === keys
        })
      },
    },
  },
}
</script>

<style></style>
