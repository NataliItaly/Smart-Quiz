import { Router } from '../services/router'
import { quizScreen } from '../../pages/quiz/quizScreen'

export async function renderQuiz(router: Router): Promise<void>  {
  const root = document.getElementById('app')
  if (!root) return;

  root.innerHTML = '';

  const quizEl = await quizScreen()
  root.appendChild(quizEl)

  const backBtn = document.createElement('button')
  backBtn.textContent = 'Back'
  backBtn.id = 'backBtn'

  root.appendChild(backBtn)

  backBtn.onclick = (): void => {
    router.navigate('/dashboard')
  }
}
