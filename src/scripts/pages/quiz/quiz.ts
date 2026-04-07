import { Router } from '../../services/router'
import { quizScreen } from './quiz.screen'
//------------------
import { setIndex, getIndex } from './quiz.state';
import { getQuiz } from '../../states/questionsState';
import { setCurrentRoute, getCurrentRoute } from '../../states/routeState';

let popstateAdded = false
//------------------

export function renderQuiz(router: Router): void  {
  const root = document.getElementById('app')
  if (!root) return;

  root.innerHTML = '';

  const quizEl = quizScreen(router)
  root.appendChild(quizEl)

  const backBtn = document.createElement('button')
  backBtn.textContent = 'Back to Dashboard'
  backBtn.id = 'backBtn'
  backBtn.disabled = getQuiz().selectedMode === 'Exam';

  root.appendChild(backBtn)

  backBtn.onclick = (): void => {
    router.navigate('/dashboard')
  }
const newRoute = getCurrentRoute().split('#')[0]
setCurrentRoute(newRoute)
console.log(getCurrentRoute())
console.log(location.hash)
//(getCurrentRoute().split('#'))
window.location.hash = String(getIndex() + 1)
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
