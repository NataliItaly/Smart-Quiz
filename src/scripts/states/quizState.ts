import { Question } from "../pages/quiz/quiz.types";

export function loadQuiz(): Question[] | [] {
  try {
    const stored = localStorage.getItem('quiz');

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored) as Question[];
    return parsed;
  } catch {
    return [];
  }
}

let quiz: Question[] = loadQuiz();

export function getQuiz(): Question[] {
  return quiz;
}

export function setQuiz(quizObj: Question[]): void {
  quiz = quizObj;
  localStorage.setItem('quiz', JSON.stringify(quizObj));
}

export function clearQuiz(): void {
  quiz = [];
  localStorage.removeItem('quiz');
}