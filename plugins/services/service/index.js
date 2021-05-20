/* eslint-disable no-console */
function parseData(data) {
  // parsing data into a valid object
  const { service, metrics } = data
  const {
    name,
    responsibility,
    databases,
    syncOperations,
    asyncOperations,
  } = service

  return {
    name,
    responsibility,
    databases,
    syncOperations,
    asyncOperations,
    metrics,
  }
}

async function getServiceData(serviceId, $axios) {
  let serviceData = []

  try {
    const service = await $axios.$get(`/api/services/${serviceId}`)
    const metrics = await $axios.$get(`/api/services/${serviceId}/metrics`)
    serviceData = parseData({ service, metrics })
  } catch (err) {
    console.log('error occuried while fetching from api...')
    console.log(err.message)
  }

  return serviceData
}

export default getServiceData
