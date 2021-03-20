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
    databases: [
      {
        id: 1,
        model: 'documents',
        role: 'storage',
        namespace: 'data-controller-mongodb',
        access_type: 'rw',
      },
      {
        id: 3,
        model: 'documents',
        role: 'cache',
        namespace: 'data-controller-mongo-cache',
        access_type: 'rw',
      },
    ],
    operations: [
      {
        id: 1,
        serviceId: 1,
        label: 'POST /collector/resources/data',
      },
      {
        id: 2,
        serviceId: 1,
        label: 'POST /collector/resources/:id/data',
      },
      {
        id: 3,
        serviceId: 1,
        label: 'POST /collector/resources/data/last',
      },
      {
        id: 4,
        serviceId: 1,
        label: 'POST /collector/resources/:id/data/last',
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
