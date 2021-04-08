function parseData(data) {
  // parsing data into a valid object

  return {
    name: 'Data Collector',
    responsibility: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
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
        label: 'POST /collector/resources/data',
      },
      {
        id: 2,
        label: 'POST /collector/resources/:id/data',
      },
      {
        id: 3,
        label: 'POST /collector/resources/data/last',
      },
      {
        id: 4,
        label: 'POST /collector/resources/:id/data/last',
      },
    ],
    asyncOperations: [
      {
        id: 1,
        topic: 'lorem_ipsum',
        broker: 'RabbitMQ',
      },
    ],
    metrics: [
      {
        metric: 'Number of Databases',
        measure: { min: 0, max: 2, value: 2 },
      },
      {
        metric: 'Number of Operations',
        measure: { min: 0, max: 5, value: 4 },
      },
      {
        metric: 'Number of Database Sharing',
        measure: { min: 0, max: 2, value: 0 },
      },
    ],
  }
}

function getServiceData(serviceId) {
  // fetch from external source data
  const parsedData = parseData({})
  return new Promise((resolve) => resolve(parsedData))
}

export default getServiceData
