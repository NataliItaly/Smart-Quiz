import { Question } from './quiz.types'
import { applyUIState, updateUIState, getScore } from './quiz.state'
import { statisticsService } from '../../services/statisticsService'
import { getUser } from '../../states/userState'
import { QuestionsState } from '../../states/questionsState'

export interface QuizNextParams {
  nextBtn: HTMLButtonElement
  questions: Question[]
  container: HTMLElement
  getIndex: () => number
  setIndex: (value: number) => void
  quizRenderQuestion: () => void
  optionsEl: HTMLElement
  checkBtn: HTMLButtonElement
  tryBtn: HTMLButtonElement
  explainBtn: HTMLButtonElement
  explainEl: HTMLElement
}

export function quizNext({
  nextBtn,
  questions,
  getIndex,
  setIndex,
  quizRenderQuestion,
  container,
  optionsEl,
  checkBtn,
  tryBtn,
  explainBtn,
  explainEl
}: QuizNextParams): void {
  nextBtn.addEventListener('click', () => {
    const current = getIndex()
    const next = current + 1

    if (next >= questions.length) {
      const user = getUser();
      const score = getScore();
      const total = questions.length;

      const category = QuestionsState.selectedCategory;
      const level = QuestionsState.selectedLevel;
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

    updateUIState({
      isChecked: false,
      isCorrect: null,
      selectedOption: null,
      showNext: false,
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
