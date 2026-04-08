import { Question } from './quiz.types'
import { applyUIState, updateUIState } from './quiz.state'
import { setCurrentRoute } from '../../states/routeState'
import { getQuiz } from '../../states/questionsState'

export interface QuizNextParams {
  nextBtn: HTMLButtonElement
  questions: Question[]
  getIndex: () => number
  setIndex: (value: number) => void
  quizRenderQuestion: () => void
  optionsEl: HTMLElement
  checkBtn: HTMLButtonElement
  tryBtn: HTMLButtonElement
  explainBtn: HTMLButtonElement
  explainEl: HTMLElement
  prevBtn: HTMLButtonElement
}

export function quizNext({
  nextBtn,
  questions,
  getIndex,
  setIndex,
  quizRenderQuestion,
  optionsEl,
  checkBtn,
  tryBtn,
  explainBtn,
  explainEl,
  prevBtn
}: QuizNextParams): void {
  nextBtn.addEventListener('click', () => {
    const current = getIndex()
    const next = current + 1

    prevBtn.disabled = next === 0
    nextBtn.disabled = next + 1 >= questions.length

    setIndex(next)
    setCurrentRoute(`/quiz#${next + 1}`)

    updateUIState({
      isChecked: false,
      isCorrect: null,
      selectedOption: null,
      showNext: getQuiz().selectedMode === 'Train',
      showTryAgain: false,
      showExplain: false,
      showExplanation: false
    })

    // unlock option
    optionsEl.classList.remove('quiz-locked')
    optionsEl.style.pointerEvents = 'auto'
    optionsEl.querySelectorAll('input').forEach((input) => {
      input.disabled = false
      input.checked = false
    })

    quizRenderQuestion()

    applyUIState({
      checkBtn,
      nextBtn,
      tryBtn,
      explainBtn,
      explainEl
    })
  })
}
