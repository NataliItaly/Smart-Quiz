import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render404Page } from '../../scripts/pages/404/404'
import { Router } from '../../scripts/services/router'

describe('render404Page', () => {
  let router: Router
  let app: HTMLElement

  beforeEach(() => {
    app = document.createElement('div')
    app.id = 'app'
    document.body.innerHTML = ''
    document.body.appendChild(app)

    router = {
      navigate: vi.fn()
    } as unknown as Router
  })

  it('should render 404 page HTML', () => {
    render404Page(router)

    expect(app.innerHTML).toContain('<h1>404</h1>')
    expect(app.innerHTML).toContain('<p>Page not found</p>')
    expect(app.querySelector('#back')).not.toBeNull()
  })

  it('should call history.back() if history length > 1 when clicking back', () => {
    render404Page(router)

    // using vi.spyOn allows to avoid changing the real browser history.
    const backSpy = vi.spyOn(history, 'back').mockImplementation(() => {})

    // changing the length of the history
    Object.defineProperty(history, 'length', { value: 2, writable: true })

    const backBtn = document.getElementById('back')!
    backBtn.click()

    expect(backSpy).toHaveBeenCalled()
    expect(router.navigate).not.toHaveBeenCalled()

    backSpy.mockRestore()
  })

  it('should call router.navigate("/") if history length <= 1 when clicking back', () => {
    render404Page(router)

    Object.defineProperty(history, 'length', { value: 1, writable: true })

    const backBtn = document.getElementById('back')!
    backBtn.click()

    expect(router.navigate).toHaveBeenCalledWith('/')
  })
})
