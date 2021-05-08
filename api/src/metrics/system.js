function modulesSharingDatabases(modules, relashionshipsModuleDatabase) {
  const filteredRelashionships = relashionshipsModuleDatabase.filter((rel) =>
    modules.find((module) => rel.moduleId === module.id)
  )

  const mySet = new Set()

  return filteredRelashionships.reduce((acc, { databaseId }, index) => {
    mySet.add(index)

    const result = filteredRelashionships.reduce((prev, curr, i) => {
      if (!mySet.has(i) && curr.databaseId === databaseId) {
        mySet.add(i)
        return prev + 1
      }

      return prev
    }, 1)

    return result > 1 ? acc + result : acc
  }, 0)
}

function getLargestServices(services) {
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

function getSmallestServices(services) {
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

function getNumberOfDatabases(modules) {
  return modules.reduce(
    (acc, { numberOfDatabases }) => acc + numberOfDatabases,
    0
  )
}

function getServicesWithGreaterCoupling(services, calls) {
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

function getServicesWithLessCoupling(services, calls) {
  if (services.length === 0) return 'The system has no services'

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

  return lessServices.join(',')
}

export function systemMetrics(
  systemId,
  modules,
  services,
  relModuleDatabase,
  allLinks
) {
  const systemModules = modules.filter((mod) => mod.systemId === systemId)

  const systemServices = services.filter(({ moduleId }) =>
    systemModules.find(({ id }) => id === moduleId)
  )

  const systemLinks = allLinks.filter(
    ({ source, target }) =>
      systemServices.find(({ id }) => id === source) &&
      systemServices.find(({ id }) => id === target)
  )

  const numberOfSyncOps = systemLinks.reduce(
    (acc, { type }) => (type === 'sync' ? acc + 1 : acc),
    0
  )
  const totalOps = systemLinks.length

  return {
    nonMeasurable: [
      {
        name: 'largest service',
        value: getLargestServices(systemServices),
      },
      {
        name: 'smallest service',
        value: getSmallestServices(systemServices),
      },
      {
        name: 'service with greater synchronous coupling',
        value: getServicesWithGreaterCoupling(
          systemServices,
          systemLinks.filter(({ type }) => type === 'sync')
        ),
      },
      {
        name: 'service with greater asynchronous coupling',
        value: getServicesWithGreaterCoupling(
          systemServices,
          systemLinks.filter(({ type }) => type === 'async')
        ),
      },
      {
        name: 'service with greater total coupling',
        value: getServicesWithGreaterCoupling(systemServices, systemLinks),
      },
      {
        name: 'service with less synchronous coupling',
        value: getServicesWithLessCoupling(
          systemServices,
          systemLinks.filter(({ type }) => type === 'sync')
        ),
      },
      {
        name: 'service with less asynchronous coupling',
        value: getServicesWithLessCoupling(
          systemServices,
          systemLinks.filter(({ type }) => type === 'async')
        ),
      },
      {
        name: 'service with less total coupling',
        value: getServicesWithLessCoupling(systemServices, systemLinks),
      },
    ],
    measurable: [
      {
        name: 'number of modules',
        measure: {
          min: 0,
          max: 10, // fake max for a while (we have only one system yet)
          value: systemModules.length,
        },
      },
      {
        name: 'number of services',
        measure: {
          min: 0,
          max: 10, // fake max for a while (we have only one system yet)
          value: systemServices.length,
        },
      },
      {
        name: 'number of databases',
        measure: {
          min: 0,
          max: 15, // fake max for a while (we have only one system yet)
          value: getNumberOfDatabases(systemModules),
        },
      },
      {
        name: 'modules sharing DB',
        measure: {
          min: 0,
          max: 8, // fake max for a while (we have only one system yet)
          value: modulesSharingDatabases(systemModules, relModuleDatabase),
        },
      },
      {
        name: '% sync connections',
        measure: {
          min: 0,
          max: 100,
          value: ((numberOfSyncOps * 100) / totalOps).toFixed(3),
        },
      },
      {
        name: '% async connections',
        measure: {
          min: 0,
          max: 100,
          value: (((totalOps - numberOfSyncOps) * 100) / totalOps).toFixed(3),
        },
      },
    ],
  }
}
