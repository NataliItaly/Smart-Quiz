import { Question, Category, Level } from "../pages/quiz/quiz.types";

export interface QuestionsFilter {
  category?: Category;
  level?: Level;
}

export const questionFilter: QuestionsFilter = {
  category: undefined,
  level: undefined
}

export const QuestionsState = {
  currentQuestions: [] as Question[],
  selectedCategory: undefined as Category | undefined,
  selectedLevel: undefined as Level | undefined
}