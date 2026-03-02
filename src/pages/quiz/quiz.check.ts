import { QuizCommonParams } from './quiz.selection'
import { applyUIState, getUIState, updateUIState } from './quiz.state'

export interface CheckLogicParams extends QuizCommonParams {
  optionsEl: HTMLElement
  explainEl: HTMLElement
  getCorrectAnswer: () => string
  onResult: (isCorrect: boolean) => void
}

export function quizCheck({
  optionsEl,
  checkBtn,
  nextBtn,
  tryBtn,
  explainBtn,
  explainEl,
  getCorrectAnswer,
  onResult
}: CheckLogicParams): void {
  checkBtn.addEventListener('click', () => {
    const selected = getUIState().selectedOption

    if (!selected) return

    const isCorrect = selected === getCorrectAnswer()

    optionsEl.querySelectorAll('.quiz-option').forEach((btn) => {
      btn.classList.remove('correct', 'wrong')
    })

    optionsEl
      .querySelectorAll<HTMLButtonElement>('.quiz-option')
      .forEach((btn) => {
        const input = btn.querySelector('input') as HTMLInputElement
        const value = input.value

        if (value === selected) {
          btn.classList.add(isCorrect ? 'correct' : 'wrong')
        }

        input.disabled = true
      })

    updateUIState({
      isChecked: true,
      isCorrect,
      showNext: isCorrect,
      showTryAgain: !isCorrect,
      showExplain: true,
      showExplanation: false
    })

    applyUIState({
      checkBtn,
      nextBtn,
      tryBtn,
      explainBtn,
      explainEl
    })

    optionsEl.classList.add('quiz-locked')
console.log("selected:", selected)
console.log("correct:", getCorrectAnswer())
console.log("equal:", selected === getCorrectAnswer())
    optionsEl.style.pointerEvents = 'none'
    onResult(isCorrect)
  })
}
