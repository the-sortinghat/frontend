import servicesWithLessCoupling from './index'

describe('servicesWithLessCoupling()', () => {
  const services = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
    { id: 3, name: 'C' },
  ]

  it('returns a message when system has no service', () => {
    const answer = servicesWithLessCoupling([], [])
    const expected = 'The system has no service'
    expect(answer).toBe(expected)
  })

  it('returns a valid answer when system has one service with less coupling', () => {
    const calls = [
      { source: 1 },
      { source: 1 },
      { source: 2 },
      { source: 2 },
      { source: 3 },
    ]
    const answer = servicesWithLessCoupling(services, calls)
    const expected = 'C'
    expect(answer).toBe(expected)
  })

  it('returns a valid answer when system has more than one service with less coupling', () => {
    const calls = [{ source: 1 }, { source: 1 }, { source: 2 }, { source: 3 }]
    const answer = servicesWithLessCoupling(services, calls)
    const expected = 'B, C'
    expect(answer).toBe(expected)
  })
})
