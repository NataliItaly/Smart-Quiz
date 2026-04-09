import { describe, it, expect, vi } from 'vitest'
import { shuffleArray } from '../scripts/utils/shuffle.array'


describe('shuffleArray', () => {
  const mockData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] as any

  it('should return new array (not mutate original)', () => {
    const result = shuffleArray(mockData)

    expect(result).not.toBe(mockData)
    expect(mockData).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }])
  })

  it('should keep same length', () => {
    const result = shuffleArray(mockData)

    expect(result.length).toBe(mockData.length)
  })

  it('should contain same elements', () => {
    const result = shuffleArray(mockData)

    expect(result).toEqual(expect.arrayContaining(mockData))
    expect(mockData).toEqual(expect.arrayContaining(result))
  })

  it('should shuffle deterministically with mocked Math.random', () => {
    const spy = vi.spyOn(Math, 'random')

    // задаём последовательность
    spy
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.9)
      .mockReturnValueOnce(0.2)

    const arr = [1, 2, 3, 4]
    const result = shuffleArray(arr)

    expect(result).not.toEqual(arr)

    spy.mockRestore()
  })
})
