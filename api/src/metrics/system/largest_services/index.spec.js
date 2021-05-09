import largestServices from './index'

describe('largestServices()', () => {
  it('returns a message when system has no service', () => {
    const answer = largestServices([])
    const expected = 'The system has no service'
    expect(answer).toBe(expected)
  })

  it('returns a valid answer when system has one largest service', () => {
    const answer = largestServices([
      { name: 'A', numberOfOperations: 4 },
      { name: 'B', numberOfOperations: 7 },
      { name: 'C', numberOfOperations: 1 },
    ])
    const expected = 'B (7 operations)'
    expect(answer).toBe(expected)
  })

  it('returns a valid answer when system has more than one largest service', () => {
    const answer = largestServices([
      { name: 'A', numberOfOperations: 4 },
      { name: 'B', numberOfOperations: 4 },
      { name: 'C', numberOfOperations: 4 },
    ])
    const expected = 'A, B, C (4 operations)'
    expect(answer).toBe(expected)
  })
})
