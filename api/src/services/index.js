import { fetchSpreadsheet } from './fetch_data'
import {
  rowToSystem,
  rowToModule,
  rowToService,
  rowToDatabase,
  rowToModuleDatabase,
  rowToServiceDatabase,
} from './parse_objects'

const payload = {
  sheetsAPIKey: process.env.sheetsAPIKey,
  sheetID: process.env.sheetID,
  sheetName: '',
}

export const getSystems = async () =>
  await fetchSpreadsheet({ ...payload, sheetName: 'system' }, rowToSystem)

export const getModules = async () =>
  await fetchSpreadsheet({ ...payload, sheetName: 'module' }, rowToModule)

export const getServices = async () =>
  await fetchSpreadsheet({ ...payload, sheetName: 'service' }, rowToService)

export const getDatabases = async () =>
  await fetchSpreadsheet({ ...payload, sheetName: 'database' }, rowToDatabase)

export const getRelashionshipsModuleDatabase = async () =>
  await fetchSpreadsheet(
    { ...payload, sheetName: 'module_database' },
    rowToModuleDatabase
  )

export const getRelashionshipsServiceDatabase = async () =>
  await fetchSpreadsheet(
    { ...payload, sheetName: 'service_database' },
    rowToServiceDatabase
  )
