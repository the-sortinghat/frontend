import numberOfDatabases from './index'

describe('numberOfDatabases()', () => {
  it('returns a valid answer when system has no module', () => {
    const answer = numberOfDatabases([])
    const expected = 0
    expect(answer).toBe(expected)
  })

  it('returns a valid answer when system has more than zero modules', () => {
    const answer = numberOfDatabases([
      { numberOfDatabases: 4 },
      { numberOfDatabases: 7 },
      { numberOfDatabases: 1 },
    ])
    const expected = 12
    expect(answer).toBe(expected)
  })
})
