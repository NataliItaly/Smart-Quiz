import { Question } from './quiz.types'
import { applyPrevUIState, updateUIState } from './quiz.state'
import { setCurrentRoute } from '../../states/routeState'
import { getQuiz } from '../../states/questionsState'

export interface QuizPrevParams {
  prevBtn: HTMLButtonElement
  questions: Question[]
  getIndex: () => number
  setIndex: (value: number) => void
  quizRenderQuestion: () => void
  optionsEl: HTMLElement
  checkBtn: HTMLButtonElement
  tryBtn: HTMLButtonElement
  explainBtn: HTMLButtonElement
  explainEl: HTMLElement
  nextBtn: HTMLButtonElement
}

export function quizPrev({
  prevBtn,
  questions,
  getIndex,
  setIndex,
  quizRenderQuestion,
  optionsEl,
  checkBtn,
  tryBtn,
  explainBtn,
  explainEl,
  nextBtn
}: QuizPrevParams): void {
  prevBtn.addEventListener('click', () => {
    const current = getIndex()
    const prev = current - 1
    
    prevBtn.disabled = prev === 0
    nextBtn.disabled = current >= questions.length

    setIndex(prev)
    setCurrentRoute(`/quiz#${prev}`)

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

    applyPrevUIState({
      checkBtn,
      prevBtn,
      tryBtn,
      explainBtn,
      explainEl
    })
  })
}
