export default function smallestServices(services) {
  if (services.length === 0) return 'The system has no services'

  const minValue = services
    .slice(1)
    .reduce(
      (acc, { numberOfOperations }) =>
        numberOfOperations < acc ? numberOfOperations : acc,
      services[0].numberOfOperations
    )

  const smallestServices = services
    .filter((s) => s.numberOfOperations === minValue)
    .map((s) => s.name)

  return `${smallestServices.join(', ')} (${minValue} operations)`
}
