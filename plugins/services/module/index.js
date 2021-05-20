/* eslint-disable no-console */
function parseData(data) {
  // parsing data into a valid object
  const { module, modServices, metrics } = data
  const { name, responsibility } = module
  const services = modServices.services.map(({ id, name }) => ({ id, name }))
  const links = modServices.links

  return {
    name,
    responsibility,
    services,
    links,
    metrics,
  }
}

async function getModuleData(moduleId, $axios) {
  let moduleData = {}

  try {
    const module = await $axios.$get(`/api/modules/${moduleId}`)
    const modServices = await $axios.$get(`/api/modules/${moduleId}/services`)
    const metrics = await $axios.$get(`/api/modules/${moduleId}/metrics`)
    moduleData = parseData({ module, modServices, metrics })
  } catch (err) {
    console.log('error occuried while fetching from api...')
    console.log(err.message)
  }

  return moduleData
}

export default getModuleData
