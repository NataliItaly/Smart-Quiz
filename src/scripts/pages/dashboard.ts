import { Router } from '../services/router'
import { renderFiltersForm } from '../components/filters.form'
import { createElement } from '../utils/createElement'
import { renderHeader } from '../components/header'
import { getQuiz } from '../states/questionsState'

export function renderDashboard(
  router: Router,
  setAuth: (value: boolean) => void
): void {
  const dashboard = createElement({
    tag: 'div',
    className: 'dashboard',
    id: 'dashboard'
  })

  // header
  const header = renderHeader()

  const dashboardContent = createElement({
    tag: 'div',
    className: 'dashboard__content',
    id: 'dashboard-content'
  })

  const dashboardTitle = createElement({
    tag: 'h1',
    className: 'dashboard__title',
    id: 'dashboard-title',
    text: 'Dashboard'
  })
  const dashboardQuizBtn = createElement({
    tag: 'button',
    className: 'btn',
    id: 'dashboard-quiz-btn',
    text: `${getQuiz().currentQuestions?.length === 0 ? 'Start New Quiz' : 'Go to Quiz'}`
  })

  // filters form
  const filtersEl = renderFiltersForm()

  dashboardContent.append(dashboardTitle, filtersEl, dashboardQuizBtn)
  dashboard.append(header, dashboardContent)

  const root = document.getElementById('app')!
  root.innerHTML = ''

  root.append(dashboard)

  document.getElementById('stat-btn')!.onclick = (): void => {
    router.navigate('/statistic')
  }

  document.getElementById('logout-btn')!.onclick = (): void => {
    setAuth(false)
    router.navigate('/')
  }

  document.getElementById('dashboard-quiz-btn')!.onclick = (): void => {
    router.navigate('/quiz')
  }
}
