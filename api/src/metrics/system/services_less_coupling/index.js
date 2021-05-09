export default function servicesWithLessCoupling(services, calls) {
  if (services.length === 0) return 'The system has no service'

  const servicesOperations = {}

  calls.forEach(({ source }) => {
    servicesOperations[source] = servicesOperations[source]
      ? servicesOperations[source] + 1
      : 1
  })

  const servicesEntries = Object.entries(servicesOperations)
  const minValue = servicesEntries
    .slice(1)
    .reduce(
      (acc, [_, value]) => (value < acc ? value : acc),
      servicesEntries[0][1]
    )

  const lessServices = servicesEntries
    .filter(([_, value]) => value === minValue)
    .map(([key, _]) => services.find((s) => s.id === parseInt(key)).name)

  return lessServices.join(', ')
}
