import { mockExplainResponse } from './mock.explain.response'
import { showExplain } from './create.explain.container'
import { Question } from '../../scripts/services/quiz.service'

export interface ExplainPayload {
  topic: string
  difficulty: string
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

export function explainationHandler(
  currentQuestion: Question,
  selectedAnswer: string
): void {
  const payload = buildExplainPayload(currentQuestion, selectedAnswer)
  const isCorrect = payload.userAnswer === payload.correctAnswer
  console.log("isCorrect:", isCorrect)


  const explanation = mockExplainResponse(isCorrect)
  console.log("explanation:", explanation)

  showExplain(explanation)
}
