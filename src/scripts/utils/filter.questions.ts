import { Category, Level, Question } from "../pages/quiz/quiz.types";
import { QuestionsState } from "../states/questionsState";

export function filterQuestions(category?: Category, level?: Level): Question[] {
  const allQuestions = QuestionsState.allQuestions;

  if (category) {
    let filteredQuestions: Question[] = allQuestions.filter(question => question.category === category);

    if (level) {
      return filteredQuestions.filter(question => question.level === level);
    }
    return filteredQuestions;
  }

  if (level) {
    let filteredQuestions: Question[] = allQuestions.filter(question => question.level === level);
    return filteredQuestions;
  }

  return allQuestions;
}