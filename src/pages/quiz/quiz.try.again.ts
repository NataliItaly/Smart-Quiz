import { QuizCommonParams } from './quiz.selection'

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
    optionsEl.classList.remove('quiz-locked')

    optionsEl.style.pointerEvents = 'auto'
    optionsEl.querySelectorAll('.quiz-option').forEach((label) => {
      label.classList.remove('selected', 'correct', 'wrong')
      const input = label.querySelector('input') as HTMLInputElement
      input.checked = false
      input.disabled = false
    })

    clearSelected()

    checkBtn.style.display = 'inline-block'
    checkBtn.disabled = true

    tryBtn.style.display = 'none'
    nextBtn.style.display = 'none'

    explainBtn.style.display = 'none'
    explainBtn.disabled = true
    explainEl.style.display = 'none'
  })
}
