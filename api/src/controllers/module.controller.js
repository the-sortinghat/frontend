import { getModules, getServices } from '../services'

class ModuleController {
  static async find(req, res) {
    const { id } = req.params

    const allModules = await getModules()

    const allServices = await getServices()

    const {
      name,
      responsibility,
      numberOfServices,
      numberOfOperations,
      numberOfDatabases,
    } = allModules.find((mod) => mod.id === id)

    const services = allServices
      .filter(({ moduleId }) => moduleId === id)
      .map(({ id, name }) => ({ id, name }))

    const metrics = [
      {
        metric: 'Number of Services',
        measure: { min: 0, max: 3, value: numberOfServices },
      },
      {
        metric: 'Number of Databases',
        measure: { min: 0, max: 2, value: numberOfDatabases },
      },
      {
        metric: 'Number of Operations',
        measure: { min: 0, max: 5, value: numberOfOperations },
      },
    ]

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
