import { modulesSharingDatabases, servicesPerModule } from '../metrics/system'
import {
  getModules,
  getRelashionshipsModuleDatabase,
  getServices,
  getSystems,
} from '../services'

class SystemController {
  static async index(_, res) {
    const systems = await getSystems()
    return res.status(200).json(systems)
  }

  static async find(req, res) {
    const { id } = req.params
    const allSystems = await getSystems()
    const allModules = await getModules()
    const allServices = await getServices()
    const relashionshipsModuleDatabase = await getRelashionshipsModuleDatabase()
    const system = allSystems.find((sys) => sys.id === id)
    const systemModules = allModules.filter((mod) => mod.systemId === id)
    const servPerMod = servicesPerModule(systemModules, allServices)
    const modulesSharingDB = modulesSharingDatabases(
      systemModules,
      relashionshipsModuleDatabase
    )
    const response = {
      name: system.name,
      description: system.description,
      nonFunctionalRequirements: system.nonFunctionalRequirements,
      modules: systemModules.map(({ id, name }) => ({ id, name })),
      metrics: [
        {
          metric: 'services per module',
          measure: { min: 0, max: 5, value: servPerMod },
        },
        {
          metric: 'modules sharing DB',
          measure: { min: 0, max: 8, value: modulesSharingDB },
        },
      ],
    }

    return res.status(200).json(response)
  }
}

export default SystemController
