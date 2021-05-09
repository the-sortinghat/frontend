import modulesSharingDatabases from './index'

describe('modulesSharingDatabases()', () => {
  it('returns a valid answer when system has no database shared', () => {
    const answer = modulesSharingDatabases([
      { databaseId: 1, moduleId: 1 },
      { databaseId: 2, moduleId: 2 },
      { databaseId: 3, moduleId: 3 },
      { databaseId: 4, moduleId: 2 },
      { databaseId: 5, moduleId: 1 },
      { databaseId: 6, moduleId: 4 },
    ])
    const expected = 0
    expect(answer).toBe(expected)
  })

  it('returns a valid answer when system has more than one database shared by modules', () => {
    const answer = modulesSharingDatabases([
      { databaseId: 1, moduleId: 1 },
      { databaseId: 1, moduleId: 2 },
      { databaseId: 1, moduleId: 3 },
      { databaseId: 2, moduleId: 2 },
      { databaseId: 3, moduleId: 1 },
      { databaseId: 3, moduleId: 4 },
    ])
    const expected = 5
    expect(answer).toBe(expected)
  })
})
