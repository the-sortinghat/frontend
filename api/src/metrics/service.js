const getMaxNumberOfDatabases = (services) =>
  services.reduce(
    (acc, { numberOfDatabases }) =>
      numberOfDatabases > acc ? numberOfDatabases : acc,
    0
  )

const getMaxNumberOfOperations = (services) =>
  services.reduce(
    (acc, { numberOfOperations }) =>
      numberOfOperations > acc ? numberOfOperations : acc,
    0
  )

export function serviceMetrics(id, services) {
  const { numberOfDatabases, numberOfOperations } = services.find(
    (s) => s.id === id
  )

  return {
    nonMeasurable: [],
    measurable: [
      {
        name: 'Number of Databases',
        measure: {
          min: 0,
          max: getMaxNumberOfDatabases(services),
          value: numberOfDatabases,
        },
      },
      {
        name: 'Number of Operations',
        measure: {
          min: 0,
          max: getMaxNumberOfOperations(services),
          value: numberOfOperations,
        },
      },
    ],
  }
}
