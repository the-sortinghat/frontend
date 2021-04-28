import { moduleMetrics } from '../metrics/module'
import { getModules, getServiceCommunication, getServices } from '../services'

class ModuleController {
  static async find(req, res) {
    const id = parseInt(req.params.id)

    const allModules = await getModules()

    const module = allModules.find((mod) => mod.id === id)

    return res.status(200).json(module)
  }

  static async getServices(req, res) {
    const id = parseInt(req.params.id)

    const allServices = await getServices()

    const allLinks = await getServiceCommunication()

    const services = allServices.filter(({ moduleId }) => moduleId === id)

    const links = allLinks
      .filter(
        (link) =>
          services.find((service) => service.id === link.source) &&
          services.find((service) => service.id === link.target)
      )
      .map(({ source, target, type }) => ({ source, target, type }))

    const response = {
      services,
      links,
    }

    return res.status(200).json(response)
  }

  static async getMetrics(req, res) {
    const id = parseInt(req.params.id)

    const allModules = await getModules()

    const metrics = moduleMetrics(allModules, id)

    return res.status(200).json(metrics)
  }
}

export default ModuleController
