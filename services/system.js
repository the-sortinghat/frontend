function parseData(data) {
  // parsing data into a valid object

  return {
    modules: [
      {
        id: 1,
        name: 'Actuator Controller',
        responsibility: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
        numberOfDatabases: 1,
        numberOfServices: 1,
        operations: ['GET /actuator/commands', 'POST /actuator/commands'],
      },
      {
        id: 2,
        name: 'Data Collector',
        responsibility: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
        numberOfDatabases: 2,
        numberOfServices: 1,
        operations: [
          'POST /collector/resources/data',
          'POST /collector/resources/{uuid}/data',
          'POST /collector/resources/data/last',
          'POST /collector/resources/{uuid}/data/last',
        ],
      },
    ],
  }
}

async function getSystemData(systemId) {
  // fetch from external source data
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const systemData = parseData({})
  return systemData
}

export default getSystemData
