interface CheckLogicParams {
  optionsEl: HTMLElement
  checkBtn: HTMLButtonElement
  nextBtn: HTMLButtonElement
  tryBtn: HTMLButtonElement
  explainBtn: HTMLButtonElement
  correctAnswer: string
  getSelected: () => string | null
  onResult: (isCorrect: boolean) => void
}

// export function setupCheckLogic(
//   optionsEl: HTMLElement,
//   checkBtn: HTMLButtonElement,
//   nextBtn: HTMLButtonElement,
//   tryAgainBtn: HTMLButtonElement,
//   explainBtn: HTMLButtonElement,
//   correctAnswer: string,
//   getSelected: () => string | null,
//   onResult: (isCorrect: boolean) => void
// ): void {
//   checkBtn.addEventListener('click', () => {
//     const selected = getSelected()
//     if (!selected) return

//     let isCorrect = false

//     optionsEl.querySelectorAll('.quiz-option').forEach((btn) => {
//       const text = btn.textContent || ''
//       if (text === correctAnswer) {
//         btn.classList.add('correct')
//         if (text === selected) {
//           isCorrect = true
//         }
//       } else if (text === selected) {
//         btn.classList.add('wrong')
//       }
//     })

//     checkBtn.style.display = 'none'
//     explainBtn.style.display = 'inline-block'
//     explainBtn.disabled = false

//     if (isCorrect) {
//       nextBtn.style.display = 'inline-block'
//       tryAgainBtn.style.display = 'none'
//     } else {
//       tryAgainBtn.style.display = 'inline-block'
//       nextBtn.style.display = 'none'
//     }

//     onResult(isCorrect)
//   })
// }

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
        const text = btn.textContent || ''

        if (text === selected) {
          btn.classList.add(isCorrect ? 'correct' : 'wrong')
        }

        btn.disabled = true
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
