import { Question } from '../../scripts/services/quiz.service'
//import { resetUIState, updateUIState } from './quiz.state'

export interface QuizNextParams {
  nextBtn: HTMLButtonElement
  questions: Question[]
  container: HTMLElement
  getIndex: () => number
  setIndex: (value: number) => void
  quizRenderQuestion: () => void
  optionsEl: HTMLElement
  //quizSelection: (optionsEl: HTMLElement, cb: (v: string) => void) => void
}

export function quizNext({
  nextBtn,
  questions,
  getIndex,
  setIndex,
  quizRenderQuestion,
  container,
 // optionsEl
  //quizSelection
}: QuizNextParams): void {
  nextBtn.addEventListener('click', () => {
    const current = getIndex()
    const next = current + 1

    if (next >= questions.length) {
      container.innerHTML = ''
      return
    }

    setIndex(next)

    //resetUIState()

    quizRenderQuestion()

    // quizSelection(optionsEl, (value: string) => {
    //   updateUIState({ selectedOption: value })
    // })
  })
}
