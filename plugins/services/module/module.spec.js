import getModuleData from './index'

describe('getModuleData()', () => {
  let moduleData

  beforeAll(async () => {
    moduleData = await getModuleData('1', {
      $get: jest
        .fn()
        .mockReturnValueOnce(
          Promise.resolve({
            name: undefined,
            responsibility: undefined,
          })
        )
        .mockReturnValueOnce(
          Promise.resolve({
            services: [
              { id: 1, name: '' },
              { id: 2, name: '' },
            ],
            links: [{ source: 1, target: 2, type: 'async' }],
          })
        )
        .mockReturnValueOnce(
          Promise.resolve([
            { metric: '', measure: { min: 0, max: 1, value: 0 } },
          ])
        ),
    })
  })

  it('returns module data with essential properties', () => {
    const keys = ['name', 'responsibility', 'services', 'links', 'metrics']

    expect(Object.keys(moduleData).sort()).toMatchObject(keys.sort())
  })

  it("returns an array of module's services", () => {
    expect(moduleData.services).toBeInstanceOf(Array)
  })

  it("returns an array of module's links", () => {
    expect(moduleData.links).toBeInstanceOf(Array)
  })

  it("returns an array of module's metrics", () => {
    expect(moduleData.metrics).toBeInstanceOf(Array)
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

  it('returns data with essential properties for each link', () => {
    moduleData.links.forEach((link) => {
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
    moduleData.metrics.forEach((metric) => {
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
