<template>
  <svg style="width: 100%; height: 100%; border: 1px solid #000"></svg>
</template>

<script>
export default {
  props: {
    nodes: {
      type: Array,
      required: true,
    },
    links: {
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
      container: this.$el,
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
