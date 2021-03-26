function parseData(data) {
  // parsing data into a valid object

  return {
    name: 'Data Collector',
    responsability: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
    services: [
      {
        id: 1,
        name: 'Data Collector',
      },
    ],
    metrics: [
      {
        metric: 'Number of Services',
        measure: { min: 0, max: 3, value: 1 },
      },
      {
        metric: 'Number of Databases',
        measure: { min: 0, max: 2, value: 2 },
      },
      {
        metric: 'Number of Operations',
        measure: { min: 0, max: 5, value: 4 },
      },
    ],
  }
}

function getModuleData(moduleId) {
  // fetch from external source data
  const parsedData = parseData({})
  return new Promise((resolve) => resolve(parsedData))
}

export default getModuleData
