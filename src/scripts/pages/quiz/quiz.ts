import { Router } from '../../services/router'
import { quizScreen } from './quiz.screen'

export function renderQuiz(router: Router): void  {
  const root = document.getElementById('app')
  if (!root) return;

  root.innerHTML = '';

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
