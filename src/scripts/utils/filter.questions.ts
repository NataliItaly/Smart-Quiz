import { Category, Level, Question } from "../pages/quiz/quiz.types";
import { QuestionsState } from "../states/questionsState";

export function filterQuestions(category?: Category, level?: Level): Question[] {
  const allQuestions = QuestionsState.allQuestions;

  const choosenQuestions: Question[] = allQuestions.filter((question: Question) => {
    if (category && question.category !== category) return false;
    if (level && question.level !== level) return false;

    return true;
  });


  return choosenQuestions;
}