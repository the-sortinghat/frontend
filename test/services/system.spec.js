import { getSystemData } from '../../services'

describe('Get system data from external source', () => {
  test('it returns a valid system data', async () => {
    const keys = ['name', 'description', 'nonFunctionalRequirements', 'modules']
    const systemData = await getSystemData('1')

    expect(Object.keys(systemData).sort()).toMatchObject(keys.sort())
    expect(systemData.modules).toBeInstanceOf(Array)
    systemData.modules.forEach((module) => {
      expect(module).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          responsibility: expect.any(String),
          numberOfDatabases: expect.any(Number),
          numberOfServices: expect.any(Number),
          operations: expect.any(Array),
        })
      )
    })
  })
})
