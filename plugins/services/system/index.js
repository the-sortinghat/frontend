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
        name: 'Resource Discovery',
      },
      {
        id: 2,
        name: 'Data Collector',
      },
      {
        id: 3,
        name: 'Resource Catolog',
      },
      {
        id: 4,
        name: 'Actuator Controller',
      },
      {
        id: 5,
        name: 'Resource Adaptor',
      },
    ],
    metrics: [
      {
        metric: 'services per module',
        measure: { min: 0, max: 5, value: 1 },
      },
      {
        metric: 'modules sharing DB',
        measure: { min: 0, max: 8, value: 0 },
      },
      {
        metric: 'synchronous coupling level',
        measure: { min: 0, max: 10, value: 3 },
      },
      {
        metric: 'asynchronous coupling level',
        measure: { min: 0, max: 9, value: 6 },
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
