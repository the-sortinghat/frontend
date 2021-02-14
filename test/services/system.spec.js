import { getSystemData } from '../../services'

describe('Get system data from external source', () => {
  test('it returns a valid system data', async () => {
    const keys = [
      'name',
      'description',
      'nonFunctionalRequirements',
      'modules',
      'metrics',
    ]
    const systemData = await getSystemData('1')

    expect(Object.keys(systemData).sort()).toMatchObject(keys.sort())
    expect(systemData.modules).toBeInstanceOf(Array)
    expect(systemData.metrics).toBeInstanceOf(Array)

    systemData.modules.forEach((module) => {
      expect(module).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
        })
      )
    })

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
