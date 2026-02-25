import { Router } from '../services/router'
import { QuizScreen } from '../../pages/quiz/QuizScreen'

export function renderQuiz(router: Router): void {
  const root = document.getElementById('app')!
  root.innerHTML = ''

  const quizEl = QuizScreen()
  root.appendChild(quizEl)

  const backBtn = document.createElement('button')
  backBtn.textContent = 'Back'
  backBtn.id = 'backBtn'

  root.appendChild(backBtn)

  backBtn.onclick = (): void => {
    router.navigate('/dashboard')
  }
}
