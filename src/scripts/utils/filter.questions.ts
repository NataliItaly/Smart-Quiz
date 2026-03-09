import { Category, Level } from "../pages/quiz/quiz.types";
import { quizService } from "../services/quiz.service";
import { Question } from "../pages/quiz/quiz.types";

export async function filterQuestions(category?: Category, level?: Level): Promise<Question[]> {
  const allQuestions = await quizService();

  const choosenQuestions: Question[] = allQuestions.filter((question: Question) => {
    if (category && question.category !== category) return false;
    if (level && question.level !== level) return false;

    return true;
  });

  return choosenQuestions;
}