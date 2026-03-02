import { QuizCommonParams } from './quiz.selection'
import { applyUIState, updateUIState } from './quiz.state'

export interface TryAgainParams extends QuizCommonParams {
  clearSelected: () => void
  explainEl: HTMLElement
}

export function quizTryAgain({
  optionsEl,
  checkBtn,
  nextBtn,
  tryBtn,
  explainBtn,
  clearSelected,
  explainEl
}: TryAgainParams): void {
  tryBtn.addEventListener('click', () => {
    // unblock option
    optionsEl.classList.remove('quiz-locked')
    optionsEl.style.pointerEvents = 'auto'

    optionsEl.style.pointerEvents = 'auto'
    optionsEl.querySelectorAll('.quiz-option').forEach((label) => {
      label.classList.remove('selected', 'correct', 'wrong')
      const input = label.querySelector('input') as HTMLInputElement
      input.checked = false
      input.disabled = false
    })

    clearSelected()

    updateUIState({
      isChecked: false,
      isCorrect: null,
      selectedOption: null,
      showNext: false,
      showTryAgain: false,
      showExplain: false,
      showExplanation: false
    })

    applyUIState({
      checkBtn,
      nextBtn,
      tryBtn,
      explainBtn,
      explainEl
    })
  })
}
