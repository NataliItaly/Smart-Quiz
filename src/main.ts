import './css/styles.css';
import { initRouter } from './scripts/services/router.service';
// import { quizService } from './scripts/services/quiz.service';
// import { QuestionsState } from './scripts/states/questionsState';

function initApp(): void {
  //const questionsData = await quizService();

  /* if (questionsData) {
    QuestionsState.allQuestions = questionsData;
  } */
  // start route
  initRouter();
}

initApp()





