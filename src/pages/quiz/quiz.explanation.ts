import { explainationHandler } from '../explain/explaination.handler'
import { Question } from '../../scripts/services/quiz.service'
import { getUIState } from './quiz.state'

export function quizExplanation(
  explainBtn: HTMLButtonElement,
  getCurrentQuestion: () => Question
): void {
  explainBtn.addEventListener('click', () => {
    const currentQuestion = getCurrentQuestion()
    console.log("currentQuestion:", currentQuestion)
    const selectedAnswer = getUIState().selectedOption
    console.log("selectedAnswer:", selectedAnswer)

    if (currentQuestion && selectedAnswer) {
      explainationHandler(currentQuestion, selectedAnswer)
    }
  })
}
