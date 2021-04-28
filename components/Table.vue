<template>
  <section class="m-5">
    <h2 class="text-lg font-bold">{{ title }}</h2>
    <table class="table-auto">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column">{{ column }}</th>
        </tr>
      </thead>
      <tbody class="border border-black">
        <tr
          v-for="line in numberOfLines"
          :key="line"
          class="border border-black"
        >
          <td
            v-for="value in data[line - 1]"
            :key="value"
            class="text-center border border-black"
          >
            {{ value }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: () => '',
    },
    columns: {
      type: Array,
      required: true,
      default: () => [],
      validator: (columns) =>
        columns.every((column) => typeof column === 'string'),
    },
    data: {
      type: Array,
      required: true,
      default: () => [],
      validator: (data) => data.every((d) => Array.isArray(d)),
    },
  },
  computed: {
    numberOfLines() {
      return this.data.length
    },
  },
}
</script>

<style></style>
