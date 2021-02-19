<template>
  <div>
    <div
      v-for="(metric, index) in metrics"
      :key="metric.metric"
      class="flex flex-row justify-between mb-8"
    >
      <div class="bg-purple-700 text-white w-32 mr-8 p-3 rounded-xl">
        {{ metric.metric }}
      </div>
      <div class="flex" style="width: 500px">
        <p class="mr-1 self-center">
          {{ metric.measure.min }}
        </p>
        <div
          class="flex justify-center place-content-evenly font-bold items-center border border-black"
          :style="metricWidth"
        >
          <div
            v-for="i in numberOfBoxes(index)"
            :key="`box_${metric.metric}_${i}`"
            :class="
              boxStyleClasses(i, numberOfBoxes(index), metric.measure.value)
            "
            :style="boxWidth(metric.measure)"
          ></div>
        </div>
        <p class="ml-1 self-center">
          {{ metric.measure.max }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    metrics: {
      type: Array,
      default: () => [],
      validator: (value) => {
        const keys = JSON.stringify(['metric', 'measure'].sort())
        const measureKeys = JSON.stringify(['min', 'max', 'value'].sort())

        return value.reduce((acc, val) => {
          const objKeys = JSON.stringify(Object.keys(val).sort())
          const objResult = objKeys === keys

          if (val.measure) {
            const objMeasureKeys = JSON.stringify(
              Object.keys(val.measure).sort()
            )
            const measureResult = objMeasureKeys === measureKeys
            return acc && objResult && measureResult
          }

          return false
        }, true)
      },
    },
  },
  data: () => ({
    width: 450,
  }),
  computed: {
    metricWidth() {
      return `width: ${this.width}px;`
    },
  },
  methods: {
    numberOfBoxes(index) {
      const metric = this.metrics[index]
      const { min, max } = metric.measure
      return max - min
    },
    boxWidth(measure) {
      const { min, max } = measure
      const w = this.width / (max - min)
      return `width: ${w}px; height: 100%`
    },
    boxStyleClasses(index, total, value) {
      let classes = ''

      if (index <= value) {
        classes += 'bg-purple-500 '
      }

      if (index < total) {
        classes += 'border-r border-black'
      }

      return classes
    },
  },
}
</script>

<style></style>
