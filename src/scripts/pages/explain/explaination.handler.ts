import { showExplain } from './create.explain.container'
import { Question } from '../quiz/quiz.types'

interface ExplainResponse {
  receivedQuestion: string
  receivedAnswer: string
  message: string
}
export interface ExplainPayload {
  topic: string | undefined   // need to revisit
  difficulty: string | undefined   // need to revisit
  question: string
  options: string[]
  userAnswer: string
  correctAnswer: string
}

export function buildExplainPayload(
  question: Question,
  userAnswer: string
): ExplainPayload {
  return {
    topic: question.topic,
    difficulty: question.difficulty,
    question: question.question_en,
    options: question.options,
    userAnswer,
    correctAnswer: question.answer
  }
}

export async function explainationHandler(
  currentQuestion: Question,
  selectedAnswer: string
): Promise<void> {
  const payload = buildExplainPayload(currentQuestion, selectedAnswer)

  try {
    const response = await fetch('/.netlify/functions/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: payload.question,
        answer: payload.userAnswer
      })
    })

    const data = (await response.json()) as ExplainResponse
    console.log('BACKEND RESPONSE:', data)

    //show & explainn back
    showExplain(data.message)
  } catch (error) {
    console.error('FETCH ERROR:', error)
  }
}
