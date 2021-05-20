import smallestServices from './index'

describe('smallestServices()', () => {
  it('returns a message when system has no service', () => {
    const answer = smallestServices([])
    const expected = 'The system has no service'
    expect(answer).toBe(expected)
  })

  it('returns a valid answer when system has one smallest service', () => {
    const answer = smallestServices([
      { name: 'A', numberOfOperations: 4 },
      { name: 'B', numberOfOperations: 7 },
      { name: 'C', numberOfOperations: 1 },
    ])
    const expected = 'C (1 operations)'
    expect(answer).toBe(expected)
  })

  it('returns a valid answer when system has more than one smallest service', () => {
    const answer = smallestServices([
      { name: 'A', numberOfOperations: 1 },
      { name: 'B', numberOfOperations: 1 },
      { name: 'C', numberOfOperations: 1 },
    ])
    const expected = 'A, B, C (1 operations)'
    expect(answer).toBe(expected)
  })
})
