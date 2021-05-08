<template>
  <div class="flex" style="width: 500px">
    <p class="mr-1 self-center">
      {{ measure.min }}
    </p>
    <div
      class="flex justify-center place-content-evenly font-bold items-center border border-black"
      :style="metricWidth"
      @mouseover="showValue = true"
      @mouseleave="showValue = false"
    >
      <div
        v-for="i in numberOfBoxes()"
        :key="`box_${i}_${measure.min}_${measure.max}_${measure.value}`"
        :class="boxStyleClasses(i, numberOfBoxes(), measure.value)"
        :style="boxWidth()"
      ></div>
    </div>
    <div
      v-if="showValue"
      class="bg-black bg-opacity-50 rounded-xl text-white flex justify-center ml-3"
      style="position: absolute; width: 150px"
    >
      Value: {{ measure.value }}
    </div>
    <p class="ml-1 self-center">
      {{ measure.max }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    measure: {
      type: Object,
      required: true,
      default: () => {},
      validator: (value) => {
        const measureKeys = JSON.stringify(['min', 'max', 'value'].sort())
        const valueKeys = JSON.stringify(Object.keys(value).sort())
        return measureKeys === valueKeys
      },
    },
  },
  data: () => ({
    width: 450,
    showValue: false,
  }),
  computed: {
    metricWidth() {
      return `width: ${this.width}px;`
    },
  },
  methods: {
    numberOfBoxes() {
      const { min, max } = this.measure
      return max - min
    },
    boxWidth() {
      const { min, max } = this.measure
      const w = this.width / (max - min)
      return `width: ${w}px; height: 100%`
    },
    boxStyleClasses(index, total, value) {
      let classes = ''

      if (index <= value) classes += 'bg-purple-500 '
      if (index < total) classes += 'border-r border-gray-500'

      return classes
    },
  },
}
</script>

<style></style>
