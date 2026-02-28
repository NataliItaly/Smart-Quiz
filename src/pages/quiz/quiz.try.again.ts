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
    optionsEl
      .querySelectorAll<HTMLButtonElement>('.quiz-option')
      .forEach((btn) => {
        btn.classList.remove('selected', 'correct', 'wrong')
        btn.disabled = false
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
