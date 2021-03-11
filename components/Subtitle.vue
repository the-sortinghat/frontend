<template>
  <div class="flex flex-col border p-2">
    <h1>Subtitle:</h1>
    <div class="flex">
      <div
        v-for="subtitle in items"
        :key="subtitle.name"
        class="flex flex-row items-center mr-5"
      >
        <img :src="subtitle.image" :alt="subtitle.name" />
        <p class="ml-2">{{ subtitle.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
      validator: (value) =>
        value.reduce((acc, val) => acc && val.name && val.image, true),
    },
  },
}
</script>

<style></style>
