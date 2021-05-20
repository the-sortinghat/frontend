import databaseWithMostConnections from './index'

describe('databaseWithMostConnections()', () => {
  const base = [
    {
      databaseId: 1,
      serviceId: 1,
      access_type: 'Reading and Writing',
      namespace: 'databaseA',
    },
    {
      databaseId: 1,
      serviceId: 2,
      access_type: 'Reading and Writing',
      namespace: 'databaseA',
    },
    {
      databaseId: 2,
      serviceId: 3,
      access_type: 'Reading and Writing',
      namespace: 'databaseB',
    },
  ]

  it('returns valid answers for reading and writing databases', () => {
    const types = ['reading', 'writing']
    let expected
    let answer
    let relashionships = []

    types.forEach((type, index) => {
      relashionships = [...base]
      answer = databaseWithMostConnections(relashionships, type)
      expected = 'databaseA (2 connections)'
      expect(answer).toBe(expected)

      relashionships[0].access_type = types[(index + 1) % types.length]

      answer = databaseWithMostConnections(relashionships, type)
      expected = 'databaseA, databaseB (1 connections)'
      expect(answer).toBe(expected)

      relashionships[1].access_type = types[(index + 1) % types.length]

      answer = databaseWithMostConnections(relashionships, type)
      expected = 'databaseB (1 connections)'
      expect(answer).toBe(expected)
    })
  })
})
