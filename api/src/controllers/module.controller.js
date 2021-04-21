import { moduleMetrics } from '../metrics/module'
import { getModules, getServices } from '../services'

class ModuleController {
  static async find(req, res) {
    const id = parseInt(req.params.id)

    const allModules = await getModules()

    const allServices = await getServices()

    const { name, responsibility } = allModules.find((mod) => mod.id === id)

    const services = allServices
      .filter(({ moduleId }) => moduleId === id)
      .map(({ id, name }) => ({ id, name }))

    const metrics = moduleMetrics(allModules, id)

    const response = {
      name,
      responsibility,
      services,
      metrics,
    }

    return res.status(200).json(response)
  }
}

export default ModuleController
