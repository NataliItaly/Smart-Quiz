import './css/styles.css';
import { initRouter } from './scripts/services/router.service';
import { quizService } from './scripts/services/quiz.service';
import { QuestionsState } from './scripts/states/questionsState';

async function initQuestions(): Promise<void> {
  const questionsData = await quizService();

  if (questionsData) {
    QuestionsState.allQuestions = questionsData;
  }
  console.log( 'initial data', questionsData)
  initRouter();
}

await initQuestions()





