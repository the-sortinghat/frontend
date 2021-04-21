import { serviceMetrics } from '../metrics/service'
import {
  getDatabases,
  getRelashionshipsServiceDatabase,
  getServices,
} from '../services'

class ServiceController {
  static async find(req, res) {
    const id = parseInt(req.params.id)

    const allServices = await getServices()

    const allDatabases = await getDatabases()

    const { name, responsibility, operations } = allServices.find(
      (s) => s.id === id
    )

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

    const syncOperations = operations.map((op, index) => ({
      id: index + 1,
      name: op,
    }))

    const metrics = serviceMetrics(id, allServices)

    const response = {
      name,
      responsibility,
      databases,
      syncOperations,
      asyncOperations: [],
      metrics,
    }

    return res.status(200).json(response)
  }
}

export default ServiceController
