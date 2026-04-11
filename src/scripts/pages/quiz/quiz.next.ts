import { Question } from './quiz.types'
import { applyUIState, updateUIState, getScore } from './quiz.state'
import { statisticsService } from '../../services/statisticsService'
import { getUser } from '../../states/userState'
import { getQuiz } from '../../states/questionsState'
import { setCurrentRoute } from '../../states/routeState'

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
  container: HTMLElement
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
  prevBtn,
  container
}: QuizNextParams): void {
  nextBtn.addEventListener('click', () => {
    const current = getIndex()
    const next = current + 1

// buttons state
prevBtn.disabled = next === 0
nextBtn.disabled = next + 1 >= questions.length

// Check if quiz is completed
if (next >= questions.length) {
  const user = getUser();
  console.log('User in quiz.next:', user); // 👈 ДОБАВЬ ЭТУ СТРОКУ
console.log('User ID:', user.id);        // 👈 И ЭТУ
  const score = getScore();
  const total = questions.length;

  const quizState = getQuiz();
  const category = quizState.selectedCategory;
  const level = quizState.selectedLevel;
  const finalCategory = category || 'JS & TS';
  const finalLevel = level || 'medium';

  statisticsService.saveAttempt({
    userId: user.id,
    score: score,
    total: total,
    category: finalCategory,
    level: finalLevel
  });

  console.log(`quiz completed. score: ${score}/${total}`);

  container.innerHTML = ''
  return
}

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
