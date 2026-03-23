import '../../../css/styles.css';
import { renderLoader } from '../../components.ts/loader';
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
import { filterQuestions } from '../../utils/filter.questions';
import { QuestionsState } from '../../states/questionsState';


export function quizScreen(): HTMLElement {
  //QuestionsState.currentQuestions.length > 0 ? QuestionsState.currentQuestions : QuestionsState.allQuestions;

  const container = document.createElement('div')
  container.className = 'quiz-screen'

  const loader = renderLoader();
  container.append(loader);

  filterQuestions(QuestionsState.selectedCategory, QuestionsState.selectedLevel).then((questions) => {
    QuestionsState.currentQuestions = questions;
    console.log('questions from quiz screen', questions)

    //container.innerHTML = '';

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
    }).catch((err: unknown) => {
      if (err instanceof Error) {
        container.innerHTML = `<p class="error">${err.message}</p>`
      } else {
        container.innerHTML = `<p class="error">Some error was occured</p>`
      }
    });

  return container
}
