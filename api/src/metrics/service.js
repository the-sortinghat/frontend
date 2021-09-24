export function serviceMetrics(id, services) {
  const { numberOfDatabases, numberOfOperations } = services.find(
    (s) => s.id === id
  )

  return {
    nonMeasurable: [
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
