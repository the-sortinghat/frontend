<template>
  <svg style="width: 100%; height: 100%; border: 1px solid #000"></svg>
</template>

<script>
import * as d3 from 'd3'

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
  data() {
    return {
      width: 0,
      height: 0,
      graph: undefined,
    }
  },
  mounted() {
    this.width = this.$el.clientWidth
    this.height = this.$el.clientHeight
    this.generateGraph()
  },
  methods: {
    generateGraph() {
      const svg = d3.select(this.$el)

      svg
        .append('svg:defs')
        .selectAll('marker')
        .data(['end'])
        .enter()
        .append('svg:marker')
        .attr('id', String)
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 25)
        .attr('refY', 0)
        .attr('markerWidth', 12)
        .attr('markerHeight', 12)
        .attr('orient', 'auto')
        .append('svg:path')
        .attr('d', 'M0,-5L10,0L0,5')

      this.graph = svg.append('g')

      this.graph.selectAll('path').data(this.links).exit().remove()

      this.graph
        .selectAll('path')
        .data(this.links)
        .enter()
        .append('path')
        .attr('class', (d) => 'link')
        .attr('stroke-width', (d) => Math.sqrt(d.weight))
        .attr('stroke-dasharray', '5,5')

      this.graph.selectAll('circle').remove()
      this.graph
        .selectAll('circle')
        .data(this.nodes)
        .enter()
        .append('circle')
        .attr('r', 18)
        .attr('class', (d) => 'node')
        .attr('fill', (d) => this.getRandomColor())

      this.graph.selectAll('text').remove()
      this.graph
        .selectAll('text')
        .data(this.nodes)
        .enter()
        .append('text')
        .attr('x', 0)
        .attr('y', -20)
        .attr('text-anchor', 'middle')
        .text((d) => d.name)

      svg
        .selectAll('g')
        .selectAll('path')
        .attr('marker-end', (d) => {
          return 'url(#end)'
        })

      const simulation = d3
        .forceSimulation()
        .nodes(this.nodes)
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(this.width / 2, this.height / 2))
        .force('link', d3.forceLink(this.links).distance(100))
        .on('tick', () => this.tick())

      const drag = d3
        .drag()
        .on('start', function (event) {
          if (!event.active) simulation.alphaTarget(0.3).restart()
          event.subject.fx = event.subject.x
          event.subject.fy = event.subject.y
        })
        .on('drag', function (event) {
          event.subject.fx = event.x
          event.subject.fy = event.y
        })
        .on('end', function (event) {
          if (!event.active) simulation.alphaTarget(0)
          event.subject.fx = null
          event.subject.fy = null
        })

      this.graph.selectAll('circle').call(drag)
    },
    tick() {
      const transform = (d) => {
        return 'translate(' + d.x + ',' + d.y + ')'
      }

      const link = (d) => {
        return (
          'M' +
          d.source.x +
          ',' +
          d.source.y +
          ' L' +
          d.target.x +
          ',' +
          d.target.y
        )
      }

      this.graph.selectAll('path').attr('d', link)
      this.graph.selectAll('circle').attr('transform', transform)
      this.graph.selectAll('text').attr('transform', transform)
    },
    getRandomColor() {
      const letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    },
  },
}
</script>

<style>
.link {
  stroke: #000;
}

.node {
  cursor: move;
  stroke: #000;
  stroke-width: 1.5px;
}
</style>
