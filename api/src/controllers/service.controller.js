import { serviceMetrics } from '../metrics/service'
import {
  getDatabases,
  getRelashionshipsServiceDatabase,
  getServiceCommunication,
  getServices,
} from '../services'

class ServiceController {
  static async find(req, res) {
    const id = parseInt(req.params.id)

    const allServices = await getServices()

    const allDatabases = await getDatabases()

    const allLinks = await getServiceCommunication()

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

    const asyncOperations = allLinks
      .filter(
        (link) =>
          link.type === 'async' && (id === link.source || id === link.target)
      )
      .map(({ source, target, label }) => ({
        label,
        publisherId: source,
        subscriberId: target,
      }))

    const response = {
      name,
      responsibility,
      databases,
      syncOperations,
      asyncOperations,
    }

    return res.status(200).json(response)
  }

  static async getMetrics(req, res) {
    const id = parseInt(req.params.id)

    const allServices = await getServices()

    const metrics = serviceMetrics(id, allServices)

    return res.status(200).json(metrics)
  }
}

export default ServiceController
