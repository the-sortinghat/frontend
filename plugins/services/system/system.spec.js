import getSystemData from './index'

describe('getSystemData function', () => {
  let systemData

  beforeAll(async () => {
    systemData = await getSystemData('1', {
      $get: jest.fn((_) =>
        Promise.resolve({
          name: undefined,
          description: undefined,
          nonFunctionalRequirements: [],
          modules: [],
          metrics: [],
        })
      ),
    })
  })

  it('returns a system data with essential properties', () => {
    const keys = [
      'name',
      'description',
      'nonFunctionalRequirements',
      'modules',
      'metrics',
    ]

    expect(Object.keys(systemData).sort()).toMatchObject(keys.sort())
  })

  it("returns an array of system's modules", () => {
    expect(systemData.modules).toBeInstanceOf(Array)
  })

  it("returns an array of system's metrics", () => {
    expect(systemData.metrics).toBeInstanceOf(Array)
  })

  it('returns data with essential properties for each module', () => {
    systemData.modules.forEach((module) => {
      expect(module).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
        })
      )
    })
  })

  it('returns data with essential properties for each metric', () => {
    systemData.metrics.forEach((metric) => {
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
