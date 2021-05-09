import servicesWithGreaterCoupling from './index'

describe('servicesWithGreaterCoupling()', () => {
  const services = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
    { id: 3, name: 'C' },
  ]

  it('returns a message when system has no service', () => {
    const answer = servicesWithGreaterCoupling([], [])
    const expected = 'The system has no service'
    expect(answer).toBe(expected)
  })

  it('returns a valid answer when system has one service with greater coupling', () => {
    const calls = [{ source: 1 }, { source: 1 }, { source: 2 }, { source: 3 }]
    const answer = servicesWithGreaterCoupling(services, calls)
    const expected = 'A'
    expect(answer).toBe(expected)
  })

  it('returns a valid answer when system has more than one service with greater coupling', () => {
    const calls = [{ source: 1 }, { source: 1 }, { source: 2 }, { source: 2 }]
    const answer = servicesWithGreaterCoupling(services, calls)
    const expected = 'A, B'
    expect(answer).toBe(expected)
  })
})
