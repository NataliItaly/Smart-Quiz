export function setupOptionSelection(
  optionsEl: HTMLElement,
  checkBtn: HTMLButtonElement,
  onSelect: (value: string) => void
): void {
  optionsEl.addEventListener('click', (event) => {
    const target = event.target as HTMLElement

    if (!target.classList.contains('quiz-option')) return

    // снять выделение со всех
    optionsEl.querySelectorAll('.quiz-option').forEach((btn) => {
      btn.classList.remove('selected')
    })

    // выделить выбранный
    target.classList.add('selected')

    // активировать кнопку Check
    checkBtn.disabled = false

    // передать выбранное значение наружу
    onSelect(target.textContent || '')
  })
}
