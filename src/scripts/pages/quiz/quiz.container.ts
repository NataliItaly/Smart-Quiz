import { Question } from "./quiz.types";
import { quizRenderQuestion } from "./quiz.render.question";
import { quizSelection } from "./quiz.selection";
import {
  updateUIState,
  applyUIState,
  getIndex,
  setIndex,
  getScore,
  setScore
} from './quiz.state'
import { quizCheck } from "./quiz.check";
import { quizNext } from "./quiz.next";
import { quizTryAgain } from "./quiz.try.again";
import { getQuiz } from "../../states/questionsState";
import { finishQuizPopup } from "../../components.ts/finish.quiz.popup";
import { Router } from "../../services/router";


export function renderQuizContainer(container: HTMLElement, questions: Question[], router: Router): void {
  container.innerHTML = '';

  // render UI inside quiz container
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

  const navBtns = document.createElement('div')
  navBtns.className = 'quiz-nav'

  if (getQuiz().selectedMode === 'Train') {
    const prevQuestionBtn = document.createElement('button')
    prevQuestionBtn.textContent = 'Previous Question'
    prevQuestionBtn.className = 'btn prev-question'

    const nextQuestionBtn = document.createElement('button')
    nextQuestionBtn.textContent = 'Previous Question'
    nextQuestionBtn.className = 'btn next-question'

    navBtns.append(prevQuestionBtn, nextQuestionBtn)
  }
    const finishQuizBtn = document.createElement('button')
    finishQuizBtn.textContent = 'Finish Quiz'
    finishQuizBtn.className = 'btn quiz-finish'

    finishQuizBtn.addEventListener('click', function() {
      const popup = finishQuizPopup(router);
      document.body.append(popup)
    })

    navBtns.append(finishQuizBtn)
    container.append(navBtns)

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

  //quizExplanation(explainBtn, () => questions)
}