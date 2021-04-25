import getSystemData from './index'

describe('getSystemData function', () => {
  let systemData

  beforeAll(async () => {
    systemData = await getSystemData('1', {
      $get: jest
        .fn()
        .mockReturnValueOnce(
          Promise.resolve({
            name: undefined,
            description: undefined,
            nonFunctionalRequirements: [],
          })
        )
        .mockReturnValueOnce(
          Promise.resolve({
            modules: [
              { id: 1, name: '' },
              { id: 2, name: '' },
            ],
            links: [{ source: 1, target: 2, type: 'sync' }],
          })
        )
        .mockReturnValueOnce(
          Promise.resolve([
            { metric: '', measure: { min: 0, max: 1, value: 1 } },
          ])
        ),
    })
  })

  it('returns a system data with essential properties', () => {
    const keys = [
      'name',
      'description',
      'nonFunctionalRequirements',
      'modules',
      'links',
      'metrics',
    ]

    expect(Object.keys(systemData).sort()).toMatchObject(keys.sort())
  })

  it("returns an array of system's modules", () => {
    expect(systemData.modules).toBeInstanceOf(Array)
  })

  it("returns an array of modules's links", () => {
    expect(systemData.links).toBeInstanceOf(Array)
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

  it('returns data with essential properties for each link', () => {
    systemData.links.forEach((link) => {
      expect(link).toEqual(
        expect.objectContaining({
          source: expect.any(Number),
          target: expect.any(Number),
          type: expect.any(String),
        })
      )
      expect(['sync', 'async']).toContain(link.type)
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
