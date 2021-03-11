<template>
  <div class="w-full h-full">
    <svg class="w-full h-full border"></svg>
    <Subtitle :items="subtitles" />
  </div>
</template>

<script>
import Subtitle from '@/components/Subtitle.vue'

export default {
  components: {
    Subtitle,
  },
  props: {
    nodes: {
      type: Array,
      required: true,
    },
    links: {
      type: Array,
      required: true,
    },
    subtitles: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.$generateGraph({
      nodes: this.nodes,
      links: this.links,
      width: this.$el.clientWidth,
      height: this.$el.clientHeight,
      container: this.$el.querySelector('svg'),
    })
  },
}
</script>

<style>
.link {
  stroke: #000;
}

.node {
  cursor: move;
  fill: #ccc;
  stroke: #000;
  stroke-width: 1.5px;
}
</style>
