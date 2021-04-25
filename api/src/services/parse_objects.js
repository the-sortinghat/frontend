export const rowToSystem = (row) => ({
  id: parseInt(row[0]),
  name: row[1],
  description: row[2],
  nonFunctionalRequirements: row[3]
    .split(',')
    .map((nfr) => nfr.trim())
    .filter((nfr) => nfr.length > 0),
})

export const rowToModule = (row) => ({
  id: parseInt(row[0]),
  systemId: parseInt(row[1]),
  name: row[2],
  responsibility: row[3],
  numberOfServices: parseInt(row[4]),
  numberOfOperations: parseInt(row[5]),
  numberOfDatabases: parseInt(row[7]),
})

export const rowToService = (row) => ({
  id: parseInt(row[0]),
  moduleId: parseInt(row[1]),
  name: row[2],
  responsibility: row[3],
  numberOfOperations: parseInt(row[4]),
  operations: row[5]
    .split(',')
    .map((op) => op.trim())
    .filter((op) => op.length > 0),
  numberOfDatabases: parseInt(row[6]),
})

export const rowToDatabase = (row) => ({
  id: parseInt(row[0]),
  model: row[1],
})

export const rowToModuleDatabase = (row) => ({
  databaseId: parseInt(row[0]),
  moduleId: parseInt(row[1]),
})

export const rowToServiceDatabase = (row) => ({
  databaseId: parseInt(row[0]),
  serviceId: parseInt(row[1]),
  role: row[2],
  access_type: row[3],
  namespace: row[4],
})

export const rowToServiceCommunication = (row) => ({
  source: parseInt(row[0]),
  target: parseInt(row[1]),
  type: parseInt(row[2]) ? 'sync' : 'async',
})
