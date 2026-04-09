import { explainationHandler } from '../explain/explaination.handler'
import { Question } from '../quiz/quiz.types'
import { getUIState } from './quiz.state'

export function quizExplanation(
  explainBtn: HTMLButtonElement,
  getCurrentQuestion: () => Question
): void {
  explainBtn.addEventListener('click', () => {
    const currentQuestion = getCurrentQuestion()

    const selectedAnswer = getUIState().selectedOption

    if (currentQuestion && selectedAnswer) {
      void explainationHandler(currentQuestion, selectedAnswer)
    }
  })
}
