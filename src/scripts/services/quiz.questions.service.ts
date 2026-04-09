import { Router } from './router'
import { getQuiz, updateQuiz } from '../states/questionsState'
import { filterQuestions } from '../utils/filter.questions'
import { renderQuizContainer } from '../pages/quiz/quiz.container'
import { shuffleArray } from '../utils/shuffle.array'
import { examQuestionsQuantity } from '../states/questionsState'

export async function quizQuestionsService(
  container: HTMLElement,
  router: Router
): Promise<void> {
  try {
    const questions = await filterQuestions(
      getQuiz()?.selectedCategory,
      getQuiz()?.selectedLevel
    )

    const shuffledQuestions = shuffleArray(questions)

    // check quiz mode
    const quizMode = getQuiz()?.selectedMode;

    let currentQuestions;
    if (quizMode === 'Exam') {
      currentQuestions = shuffledQuestions.slice(0, examQuestionsQuantity)
    }
    else {
      currentQuestions = shuffledQuestions;
    }

    updateQuiz({ currentQuestions: currentQuestions })
    renderQuizContainer(container, currentQuestions, router)
  } catch (err: unknown) {
    if (err instanceof Error) {
      container.innerHTML = `<p class="error">${err.message}</p>`
    } else {
      container.innerHTML = `<p class="error">Some error was occured</p>`
    }
  }
}
