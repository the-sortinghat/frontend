/* eslint-disable no-console */
function parseData(system, sysModules, metrics) {
  // parsing data into a valid object
  const { name, description, nonFunctionalRequirements } = system
  const modules = sysModules.modules.map(({ id, name }) => ({ id, name }))
  const links = sysModules.links

  return {
    name,
    description,
    nonFunctionalRequirements,
    modules,
    links,
    metrics,
  }
}

async function getSystemData(systemId, $axios) {
  let systemData = {}

  try {
    const system = await $axios.$get(`/api/systems/${systemId}`)
    const sysModules = await $axios.$get(`/api/systems/${systemId}/modules`)
    const sysMetrics = await $axios.$get(`/api/systems/${systemId}/metrics`)
    systemData = parseData(system, sysModules, sysMetrics)
  } catch (err) {
    console.log('error occuried while fetching from api...')
    console.log(err.message)
  }

  return systemData
}

export default getSystemData
