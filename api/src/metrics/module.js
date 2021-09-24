export function moduleMetrics(modules, id) {
  const {
    numberOfServices,
    numberOfDatabases,
    numberOfOperations,
  } = modules.find((mod) => mod.id === id)

  return {
    nonMeasurable: [
      {
        name: 'Number of Services',
        value: numberOfServices,
      },
      {
        name: 'Number of Databases',
        value: numberOfDatabases,
      },
      {
        name: 'Number of Operations',
        value: numberOfOperations,
      },
    ],
    measurable: [],
  }
}
