import {
  getDatabases,
  getRelashionshipsServiceDatabase,
  getServices,
} from '../services'

class ServiceController {
  static async find(req, res) {
    const { id } = req.params
    const allServices = await getServices()
    const allDatabases = await getDatabases()
    const service = allServices.find((s) => s.id === id)
    const relashionships = (await getRelashionshipsServiceDatabase()).filter(
      ({ serviceId }) => serviceId === id
    )
    const databases = relashionships.map((rel) => ({
      id: rel.databaseId,
      model: allDatabases.find((db) => db.id === rel.databaseId).model,
      role: rel.role,
      access_type: rel.access_type,
      namespace: rel.namespace,
    }))
    const metrics = [
      {
        metric: 'Number of Databases',
        measure: { min: 0, max: 2, value: service.numberOfDatabases },
      },
      {
        metric: 'Number of Operations',
        measure: { min: 0, max: 5, value: service.numberOfOperations },
      },
    ]

    const response = {
      name: service.name,
      responsibility: service.responsibility,
      databases,
      syncOperations: service.operations.map((op, index) => ({
        id: index + 1,
        name: op,
      })),
      asyncOperations: [],
      metrics,
    }

    return res.status(200).json(response)
  }
}

export default ServiceController
