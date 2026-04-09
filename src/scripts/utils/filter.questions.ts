import { Category, Level, Question } from "../pages/quiz/quiz.types";
import { quizService } from "../services/quiz.service";

export async function filterQuestions(category?: Category, level?: Level): Promise<Question[]> {
  const allQuestions = await quizService()

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