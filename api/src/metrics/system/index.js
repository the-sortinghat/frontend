import {
  getModules,
  getRelashionshipsModuleDatabase,
  getServiceCommunication,
  getServices,
} from '../../services'
import modulesSharingDatabases from './modules_sharing_db'
import largestServices from './largest_services'
import smallestServices from './smallest_services'
import numberOfDatabases from './number_of_databases'
import servicesWithGreaterCoupling from './services_greater_coupling'
import servicesWithLessCoupling from './services_less_coupling'

async function getData(systemId) {
  const allModules = await getModules()

  const allServices = await getServices()

  const allRelashionshipsModuleDatabase = await getRelashionshipsModuleDatabase()

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

  return {
    modules,
    services,
    relashionshipsModuleDatabase,
    links,
  }
}

function getNonMeasurableMetrics(services, links) {
  return [
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
  ]
}

function getMeasurableMetrics(
  modules,
  services,
  relashionshipsModuleDatabase,
  links
) {
  const numberOfSyncOps = links.reduce(
    (acc, { type }) => (type === 'sync' ? acc + 1 : acc),
    0
  )
  const totalOps = links.length

  return [
    {
      name: 'number of modules',
      measure: {
        min: 0,
        max: 10, // fake max for a while (we have only one system yet)
        value: modules.length,
      },
    },
    {
      name: 'number of services',
      measure: {
        min: 0,
        max: 10, // fake max for a while (we have only one system yet)
        value: services.length,
      },
    },
    {
      name: 'number of databases',
      measure: {
        min: 0,
        max: 15, // fake max for a while (we have only one system yet)
        value: numberOfDatabases(modules),
      },
    },
    {
      name: 'modules sharing DB',
      measure: {
        min: 0,
        max: 8, // fake max for a while (we have only one system yet)
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
    links,
  } = await getData(systemId)

  return {
    nonMeasurable: getNonMeasurableMetrics(services, links),
    measurable: getMeasurableMetrics(
      modules,
      services,
      relashionshipsModuleDatabase,
      links
    ),
  }
}
