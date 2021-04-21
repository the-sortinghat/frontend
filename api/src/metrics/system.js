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

function servicesPerModule(sysModules, services) {
  const totalOfServices = sysModules.reduce((acc, val) => {
    return (
      acc + services.filter((service) => service.moduleId === val.id).length
    )
  }, 0)

  return totalOfServices / sysModules.length
}

function getMaxServicesPerModule(modules, services) {
  return modules.reduce((acc, { id }) => {
    const totalServices = services.filter((serv) => serv.moduleId === id).length
    return totalServices > acc ? totalServices : acc
  }, 0)
}

export function systemMetrics(systemId, modules, services, relModuleDatabase) {
  const systemModules = modules.filter((mod) => mod.systemId === systemId)

  return [
    {
      metric: 'services per module',
      measure: {
        min: 0,
        max: getMaxServicesPerModule(modules, services),
        value: servicesPerModule(systemModules, services),
      },
    },
    {
      metric: 'modules sharing DB',
      measure: {
        min: 0,
        max: 8, // fake max for a while
        value: modulesSharingDatabases(systemModules, relModuleDatabase),
      },
    },
  ]
}
