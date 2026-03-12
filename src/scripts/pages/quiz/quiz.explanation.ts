export function quizExplanation(
  explainBtn: HTMLButtonElement,
  explainEl: HTMLElement,
  explanationText: string
): void {
  explainEl.textContent = explanationText

  explainBtn.addEventListener('click', () => {
    explainEl.style.display = 'block'
  })
}