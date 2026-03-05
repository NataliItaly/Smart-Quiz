import { Question } from '../../scripts/services/quiz.service'
import { applyUIState, getIndex, getScore } from './quiz.state'

export interface QuizRenderParams {
  questions: Question[]
  progressEl: HTMLElement
  scoreEl: HTMLElement
  legend: HTMLElement
  optionsEl: HTMLElement
  checkBtn: HTMLButtonElement
  nextBtn: HTMLButtonElement
  tryBtn: HTMLButtonElement
  explainBtn: HTMLButtonElement
  explainEl: HTMLElement
}

export function quizRenderQuestion({
  questions,
  progressEl,
  scoreEl,
  legend,
  optionsEl,
  checkBtn,
  nextBtn,
  tryBtn,
  explainBtn,
  explainEl
}: QuizRenderParams): void {
  const index = getIndex()
  const correctCount = getScore()
  const question = questions[index]

  progressEl.textContent = `Question ${index + 1} from ${questions.length}`
  scoreEl.textContent = `Score: ${correctCount}`
  legend.textContent = question.question_en

  optionsEl.innerHTML = ''

  //Unlocking options before rendering a new question
  optionsEl.classList.remove('quiz-locked')
  optionsEl.style.pointerEvents = 'auto'

  optionsEl.querySelectorAll('input').forEach((input) => {
    input.disabled = false
  })
  question.options.forEach((opt) => {
    if (!opt) return

    const label = document.createElement('label')
    label.className = 'quiz-option'

    const input = document.createElement('input')
    input.type = 'radio'
    input.name = `question-${index}`
    input.value = opt

    label.appendChild(input)
    label.append(opt)

    optionsEl.appendChild(label)
  })
  applyUIState({ checkBtn, nextBtn, tryBtn, explainBtn, explainEl })
}
