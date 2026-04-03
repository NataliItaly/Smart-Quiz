import { getQuiz, updateQuiz } from '../states/questionsState';
import { filterQuestions } from '../utils/filter.questions';
import { renderQuizContainer } from '../pages/quiz/quiz.container';
import { shuffleArray } from '../utils/shuffle.array';


export async function quizQuestionsService(container: HTMLElement): Promise<void> {
  try {
    const questions = await filterQuestions(getQuiz()?.selectedCategory, getQuiz()?.selectedLevel);
    const shuffledQuestions = shuffleArray(questions);
    updateQuiz({currentQuestions: shuffledQuestions});
    renderQuizContainer(container, shuffledQuestions);
  } catch (err: unknown) {
    if (err instanceof Error) {
      container.innerHTML = `<p class="error">${err.message}</p>`
    } else {
      container.innerHTML = `<p class="error">Some error was occured</p>`
    }
  }
}
