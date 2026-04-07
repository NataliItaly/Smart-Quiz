import { applyPrevUIState, updateUIState } from './quiz.state'
import { setCurrentRoute } from '../../states/routeState'
import { getQuiz } from '../../states/questionsState'

export interface QuizPrevParams {
  prevBtn: HTMLButtonElement
  getIndex: () => number
  setIndex: (value: number) => void
  quizRenderQuestion: () => void
  optionsEl: HTMLElement
  checkBtn: HTMLButtonElement
  tryBtn: HTMLButtonElement
  explainBtn: HTMLButtonElement
  explainEl: HTMLElement
}

export function quizPrev({
  prevBtn,
  getIndex,
  setIndex,
  quizRenderQuestion,
  optionsEl,
  checkBtn,
  tryBtn,
  explainBtn,
  explainEl
}: QuizPrevParams): void {
  prevBtn.addEventListener('click', () => {
    const current = getIndex()
    const prev = current - 1

    if (prev <= 1) {
      prevBtn.disabled = true;
      return
    }

    setIndex(prev)
    setCurrentRoute(`/quiz#${prev - 1}`)

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
