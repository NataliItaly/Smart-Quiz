import './quizScreen.css'
import { quizService, type QuizData } from '../../scripts/services/quiz.service'
import { setupCheckLogic } from '../logic/quizCheck'
import { setupOptionSelection } from '../logic/quizSelection'
import { setupTryAgainLogic } from '../logic/quizTryAgain'
import { setupExplainLogic } from '../logic/quizExplanation'

export async function quizScreen(): Promise<HTMLElement> {
  const data = await quizService() as unknown as QuizData

  const questions = data.quiz["CSS & SCSS"].easy


  let currentIndex = 0
  let correctCount = 0

  const question = questions[currentIndex]
  console.log(question)


  const container = document.createElement('div')
  container.className = 'quiz-screen'

  const titelEl = document.createElement('h2')
  titelEl.className = 'quiz-title'
  titelEl.textContent = 'Online test'

  const progressEl = document.createElement('div')
  progressEl.className = 'quiz-progress'
  progressEl.textContent = `Вопрос ${currentIndex + 1} из ${questions.length}`

  const scoreEl = document.createElement('div')
  scoreEl.classList.add('quiz-score')
  scoreEl.textContent = `Score: ${correctCount}`

  const questionEl = document.createElement('div')
  questionEl.textContent = question.question_ru
  questionEl.className = 'quiz-question'

  const optionsEl = document.createElement('div')
  optionsEl.className = 'quiz-options'

  question.options.forEach((opt: string | null) => {
    const btn = document.createElement('button')
    btn.className = 'quiz-option'
    btn.textContent = opt
    optionsEl.appendChild(btn)
  })

  const checkBtn = document.createElement('button')
  checkBtn.textContent = 'Check'
  checkBtn.className = 'btn quiz-check'

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

  container.append(
    titelEl,
    progressEl,
    scoreEl,
    questionEl,
    optionsEl,
    checkBtn,
    nextBtn,
    tryBtn,
    explainBtn,
    explainEl
  )

  let selectedOption: string | null = null

  setupOptionSelection(optionsEl, checkBtn, (value) => {
    selectedOption = value
  })

  setupCheckLogic(
    optionsEl,
    checkBtn,
    nextBtn,
    tryBtn,
    explainBtn,
    question.answer,
    () => selectedOption,
    (isCorrect) => {
      if (isCorrect) {
        correctCount++
        scoreEl.textContent = `Score: ${correctCount}`
      }
    }
  )

  setupTryAgainLogic(
    optionsEl,
    checkBtn,
    nextBtn,
    tryBtn,
    explainBtn,
    () => {
      selectedOption = null
    },
    explainEl
  )

  setupExplainLogic(
    explainBtn,
    explainEl,
    'Because 2 + 2 = 4, basic arithmetic.'
  )

  return container
}
