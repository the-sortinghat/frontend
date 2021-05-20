<template>
  <div class="container">
    <h1>Sorting Hat</h1>

    <NuxtLink
      v-for="{ id, name } in systems"
      :key="name"
      :to="`/systems/${id}`"
      class="underline text-blue-500"
    >
      Access the "{{ name }}" information
    </NuxtLink>
  </div>
</template>

<script>
export default {
  data: () => ({
    systems: [],
  }),
  async fetch() {
    this.systems = await this.$axios.$get('/api/systems')
  },
}
</script>
