//import '../../../css/styles.css';
import { getQuiz } from '../../states/questionsState';
import { renderLoader } from '../../components.ts/loader';
import { renderQuizContainer } from './quiz.container';
import { quizQuestionsService } from '../../services/quiz.questions.service';


export function quizScreen(): HTMLElement {
  const container = document.createElement('div')
  container.className = 'quiz-screen'

  const currentQuestionsFromState = getQuiz()?.currentQuestions;

  if (currentQuestionsFromState && currentQuestionsFromState.length > 0) {
    renderQuizContainer(container, currentQuestionsFromState);
    return container;
  }

  const loader = renderLoader();
  container.append(loader);

  void quizQuestionsService(container);

  return container
}
