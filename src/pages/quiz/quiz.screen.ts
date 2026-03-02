import '../../css/styles.css'
import { quizCheck } from './quiz.check'
import { quizSelection } from './quiz.selection'
import { quizTryAgain } from './quiz.try.again'
import { quizExplanation } from './quiz.explanation'
import { quizNext } from './quiz.next'
import {
  getIndex,
  setIndex,
  getScore,
  setScore,
  updateUIState,
  applyUIState
} from './quiz.state'
import { quizRenderQuestion } from './quiz.render.question'
import { quizService } from '../../scripts/services/quiz.service'

export async function quizScreen(): Promise<HTMLElement> {
  const questions = await quizService()

  const container = document.createElement('div')
  container.className = 'quiz-screen'

  const titelEl = document.createElement('h2')
  titelEl.className = 'quiz-title'
  titelEl.textContent = 'Online test'

  const progressEl = document.createElement('div')
  progressEl.className = 'quiz-progress'

  const scoreEl = document.createElement('div')
  scoreEl.classList.add('quiz-score')

  const fieldset = document.createElement('fieldset')
  fieldset.className = 'quiz-fieldset'

  const legend = document.createElement('legend')
  legend.className = 'quiz-question'

  fieldset.appendChild(legend)

  const optionsEl = document.createElement('div')
  optionsEl.className = 'quiz-options'

  fieldset.appendChild(optionsEl)

  const checkBtn = document.createElement('button')
  checkBtn.textContent = 'Check'
  checkBtn.className = 'btn quiz-check'
  checkBtn.disabled = true

  const nextBtn = document.createElement('button')
  nextBtn.textContent = 'Next'
  nextBtn.className = 'btn quiz-next'
  nextBtn.style.display = 'none'

  const tryBtn = document.createElement('button')
  tryBtn.textContent = 'Try again'
  tryBtn.className = 'btn quiz-try'
  tryBtn.style.display = 'none'

  const explainBtn = document.createElement('button')
  explainBtn.textContent = 'Explain'
  explainBtn.className = 'btn quiz-explain'
  explainBtn.style.display = 'none'

  const explainEl = document.createElement('p')
  explainEl.className = 'quiz-explanation'
  explainEl.style.display = 'none'

  quizRenderQuestion({
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
  })

  container.append(
    titelEl,
    progressEl,
    scoreEl,
    fieldset,
    checkBtn,
    nextBtn,
    tryBtn,
    explainBtn,
    explainEl
  )

  quizSelection(optionsEl, (value) => {
    updateUIState({ selectedOption: value })

    applyUIState({
      checkBtn,
      nextBtn,
      tryBtn,
      explainBtn,
      explainEl
    })
  })

  quizCheck({
    optionsEl,
    checkBtn,
    nextBtn,
    tryBtn,
    explainBtn,
    explainEl,
    getCorrectAnswer: () => questions[getIndex()].answer,
    onResult: (isCorrect) => {
      if (isCorrect) {
        setScore(getScore() + 1)
        scoreEl.textContent = `Score: ${getScore()}`
      }
    }
  })

  quizNext({
    nextBtn,
    questions,
    getIndex,
    setIndex,
    quizRenderQuestion: () =>
      quizRenderQuestion({
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
      }),
    container,
    optionsEl,
    checkBtn,
    tryBtn,
    explainBtn,
    explainEl
  })

  quizTryAgain({
    optionsEl,
    checkBtn,
    nextBtn,
    tryBtn,
    explainBtn,
    clearSelected: () => updateUIState({ selectedOption: null }),
    explainEl
  })

  quizExplanation(explainBtn, explainEl, 'Because 2 + 2 = 4, basic arithmetic.')

  return container
}
