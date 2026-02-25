import { Router } from '../services/router'
import { QuizScreen } from '../../pages/quiz/QuizScreen'

export function renderQuiz(router: Router) {
  const root = document.getElementById('app')!
  root.innerHTML = ''

  const quizEl = QuizScreen()
  root.appendChild(quizEl)

  const backBtn = document.createElement('button')
  backBtn.textContent = 'Back'
  backBtn.id = 'backBtn'
  backBtn.className = 'btn'
  backBtn.style.marginTop = '20px'

  root.appendChild(backBtn)

  document.getElementById('backBtn')!.onclick = () => {
    router.navigate('/dashboard')
  }
}
