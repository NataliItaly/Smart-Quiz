import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderFiltersForm } from '../../scripts/components/filters.form'

describe('filters form', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('should create form element', () => {
    const form = renderFiltersForm()

    expect(form).toBeInstanceOf(HTMLFormElement)
    expect(form.id).toBe('filter-form')
  })

  it('should create category and level selects', () => {
    const form = renderFiltersForm()

    const categorySelect = form.querySelector<HTMLSelectElement>('#category')
    const levelSelect = form.querySelector<HTMLSelectElement>('#level')

    expect(categorySelect).not.toBeNull()
    expect(levelSelect).not.toBeNull()
  })

  it('should create correct options for category select', () => {
    const form = renderFiltersForm()

    const category = form.querySelector('#category') as HTMLSelectElement
    const options = category.querySelectorAll('option')

    expect(options.length).toBe(4)

    expect(options[0].textContent).toBe('All')
    expect(options[1].textContent).toBe('HTML')
    expect(options[2].textContent).toBe('CSS & SCSS')
    expect(options[3].textContent).toBe('JS & TS')
  })

  it('should create submit button', () => {
    const form = renderFiltersForm()

    const btn = form.querySelector('#filter-btn')

    expect(btn).toBeTruthy()
    expect(btn?.textContent).toBe('Apply Filters')
  })

  it('should prevent submit when both filters empty', () => {
    const form = renderFiltersForm()
    document.body.appendChild(form)

    const preventDefault = vi.fn()

    const event = new Event('submit')
    Object.defineProperty(event, 'preventDefault', { value: preventDefault })

    form.dispatchEvent(event)

    expect(preventDefault).toHaveBeenCalled()
  })
})
