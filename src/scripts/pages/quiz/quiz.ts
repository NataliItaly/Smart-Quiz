import { Router } from '../../services/router'
import { quizScreen } from './quiz.screen'
//------------------
import { setIndex } from './quiz.state';

let popstateAdded = false
//------------------

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

  // restore question from hash
  const hash = location.hash.replace('#', '')
  const index = Number(hash) - 1

  if (!isNaN(index) && index >= 0) {
    setIndex(index)
  }

  // add popstate once
  if (!popstateAdded) {
    window.addEventListener('popstate', () => {
      const hash = location.hash.replace('#', '')
      const index = Number(hash) - 1
      if (!isNaN(index) && index >= 0) {
        setIndex(index)
        renderQuiz(router)  // repeat render with current index
      }
    })
    popstateAdded = true
  }
}
