export default function modulesSharingDatabases(relashionshipsModuleDatabase) {
  const databasesUsedByModules = {}

  relashionshipsModuleDatabase.forEach(({ databaseId }) => {
    databasesUsedByModules[databaseId] = databasesUsedByModules[databaseId]
      ? databasesUsedByModules[databaseId] + 1
      : 1
  })

  return Object.values(databasesUsedByModules).reduce(
    (acc, value) => (value > 1 ? acc + value : acc),
    0
  )
}
