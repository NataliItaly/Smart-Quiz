import { Category, Level } from "../pages/quiz/quiz.types";
import { quizService } from "../services/quiz.service";
import { Question } from "../pages/quiz/quiz.types";

export async function filterQuestions(category: Category | '', level: Level | ''): Question[] {
  const allQuestions = await quizService();

  const choosenQuestions: Question[] = allQuestions.filter((question: Question) => {
    if (category) {

    }
  });

  return choosenQuestions;
}