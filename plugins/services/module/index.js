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
    numberOfDatabases: 2,
    numberOfOperations: 4,
  }
}

function getModuleData(moduleId) {
  // fetch from external source data
  const parsedData = parseData({})
  return new Promise((resolve) => resolve(parsedData))
}

export default getModuleData
