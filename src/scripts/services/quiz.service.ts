export interface Question {
  id: string
  question_ru: string
  question_en: string
  options: string[]
  answer: string
}

export interface QuizData {
  quiz: {
    [category: string]: {
      [difficulty: string]: Question[]
    }
  }
}

export async function quizService(): Promise<Question[]> {
  const res = await fetch('/data/quiz_questions.json')
  if (!res.ok) {
    throw new Error('Failed to load quiz questions')
  }

  const data: QuizData = (await res.json()) as QuizData

  const allQuestions: Question[] = []

  for (const category in data.quiz) {
    for (const difficulty in data.quiz[category]) {
      allQuestions.push(...data.quiz[category][difficulty])
    }
  }

  return allQuestions
}
