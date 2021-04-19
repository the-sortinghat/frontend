const { fetchSpreadsheet } = require('./fetch_data')
const {
  rowToSystem,
  rowToModule,
  rowToService,
  rowToDatabase,
  rowToModuleDatabase,
  rowToServiceDatabase,
} = require('./parse_objects')

const payload = {
  sheetsAPIKey: process.env.sheetsAPIKey,
  sheetID: process.env.sheetID,
  sheetName: '',
}

const getSystems = async () =>
  await fetchSpreadsheet({ ...payload, sheetName: 'system' }, rowToSystem)

const getModules = async () =>
  await fetchSpreadsheet({ ...payload, sheetName: 'module' }, rowToModule)

const getServices = async () =>
  await fetchSpreadsheet({ ...payload, sheetName: 'service' }, rowToService)

const getDatabases = async () =>
  await fetchSpreadsheet({ ...payload, sheetName: 'database' }, rowToDatabase)

const getRelashionshipsModuleDatabase = async () =>
  await fetchSpreadsheet(
    { ...payload, sheetName: 'module_database' },
    rowToModuleDatabase
  )

const getRelashionshipsServiceDatabase = async () =>
  await fetchSpreadsheet(
    { ...payload, sheetName: 'service_database' },
    rowToServiceDatabase
  )

module.exports = {
  getSystems,
  getModules,
  getServices,
  getDatabases,
  getRelashionshipsModuleDatabase,
  getRelashionshipsServiceDatabase,
}
