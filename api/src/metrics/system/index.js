import {
  getModules,
  getRelashionshipsModuleDatabase,
  getRelashionshipsServiceDatabase,
  getServiceCommunication,
  getServices,
} from '../../services'
import modulesSharingDatabases from './modules_sharing_db'
import largestServices from './largest_services'
import smallestServices from './smallest_services'
import numberOfDatabases from './number_of_databases'
import servicesWithGreaterCoupling from './services_greater_coupling'
import servicesWithLessCoupling from './services_less_coupling'
import databaseWithMostConnections from './database_most_connections'

async function getData(systemId) {
  const allModules = await getModules()

  const allServices = await getServices()

  const allRelashionshipsModuleDatabase = await getRelashionshipsModuleDatabase()

  const allRelashionshipsServiceDatabase = await getRelashionshipsServiceDatabase()

  const allLinks = await getServiceCommunication()

  const modules = allModules.filter((mod) => mod.systemId === systemId)

  const services = allServices.filter(({ moduleId }) =>
    modules.find(({ id }) => id === moduleId)
  )

  const links = allLinks.filter(
    ({ source, target }) =>
      services.find(({ id }) => id === source) &&
      services.find(({ id }) => id === target)
  )

  const relashionshipsModuleDatabase = allRelashionshipsModuleDatabase.filter(
    (rel) => modules.find((module) => rel.moduleId === module.id)
  )

  const relashionshipsServiceDatabase = allRelashionshipsServiceDatabase.filter(
    (rel) => services.find((service) => rel.serviceId === service.id)
  )

  return {
    modules,
    services,
    relashionshipsModuleDatabase,
    relashionshipsServiceDatabase,
    links,
  }
}

function getNonMeasurableMetrics(
  modules,
  services,
  relashionshipsServiceDatabase,
  links
) {
  return [
    {
      name: 'number of modules',
      value: `${modules.length} modules`,
    },
    {
      name: 'number of services',
      value: `${services.length} services`,
    },
    {
      name: 'number of databases',
      value: `${numberOfDatabases(modules)} databases`,
    },
    {
      name: 'largest service',
      value: largestServices(services),
    },
    {
      name: 'smallest service',
      value: smallestServices(services),
    },
    {
      name: 'service with greater synchronous coupling',
      value: servicesWithGreaterCoupling(
        services,
        links.filter(({ type }) => type === 'sync')
      ),
    },
    {
      name: 'service with greater asynchronous coupling',
      value: servicesWithGreaterCoupling(
        services,
        links.filter(({ type }) => type === 'async')
      ),
    },
    {
      name: 'service with greater total coupling',
      value: servicesWithGreaterCoupling(services, links),
    },
    {
      name: 'service with less synchronous coupling',
      value: servicesWithLessCoupling(
        services,
        links.filter(({ type }) => type === 'sync')
      ),
    },
    {
      name: 'service with less asynchronous coupling',
      value: servicesWithLessCoupling(
        services,
        links.filter(({ type }) => type === 'async')
      ),
    },
    {
      name: 'service with less total coupling',
      value: servicesWithLessCoupling(services, links),
    },
    {
      name: 'database with most reading connections',
      value: databaseWithMostConnections(
        relashionshipsServiceDatabase,
        'reading'
      ),
    },
    {
      name: 'database with most writing connections',
      value: databaseWithMostConnections(
        relashionshipsServiceDatabase,
        'writing'
      ),
    },
  ]
}

function getMeasurableMetrics(modules, relashionshipsModuleDatabase, links) {
  const numberOfSyncOps = links.reduce(
    (acc, { type }) => (type === 'sync' ? acc + 1 : acc),
    0
  )
  const totalOps = links.length

  return [
    {
      name: 'modules sharing DB',
      measure: {
        min: 0,
        max: modules.length,
        value: modulesSharingDatabases(relashionshipsModuleDatabase),
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
  ]
}

export async function systemMetrics(systemId) {
  const {
    modules,
    services,
    relashionshipsModuleDatabase,
    relashionshipsServiceDatabase,
    links,
  } = await getData(systemId)

  return {
    nonMeasurable: getNonMeasurableMetrics(
      modules,
      services,
      relashionshipsServiceDatabase,
      links
    ),
    measurable: getMeasurableMetrics(
      modules,
      relashionshipsModuleDatabase,
      links
    ),
  }
}
