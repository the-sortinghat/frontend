import getModuleData from './index'

describe('getModuleData function', () => {
  let moduleData

  beforeAll(async () => {
    moduleData = await getModuleData('1')
  })

  it('returns a module data with essential properties', () => {
    const keys = [
      'name',
      'responsability',
      'services',
      'databases',
      'operations',
    ]

    expect(Object.keys(moduleData).sort()).toMatchObject(keys.sort())
  })

  it("returns an array of modules' services", () => {
    expect(moduleData.services).toBeInstanceOf(Array)
  })

  it("returns an array of modules' databases", () => {
    expect(moduleData.databases).toBeInstanceOf(Array)
  })

  it("returns an array of modules' operations", () => {
    expect(moduleData.operations).toBeInstanceOf(Array)
  })

  it('returns data with essential properties for each service', () => {
    moduleData.services.forEach((service) => {
      expect(service).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
        })
      )
    })
  })

  it('returns data with essential properties for each database', () => {
    moduleData.databases.forEach((database) => {
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
    moduleData.operations.forEach((operation) => {
      expect(operation).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          serviceId: expect.any(Number),
          label: expect.any(String),
        })
      )
    })
  })
})
