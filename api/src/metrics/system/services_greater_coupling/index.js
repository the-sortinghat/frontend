export default function servicesWithGreaterCoupling(services, calls) {
  if (services.length === 0) return 'The system has no services'

  const servicesOperations = {}

  calls.forEach(({ source }) => {
    servicesOperations[source] = servicesOperations[source]
      ? servicesOperations[source] + 1
      : 1
  })

  const maxValue = Object.entries(servicesOperations).reduce(
    (acc, [_, value]) => (value > acc ? value : acc),
    0
  )
  const greaterServices = Object.entries(servicesOperations)
    .filter(([_, value]) => value === maxValue)
    .map(([key, _]) => services.find((s) => s.id === parseInt(key)).name)

  return greaterServices.join(',')
}
