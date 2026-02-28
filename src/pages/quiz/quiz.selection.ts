export function quizSelection(
  optionsEl: HTMLElement,
  checkBtn: HTMLButtonElement,
  onSelect: (value: string) => void
): void {
  optionsEl.addEventListener('click', (event) => {
    const target = event.target as HTMLElement

    if (!target.classList.contains('quiz-option')) return

    optionsEl.querySelectorAll('.quiz-option').forEach((btn) => {
      btn.classList.remove('selected')
    })

    target.classList.add('selected')

    checkBtn.disabled = false

    onSelect(target.textContent || '')
  })
}
