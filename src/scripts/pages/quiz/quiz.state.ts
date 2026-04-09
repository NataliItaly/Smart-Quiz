import { getQuiz } from "../../states/questionsState"

// -----------------------------
// UI STATE
// -----------------------------

export interface QuizUIState {
  selectedOption: string | null
  isChecked: boolean
  showNext: boolean
  showTryAgain: boolean
  showExplain: boolean
  showExplanation: boolean
  isCorrect: boolean | null
  locked: boolean
}

const initialUIState: QuizUIState = {
  selectedOption: null,
  isChecked: false,
  showNext: getQuiz().selectedMode === 'Exam',
  showTryAgain: false,
  showExplain: false,
  showExplanation: false,
  isCorrect: null,
  locked: false
}

let uiState: QuizUIState = { ...initialUIState }

export function getUIState(): QuizUIState {
  return uiState
}

export function updateUIState(patch: Partial<QuizUIState>): void {
  uiState = { ...uiState, ...patch }
}

export function resetUIState(): void {
  uiState = { ...initialUIState }
}

// -----------------------------
// QUIZ PROGRESS STATE
// -----------------------------

let currentIndex = 0
let currentScore = 0

export function getIndex(): number {
  return currentIndex
}

export function setIndex(value: number): void {
  currentIndex = value
}

export function getScore(): number {
  return currentScore
}

export function setScore(value: number): void {
  currentScore = value
}

export function resetState(): void {
  currentIndex = 0
  currentScore = 0
}

// -----------------------------
// APPLY UI STATE TO DOM
// -----------------------------

export function applyUIState({
  checkBtn,
  nextBtn,
  tryBtn,
  explainBtn,
  explainEl
}: {
  checkBtn: HTMLButtonElement
  nextBtn: HTMLButtonElement
  tryBtn: HTMLButtonElement
  explainBtn: HTMLButtonElement
  explainEl: HTMLElement
}): void {

  const ui = getUIState()

  // -----------------------------
  // STRICT LOCK MODE
  // -----------------------------
  // if (ui.locked) {
  //   // скрываем всё, кроме Try again
  //   checkBtn.classList.add('hidden')
  //   nextBtn.classList.add('hidden')
  //   explainBtn.classList.add('hidden')
  //   explainEl.classList.add('hidden')

  //   // Try again — единственная доступная кнопка
  //   tryBtn.classList.remove('hidden')
  //   tryBtn.disabled = false

  //   return
  // }

  // -----------------------------
  // NORMAL QUIZ MODE
  // -----------------------------

   // Check:  show it if the question has not yet been verified.
  checkBtn.style.display = ui.isChecked ? 'none' : 'block'
  checkBtn.disabled = !ui.selectedOption

    // Next: if the question correct
  nextBtn.style.display = (getQuiz().selectedMode === 'Train' || ui.isChecked) ? 'block' : 'none' //ui.showNext ? 'block' : 'none'

    // Try again:if the question not correct
  tryBtn.style.display = ui.showTryAgain ? 'block' : 'none'

   // Explain button: always after check
  explainBtn.style.display = ui.showExplain ? 'block' : 'none'

  // Explanation text: after btn  Explain
  explainEl.style.display = ui.showExplanation ? 'block' : 'none'

   // -----------------------------
  // NORMAL QUIZ MODE
  // -----------------------------

  // // Check
  // checkBtn.classList.toggle('hidden', ui.isChecked)
  // checkBtn.disabled = !ui.selectedOption

  // // Next
  // nextBtn.classList.toggle('hidden', !ui.showNext)

  // // Try again
  // tryBtn.classList.toggle('hidden', !ui.showTryAgain)

  // // Explain button
  // explainBtn.classList.toggle('hidden', !ui.showExplain)

  // // Explanation text
  // explainEl.classList.toggle('hidden', !ui.showExplanation)

}



export function applyPrevUIState({
  checkBtn,
  prevBtn,
  tryBtn,
  explainBtn,
  explainEl
}: {
  checkBtn: HTMLButtonElement
  prevBtn: HTMLButtonElement
  tryBtn: HTMLButtonElement
  explainBtn: HTMLButtonElement
  explainEl: HTMLElement
}): void {
  const ui = getUIState()

  // -----------------------------
  // STRICT LOCK MODE
  // -----------------------------
  // if (ui.locked) {
  //   // скрываем всё, кроме Try again
  //   checkBtn.classList.add('hidden')
  //   nextBtn.classList.add('hidden')
  //   explainBtn.classList.add('hidden')
  //   explainEl.classList.add('hidden')

  //   // Try again — единственная доступная кнопка
  //   tryBtn.classList.remove('hidden')
  //   tryBtn.disabled = false

  //   return
  // }

  // -----------------------------
  // NORMAL QUIZ MODE
  // -----------------------------

  // Check:  show it if the question has not yet been verified.
  checkBtn.style.display = ui.isChecked ? 'none' : 'block'
  checkBtn.disabled = !ui.selectedOption

  // Next: if the question correct
  prevBtn.style.display =
    getQuiz().selectedMode === 'Train' ? 'block' : 'none' //ui.showNext ? 'block' : 'none'

  // Try again:if the question not correct
  tryBtn.style.display = ui.showTryAgain ? 'block' : 'none'

  // Explain button: always after check
  explainBtn.style.display = ui.showExplain ? 'block' : 'none'

  // Explanation text: after btn  Explain
  explainEl.style.display = ui.showExplanation ? 'block' : 'none'

  // -----------------------------
  // NORMAL QUIZ MODE
  // -----------------------------

  // // Check
  // checkBtn.classList.toggle('hidden', ui.isChecked)
  // checkBtn.disabled = !ui.selectedOption

  // // Next
  // nextBtn.classList.toggle('hidden', !ui.showNext)

  // // Try again
  // tryBtn.classList.toggle('hidden', !ui.showTryAgain)

  // // Explain button
  // explainBtn.classList.toggle('hidden', !ui.showExplain)

  // // Explanation text
  // explainEl.classList.toggle('hidden', !ui.showExplanation)
}
