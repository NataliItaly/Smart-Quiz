import { QuizCommonParams } from './quiz.selection'

export interface CheckLogicParams extends QuizCommonParams {
  correctAnswer: string
  getSelected: () => string | null
  onResult: (isCorrect: boolean) => void
}

export function quizCheck({
  optionsEl,
  checkBtn,
  nextBtn,
  tryBtn,
  explainBtn,
  correctAnswer,
  getSelected,
  onResult
}: CheckLogicParams): void {
  checkBtn.addEventListener('click', () => {
    const selected = getSelected()
    if (!selected) return

    const isCorrect = selected === correctAnswer

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

    checkBtn.style.display = 'none'

    if (isCorrect) {
      nextBtn.style.display = 'inline-block'
      tryBtn.style.display = 'none'
      explainBtn.style.display = 'none'
    } else {
      nextBtn.style.display = 'none'
      tryBtn.style.display = 'inline-block'
      explainBtn.style.display = 'inline-block'
      explainBtn.disabled = false
    }

    onResult(isCorrect)
  })
}
