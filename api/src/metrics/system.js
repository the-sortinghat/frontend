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

const getNumberOfSyncOps = (links) =>
  links.reduce((acc, { type }) => (type === 'sync' ? acc + 1 : acc), 0)

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

  const numberOfSyncOps = getNumberOfSyncOps(systemLinks)

  return {
    nonMeasurable: [],
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
        name: 'modules sharing DB',
        measure: {
          min: 0,
          max: 8, // fake max for a while (we have only one system yet)
          value: modulesSharingDatabases(systemModules, relModuleDatabase),
        },
      },
      {
        name: '% of synchronous connections',
        measure: {
          min: 0,
          max: 100,
          value: (numberOfSyncOps * 100) / systemLinks.length,
        },
      },
      {
        name: '% of asynchronous connections',
        measure: {
          min: 0,
          max: 100,
          value:
            ((systemLinks.length - numberOfSyncOps) * 100) / systemLinks.length,
        },
      },
    ],
  }
}
