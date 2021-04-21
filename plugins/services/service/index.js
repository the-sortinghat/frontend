/* eslint-disable no-console */
function parseData(data) {
  // parsing data into a valid object
  return data
}

async function getServiceData(serviceId, $axios) {
  let serviceData = []

  try {
    const response = await $axios.$get(`/api/services/${serviceId}`)
    serviceData = parseData(response)
  } catch (err) {
    console.log('error occuried while fetching from api...')
    console.log(err.message)
  }

  return serviceData
}

export default getServiceData
