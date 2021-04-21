/* eslint-disable no-console */
function parseData(data) {
  // parsing data into a valid object
  return data
}

async function getSystemData(systemId, $axios) {
  let systemData = []

  try {
    const response = await $axios.$get(`/api/systems/${systemId}`)
    systemData = parseData(response)
  } catch (err) {
    console.log('error occuried while fetching from api...')
    console.log(err.message)
  }

  return systemData
}

export default getSystemData
