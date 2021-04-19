export function modulesSharingDatabases(modules, relashionshipsModuleDatabase) {
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

export function servicesPerModule(modules, services) {
  const totalOfServices = modules.reduce((acc, val) => {
    return (
      acc + services.filter((service) => service.moduleId === val.id).length
    )
  }, 0)

  return totalOfServices / modules.length
}
