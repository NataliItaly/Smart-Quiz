import { Router } from '../../services/router'
import { getQuiz } from '../../states/questionsState'
import { renderLoader } from '../../components/loader'
import { renderQuizContainer } from './quiz.container'
import { quizQuestionsService } from '../../services/quiz.questions.service'

export function quizScreen(router: Router): HTMLElement {
  const container = document.createElement('div')
  container.className = 'quiz-screen'

  const currentQuestionsFromState = getQuiz()?.currentQuestions

  if (currentQuestionsFromState && currentQuestionsFromState.length > 0) {
    renderQuizContainer(container, currentQuestionsFromState, router)
    return container
  }

  const loader = renderLoader()
  container.append(loader)

  void quizQuestionsService(container, router)

  return container
}
