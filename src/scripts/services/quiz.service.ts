import { Question, QuizResponse, Category, Level } from "../pages/quiz/quiz.types";

export function quizService(): Promise<Question[]> {
  return new Promise((resolve, reject) => {
    setTimeout( () => {
      void (async function (): Promise<void> {
        try {
          const res = await fetch('/data/quiz_questions.json')

          if (!res.ok) {
            throw new Error('Failed to load quiz questions')
          }

          const json: unknown = await res.json()
          const data = json as QuizResponse

          const allQuestions: Question[] = []

          for (const category of Object.keys(data.quiz) as Category[]) {
            for (const level of Object.keys(data.quiz[category]) as Level[]) {
              const questions = data.quiz[category][level]

              const enlarged = questions.map((q) => ({ ...q, category, level, wasChecked: false }))
              allQuestions.push(...enlarged)
            }
          }

          resolve(allQuestions)
        } catch (err) {
          if (err instanceof Error) {
            reject(err)
          } else {
            reject(new Error(String(err)))
          }
        }
      })()
    }, 3000);
  });
}




