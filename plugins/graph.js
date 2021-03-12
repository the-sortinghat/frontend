import * as d3 from 'd3'

function generateGraph(payload) {
  const { nodes, links, width, height, container } = payload

  const svg = d3.select(container)

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

  const graph = svg.append('g')

  graph.selectAll('path').data(links).exit().remove()

  graph
    .selectAll('path')
    .data(links)
    .enter()
    .append('path')
    .attr('class', (d) => 'link')
    .attr('stroke-width', '1')
    .attr('stroke-dasharray', (d) => (d.type === 'async' ? '5,5' : undefined))

  graph.selectAll('circle').remove()
  graph
    .selectAll('circle')
    .data(nodes)
    .enter()
    .append('circle')
    .attr('r', 18)
    .attr('class', (d) => 'node')

  graph.selectAll('text').remove()
  graph
    .selectAll('text')
    .data(nodes)
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
    .nodes(nodes)
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('link', d3.forceLink(links).distance(200))
    .on('tick', function () {
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

      graph.selectAll('path').attr('d', link)
      graph.selectAll('circle').attr('transform', transform)
      graph.selectAll('text').attr('transform', transform)
    })

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

  graph
    .selectAll('circle')
    .call(drag)
    .on('click', (event, d) => d.onModuleClick())
}

export default ({ _ }, inject) => {
  inject('generateGraph', generateGraph)
}
