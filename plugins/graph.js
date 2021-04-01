import * as d3 from 'd3'

function getSvgContainer(container) {
  const svg = d3.select(container)
  return svg
}

function buildGraphLinks(svgContainer, links) {
  const color = d3.scaleOrdinal(['#000000'])

  return svgContainer
    .append('g')
    .attr('fill', 'none')
    .attr('stroke-width', 1.5)
    .selectAll('path')
    .data(links)
    .join('path')
    .attr('stroke', (d) => color(d.type))
    .attr('stroke-dasharray', (d) => (d.type === 'async' ? '5,5' : undefined))
    .attr('marker-end', (d) => `url(#arrow-end)`)
}

function buildGraphNodes(svgContainer, nodes) {
  const nodeRadius = 18

  const node = svgContainer
    .append('g')
    .attr('fill', 'currentColor')
    .attr('stroke-linecap', 'round')
    .attr('stroke-linejoin', 'round')
    .selectAll('g')
    .data(nodes)
    .join('g')

  node
    .append('circle')
    .attr('class', 'node')
    .attr('stroke', 'white')
    .attr('stroke-width', 1.5)
    .attr('r', nodeRadius)

  return node
}

function buildGraphNodeLabels(node) {
  node
    .append('text')
    .attr('x', 0)
    .attr('y', -20)
    .attr('text-anchor', 'middle')
    .text((d) => d.name)
}

function buildGraphLinkMarkers(svgContainer) {
  svgContainer
    .append('defs')
    .selectAll('marker')
    .data(['end'])
    .join('marker')
    .attr('id', 'arrow-end')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 25)
    .attr('refY', 0)
    .attr('markerWidth', 8)
    .attr('markerHeight', 8)
    .attr('orient', 'auto')
    .append('path')
    .attr('fill', '#000')
    .attr('d', 'M0,-5L10,0L0,5')
}

function setGraphSimulationForces(nodes, links, width, height) {
  const simulation = d3
    .forceSimulation(nodes)
    .force(
      'link',
      d3.forceLink(links).id((d) => d.id)
    )
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('charge', d3.forceManyBody().strength(-5000))
    .force('x', d3.forceX())
    .force('y', d3.forceY())

  return simulation
}

function setGraphItemsTranslation(simulation, node, link) {
  simulation.on('tick', () => {
    link.attr('d', (d) => {
      if (d.isCurved) {
        const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y)
        return `
          M${d.source.x},${d.source.y}
          A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
        `
      }

      return `M${d.source.x},${d.source.y} L${d.target.x},${d.target.y}`
    })

    node.attr('transform', (d) => `translate(${d.x},${d.y})`)
  })
}

function setGraphNodesMovementAndClick(node, simulation) {
  const drag = d3
    .drag()
    .on('start', (event) => {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      event.subject.fx = event.subject.x
      event.subject.fy = event.subject.y
    })
    .on('drag', (event) => {
      event.subject.fx = event.x
      event.subject.fy = event.y
    })
    .on('end', (event) => {
      if (!event.active) simulation.alphaTarget(0)
      event.subject.fx = null
      event.subject.fy = null
    })

  node.call(drag).on('click', (_, d) => d.onClick())
}

function includeCurvedAttributeForLinks(links) {
  const isCurvedLinks = links.reduce((acc, value, index) => {
    const linkSource = value.source
    const linkTarget = value.target

    return acc.concat([
      links.some((item, i) => {
        if (index === i) return false

        const { source, target } = item
        return linkSource === target && linkTarget === source
      }),
    ])
  }, [])

  return links.map((link, index) => ({
    ...link,
    isCurved: isCurvedLinks[index],
  }))
}

function generateGraph(payload) {
  const { nodes, links, width, height, container } = payload

  const svg = getSvgContainer(container)
  const newLinks = includeCurvedAttributeForLinks(links)
  const drawnLinks = buildGraphLinks(svg, newLinks)
  const drawnNodes = buildGraphNodes(svg, nodes)
  const simulation = setGraphSimulationForces(nodes, newLinks, width, height)
  buildGraphLinkMarkers(svg)
  buildGraphNodeLabels(drawnNodes)
  setGraphItemsTranslation(simulation, drawnNodes, drawnLinks)
  setGraphNodesMovementAndClick(drawnNodes, simulation)
}

export default ({ _ }, inject) => {
  inject('generateGraph', generateGraph)
}
