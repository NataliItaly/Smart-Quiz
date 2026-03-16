
import { Question, QuizResponse, Category, Level } from "../pages/quiz/quiz.types"
export async function quizService(): Promise<Question[]> {
  const res = await fetch('/data/quiz_questions.json')
  if (!res.ok) {
    throw new Error('Failed to load quiz questions')
  }

  const json: unknown = await res.json();
  const data = json as QuizResponse;

  const allQuestions: Question[] = []

  for (const category of Object.keys(data.quiz) as Category[]) {
    for (const level of Object.keys(data.quiz[category]) as Level[]) {
      const questions = data.quiz[category][level];

      const enlarged = questions.map(q => ({...q, category, level}))
      allQuestions.push(...enlarged);
    }
  }

  return allQuestions;
}




