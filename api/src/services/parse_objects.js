export const rowToSystem = (row) => ({
  id: row[0],
  name: row[1],
  description: row[2],
  nonFunctionalRequirements: row[3]
    .split(',')
    .map((nfr) => nfr.trim())
    .filter((nfr) => nfr.length > 0),
})

export const rowToModule = (row) => ({
  id: row[0],
  systemId: row[1],
  name: row[2],
  responsibility: row[3],
  numberOfServices: row[4],
  numberOfOperations: row[5],
  numberOfDatabases: row[7],
})

export const rowToService = (row) => ({
  id: row[0],
  moduleId: row[1],
  name: row[2],
  responsibility: row[3],
  numberOfOperations: row[4],
  operations: row[5]
    .split(',')
    .map((op) => op.trim())
    .filter((op) => op.length > 0),
  numberOfDatabases: row[6],
})

export const rowToDatabase = (row) => ({
  id: row[0],
  model: row[1],
})

export const rowToModuleDatabase = (row) => ({
  databaseId: row[0],
  moduleId: row[1],
})

export const rowToServiceDatabase = (row) => ({
  databaseId: row[0],
  serviceId: row[1],
  role: row[2],
  access_type: row[3],
  namespace: row[4],
})
