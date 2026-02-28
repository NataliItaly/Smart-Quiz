export function quizTryAgain(
  optionsEl: HTMLElement,
  checkBtn: HTMLButtonElement,
  nextBtn: HTMLButtonElement,
  tryBtn: HTMLButtonElement,
  explainBtn: HTMLButtonElement,
  clearSelected: () => void,
  explainEl: HTMLElement
): void {
  tryBtn.addEventListener('click', () => {
    optionsEl.querySelectorAll('.quiz-option').forEach((btn) => {
      btn.classList.remove('selected', 'correct', 'wrong')
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