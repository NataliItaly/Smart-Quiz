import '../../css/styles.css'
import { quizService } from '../../scripts/services/quiz.service'
import { quizCheck } from './quiz.check'
import { quizSelection } from './quiz.selection'
import { quizTryAgain } from './quiz.try.again'
import { quizExplanation } from './quiz.explanation'

export async function quizScreen(): Promise<HTMLElement> {
  const questions = await quizService()

  let currentIndex = 0
  let correctCount = 0

  const question = questions[currentIndex]

  const container = document.createElement('div')
  container.className = 'quiz-screen'

  const titelEl = document.createElement('h2')
  titelEl.className = 'quiz-title'
  titelEl.textContent = 'Online test'

  const progressEl = document.createElement('div')
  progressEl.className = 'quiz-progress'
  progressEl.textContent = `Question ${currentIndex + 1} from ${questions.length}`

  const scoreEl = document.createElement('div')
  scoreEl.classList.add('quiz-score')
  scoreEl.textContent = `Score: ${correctCount}`

  const questionEl = document.createElement('div')
  questionEl.textContent = question.question_en
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

  quizSelection(optionsEl, checkBtn, (value) => {
    selectedOption = value
  })

  quizCheck({
    optionsEl,
    checkBtn,
    nextBtn,
    tryBtn,
    explainBtn,
    correctAnswer: question.answer,
    getSelected: () => selectedOption,
    onResult: (isCorrect) => {
      if (isCorrect) {
        correctCount++
        scoreEl.textContent = `Score: ${correctCount}`
      }
    }
  })

quizTryAgain({
  optionsEl,
  checkBtn,
  nextBtn,
  tryBtn,
  explainBtn,
  clearSelected: () => { selectedOption = null },
  explainEl
})

  quizExplanation(explainBtn, explainEl, 'Because 2 + 2 = 4, basic arithmetic.')

  return container
}
