/* import { Question } from "../pages/quiz/quiz.types";

let quiz: Question[] | null = null;

function loadQuiz(): Question[] | null {
  try {
    const stored = localStorage.getItem('quiz');

    if (!stored) {
      return null;
    }

    const parsed = JSON.parse(stored) as Question[];
    return parsed;
  } catch {
    return null;
  }
}

export function getQuiz(): Question[] | null {
  if (quiz === null) {
    quiz = loadQuiz();
  }
  return quiz ? [...quiz] : null;
}

export function setQuiz(quizObj: Question[]): void {
  quiz = quizObj;
  localStorage.setItem('quiz', JSON.stringify(quizObj));
}

export function clearQuiz(): void {
  quiz = null;
  localStorage.removeItem('quiz');
} */