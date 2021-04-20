/* eslint-disable no-console */
function buildDefaultSystem() {
  return {
    name: undefined,
    description: undefined,
    nonFunctionalRequirements: [],
    modules: [],
    metrics: [],
  }
}

function parseData(data) {
  // parsing data into a valid object
  return data
}

async function getSystemData(systemId) {
  // fetch from external source data
  const baseUrl = process.env.development
    ? 'http://localhost:3000'
    : 'https://the-sortinghat.netlify.app'

  let systemData = buildDefaultSystem()

  try {
    const response = await fetch(`${baseUrl}/api/systems/${systemId}`)
    systemData = parseData(await response.json())
  } catch (err) {
    console.log('error occuried while fetching from api...')
    console.log(err.message)
  }

  return systemData
}

export default getSystemData
