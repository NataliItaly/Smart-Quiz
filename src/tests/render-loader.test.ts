import { describe, it, expect } from 'vitest'
import { renderLoader } from '../scripts/components.ts/loader'


describe('renderLoader', () => {
  it('should create loader element with correct structure', () => {
    const loader = renderLoader()

    expect(loader).toBeInstanceOf(HTMLElement)
    expect(loader.id).toBe('loader')
    expect(loader.classList.contains('loader')).toBe(true)

    const text = loader.querySelector('#loader-text')
    expect(text).not.toBeNull()
    expect(text?.textContent).toBe('Loading')

    const spinner = loader.querySelector('#loader-spinner')
    expect(spinner).not.toBeNull()
  })
})
