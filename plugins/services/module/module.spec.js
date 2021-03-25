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
      'numberOfDatabases',
      'numberOfOperations',
    ]

    expect(Object.keys(moduleData).sort()).toMatchObject(keys.sort())
  })

  it("returns an array of modules' services", () => {
    expect(moduleData.services).toBeInstanceOf(Array)
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
})
