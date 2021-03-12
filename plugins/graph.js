import * as d3 from 'd3'

function buildSvgContainer(container) {
  const svg = d3.select(container)
  return svg
}

function buildGraphGroup(svgContainer) {
  const graph = svgContainer.append('g')
  return graph
}

function buildGraphLinks(graph, links) {
  graph.selectAll('path').data(links).exit().remove()

  graph
    .selectAll('path')
    .data(links)
    .enter()
    .append('path')
    .attr('class', (d) => 'link')
    .attr('stroke-width', '1')
    .attr('stroke-dasharray', (d) => (d.type === 'async' ? '5,5' : undefined))
}

function buildGraphNodes(graph, nodes) {
  const nodeRadius = 18

  graph.selectAll('circle').remove()
  graph
    .selectAll('circle')
    .data(nodes)
    .enter()
    .append('circle')
    .attr('r', nodeRadius)
    .attr('class', (d) => 'node')
}

function buildGraphNodeLabels(graph, nodes) {
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
}

function buildGraphLinkMarkers(svgContainer) {
  svgContainer
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

  svgContainer
    .selectAll('g')
    .selectAll('path')
    .attr('marker-end', (d) => {
      return 'url(#end)'
    })
}

function setGraphSimulationForces(nodes, links, width, height) {
  const simulation = d3
    .forceSimulation()
    .nodes(nodes)
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('link', d3.forceLink(links).distance(200))

  return simulation
}

function setGraphItemsTransation(graph, simulation) {
  simulation.on('tick', function () {
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
}

function setGraphNodesMovementAndClick(graph, simulation) {
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
    .on('click', (_, d) => d.onModuleClick())
}

function generateGraph(payload) {
  const { nodes, links, width, height, container } = payload

  const svg = buildSvgContainer(container)
  const graph = buildGraphGroup(svg)

  buildGraphLinks(graph, links)
  buildGraphLinkMarkers(svg)
  buildGraphNodes(graph, nodes)
  buildGraphNodeLabels(graph, nodes)

  const simulation = setGraphSimulationForces(nodes, links, width, height)

  setGraphItemsTransation(graph, simulation)
  setGraphNodesMovementAndClick(graph, simulation)
}

export default ({ _ }, inject) => {
  inject('generateGraph', generateGraph)
}
