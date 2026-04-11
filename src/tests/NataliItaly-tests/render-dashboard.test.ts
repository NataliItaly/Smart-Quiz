import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderDashboard } from '../../scripts/pages/dashboard'

vi.mock('../../scripts/states/userState', () => ({
  getUser: () => ({ name: 'John' })
}))

vi.mock('../../scripts/states/questionsState', () => ({
  getQuiz: () => ({ currentQuestions: [] })
}))

vi.mock('../../scripts/components/filters.form', () => ({
  renderFiltersForm: () => {
    const el = document.createElement('div')
    el.id = 'filters'
    return el
  }
}))

describe('renderDashboard', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    vi.clearAllMocks()
  })

  it('should render dashboard with user name', () => {
    const router = { navigate: vi.fn() }
    const setAuth = vi.fn()

    renderDashboard(router as any, setAuth)

    expect(document.getElementById('dashboard')).not.toBeNull()
    expect(document.getElementById('header-greeting')?.textContent).toBe(
      'Welcome John'
    )
  })

  it('should call setAuth(false) and navigate on logout click', () => {
    const router = { navigate: vi.fn() }
    const setAuth = vi.fn()

    renderDashboard(router as any, setAuth)

    document.getElementById('logout-btn')!.click()

    expect(setAuth).toHaveBeenCalledWith(false)
    expect(router.navigate).toHaveBeenCalledWith('/')
  })

  it('should navigate to quiz on button click', () => {
    const router = { navigate: vi.fn() }
    const setAuth = vi.fn()

    renderDashboard(router as any, setAuth)

    document.getElementById('dashboard-quiz-btn')!.click()

    expect(router.navigate).toHaveBeenCalledWith('/quiz')
  })

  it('should show "Start New Quiz" if no questions', () => {
    const router = { navigate: vi.fn() }
    const setAuth = vi.fn()

    renderDashboard(router as any, setAuth)

    expect(document.getElementById('dashboard-quiz-btn')?.textContent).toBe(
      'Start New Quiz'
    )
  })
})
