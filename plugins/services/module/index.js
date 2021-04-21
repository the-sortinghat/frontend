/* eslint-disable no-console */
function parseData(data) {
  // parsing data into a valid object
  return data
}

async function getModuleData(moduleId, $axios) {
  let moduleData = []

  try {
    const response = await $axios.$get(`/api/modules/${moduleId}`)
    moduleData = parseData(response)
  } catch (err) {
    console.log('error occuried while fetching from api...')
    console.log(err.message)
  }

  return moduleData
}

export default getModuleData
