const getMaxNumberOfServices = (modules) =>
  modules.reduce(
    (acc, { numberOfServices }) =>
      numberOfServices > acc ? numberOfServices : acc,
    0
  )

const getMaxNumberOfDatabases = (modules) =>
  modules.reduce(
    (acc, { numberOfDatabases }) =>
      numberOfDatabases > acc ? numberOfDatabases : acc,
    0
  )

const getMaxNumberOfOperations = (modules) =>
  modules.reduce(
    (acc, { numberOfOperations }) =>
      numberOfOperations > acc ? numberOfOperations : acc,
    0
  )

export function moduleMetrics(modules, id) {
  const {
    numberOfServices,
    numberOfDatabases,
    numberOfOperations,
  } = modules.find((mod) => mod.id === id)

  return [
    {
      metric: 'Number of Services',
      measure: {
        min: 0,
        max: getMaxNumberOfServices(modules),
        value: numberOfServices,
      },
    },
    {
      metric: 'Number of Databases',
      measure: {
        min: 0,
        max: getMaxNumberOfDatabases(modules),
        value: numberOfDatabases,
      },
    },
    {
      metric: 'Number of Operations',
      measure: {
        min: 0,
        max: getMaxNumberOfOperations(modules),
        value: numberOfOperations,
      },
    },
  ]
}
