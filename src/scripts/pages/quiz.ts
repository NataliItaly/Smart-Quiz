import { Router } from '../services/router'
import { quizScreen } from '../../pages/quiz/quizScreen'

export function renderQuiz(router: Router): void {
  const root = document.getElementById('app')!
  root.innerHTML = ''

  const quizEl = quizScreen()
  root.appendChild(quizEl)

  const backBtn = document.createElement('button')
  backBtn.textContent = 'Back'
  backBtn.id = 'backBtn'

  root.appendChild(backBtn)

  backBtn.onclick = (): void => {
    router.navigate('/dashboard')
  }
}
