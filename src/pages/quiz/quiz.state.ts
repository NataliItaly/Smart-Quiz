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
}

const initialUIState: QuizUIState = {
  selectedOption: null,
  isChecked: false,
  showNext: false,
  showTryAgain: false,
  showExplain: false,
  showExplanation: false,
  isCorrect: null
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

   // Check:  show it if the question has not yet been verified.
  checkBtn.style.display = ui.isChecked ? 'none' : 'block'
  checkBtn.disabled = !ui.selectedOption

    // Next: if the question correct
  nextBtn.style.display = ui.showNext ? 'block' : 'none'

    // Try again:if the question not correct
  tryBtn.style.display = ui.showTryAgain ? 'block' : 'none'

   // Explain button: always after check
  explainBtn.style.display = ui.showExplain ? 'block' : 'none'

  // Explanation text: after btn  Explain
  explainEl.style.display = ui.showExplanation ? 'block' : 'none'

}
