export default function largestServices(services) {
  if (services.length === 0) return 'The system has no services'

  const maxValue = services.reduce(
    (acc, { numberOfOperations }) =>
      numberOfOperations > acc ? numberOfOperations : acc,
    0
  )

  const largestServices = services
    .filter((s) => s.numberOfOperations === maxValue)
    .map((s) => s.name)

  return `${largestServices.join(', ')} (${maxValue} operations)`
}
