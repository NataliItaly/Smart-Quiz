export 
function setupCheckLogic(
  optionsEl: HTMLElement,
  checkBtn: HTMLButtonElement,
  nextBtn: HTMLButtonElement,
  correctAnswer: string,
  getSelected: () => string | null
) {
  checkBtn.addEventListener('click', () => {
    const selected = getSelected()
    if (!selected) return

    // подсветка правильного/неправильного
    optionsEl.querySelectorAll('.quiz-option').forEach((btn) => {
      if (btn.textContent === correctAnswer) {
        btn.classList.add('correct')
      } else {
        btn.classList.add('wrong')
      }
    })

    checkBtn.style.display = 'none'
    nextBtn.style.display = 'block'
  })
}
