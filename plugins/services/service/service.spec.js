import getServiceData from './index'

describe('getServiceData function', () => {
  let serviceData

  beforeAll(async () => {
    serviceData = await getServiceData('1')
  })

  it('returns a service data with essential properties', () => {
    const keys = [
      'name',
      'responsibility',
      'databases',
      'operations',
      'asyncOperations',
      'metrics',
    ]

    expect(Object.keys(serviceData).sort()).toMatchObject(keys.sort())
  })

  it('returns an array of service databases', () => {
    expect(serviceData.databases).toBeInstanceOf(Array)
  })

  it('returns an array of service operations', () => {
    expect(serviceData.operations).toBeInstanceOf(Array)
  })

  it('returns an array of service async operations', () => {
    expect(serviceData.asyncOperations).toBeInstanceOf(Array)
  })

  it('returns an array of service metrics', () => {
    expect(serviceData.metrics).toBeInstanceOf(Array)
  })

  it('returns data with essential properties for each database', () => {
    serviceData.databases.forEach((database) => {
      expect(database).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          model: expect.any(String),
          role: expect.any(String),
          namespace: expect.any(String),
          access_type: expect.any(String),
        })
      )
    })
  })

  it('returns data with essential properties for each operation', () => {
    serviceData.operations.forEach((operation) => {
      expect(operation).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          label: expect.any(String),
        })
      )
    })
  })

  it('returns data with essential properties for each async operation', () => {
    serviceData.asyncOperations.forEach((operation) => {
      expect(operation).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          topic: expect.any(String),
          broker: expect.any(String),
        })
      )
    })
  })

  it('returns data with essential properties for each metric', () => {
    serviceData.metrics.forEach((metric) => {
      expect(metric).toEqual(
        expect.objectContaining({
          metric: expect.any(String),
          measure: expect.objectContaining({
            min: expect.any(Number),
            max: expect.any(Number),
            value: expect.any(Number),
          }),
        })
      )
    })
  })
})
