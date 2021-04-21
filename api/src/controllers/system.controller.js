import { systemMetrics } from '../metrics/system'
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
    const id = parseInt(req.params.id)

    const allSystems = await getSystems()

    const allModules = await getModules()

    const allServices = await getServices()

    const relashionshipsModuleDatabase = await getRelashionshipsModuleDatabase()

    const { name, description, nonFunctionalRequirements } = allSystems.find(
      (sys) => sys.id === id
    )

    const modules = allModules
      .filter((mod) => mod.systemId === id)
      .map(({ id, name }) => ({ id, name }))

    const metrics = systemMetrics(
      id,
      allModules,
      allServices,
      relashionshipsModuleDatabase
    )

    const response = {
      name,
      description,
      nonFunctionalRequirements,
      modules,
      metrics,
    }

    return res.status(200).json(response)
  }
}

export default SystemController
