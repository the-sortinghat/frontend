/* eslint-disable no-console */
import { parseSystemData } from './parser'

export async function getSystemData(systemId, $axios) {
  let systemData = {}

  try {
    const system = await $axios.$get(`/api/systems/${systemId}`)
    const sysModules = await $axios.$get(`/api/systems/${systemId}/modules`)
    const sysMetrics = await $axios.$get(`/api/systems/${systemId}/metrics`)
    systemData = parseSystemData(system, sysModules, sysMetrics)
  } catch (err) {
    console.log('error occuried while fetching from api...')
    console.log(err.message)
  }

  return systemData
}
