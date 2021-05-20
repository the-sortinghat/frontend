import { systemMetrics } from '../metrics/system'
import { getModules, getServiceCommunication, getSystems } from '../services'

class SystemController {
  static async index(_, res) {
    const systems = await getSystems()
    return res.status(200).json(systems)
  }

  static async find(req, res) {
    const id = parseInt(req.params.id)

    const allSystems = await getSystems()

    const system = allSystems.find((sys) => sys.id === id)

    return res.status(200).json(system)
  }

  static async getModules(req, res) {
    const id = parseInt(req.params.id)

    const allModules = await getModules()

    const allLinks = await getServiceCommunication()

    const modules = allModules.filter((mod) => mod.systemId === id)

    const links = allLinks
      .filter(
        (link) =>
          modules.find((mod) => mod.id === link.source) &&
          modules.find((mod) => mod.id === link.target)
      )
      .map(({ source, target, type }) => ({ source, target, type }))

    const response = {
      modules,
      links,
    }

    return res.status(200).json(response)
  }

  static async getMetrics(req, res) {
    const id = parseInt(req.params.id)

    const metrics = await systemMetrics(id)

    return res.status(200).json(metrics)
  }
}

export default SystemController
