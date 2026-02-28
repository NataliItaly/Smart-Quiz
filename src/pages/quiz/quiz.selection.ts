export interface QuizCommonParams {
  optionsEl: HTMLElement
  checkBtn: HTMLButtonElement
  nextBtn: HTMLButtonElement
  tryBtn: HTMLButtonElement
  explainBtn: HTMLButtonElement
}

export function quizSelection(
  optionsEl: HTMLElement,
  checkBtn: HTMLButtonElement,
  onSelect: (value: string) => void
): void {
  optionsEl.addEventListener('click', (event) => {
    const label = (event.target as HTMLElement).closest('.quiz-option')
    if (!label) return

    optionsEl.querySelectorAll('.quiz-option').forEach((el) => {
      el.classList.remove('selected')
    })

    label.classList.add('selected')

    const input = label.querySelector('input') as HTMLInputElement
    input.checked = true

    checkBtn.disabled = false
    onSelect(input.value)
  })
}
