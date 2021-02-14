function parseData(data) {
  // parsing data into a valid object

  return {
    name: 'InterSCity',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
    nonFunctionalRequirements: [
      'Cloud-native',
      'Interoperability',
      'Adaptation',
      'Evolvability',
    ],
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

function getSystemData(systemId) {
  // fetch from external source data
  const parsedData = parseData({})
  return new Promise((resolve) => resolve(parsedData))
}

export default getSystemData
