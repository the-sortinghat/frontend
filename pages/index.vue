<template>
  <div class="flex flex-col p-5">
    <div class="flex flex-col w-full items-center justify-center">
      <div class="flex flex-col">
        <img
          src="https://i.ibb.co/vJYVw9C/sorting-hat-logo.png"
          alt="Sorting Hat"
        />
        <p class="text-sm self-center">
          A tool to caracterize service-based architectures.
        </p>
      </div>
    </div>
    <div class="mt-5">
      <p>Available systems:</p>
      <div class="flex mt-5">
        <NuxtLink
          v-for="{ id, name } in systems"
          :key="name"
          class="flex flex-col p-3 mr-5 bg-gray-300 rounded"
          :to="`/systems/${id}`"
        >
          <img
            src="https://icons.iconarchive.com/icons/graphicloads/flat-finance/128/system-settings-icon.png"
            alt="System"
            class="w-32 h-32"
          />
          <p class="self-center underline">{{ name }}</p>
        </NuxtLink>
      </div>
    </div>
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
