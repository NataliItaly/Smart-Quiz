import { z } from 'zod';
import { Category, Level, Mode } from '../pages/quiz/quiz.types'

export const examQuestionsQuantity = 20;

export interface QuestionsFilter {
  category?: Category
  level?: Level
  mode: Mode
}

const CategorySchema = z.enum(['HTML', 'CSS & SCSS', 'JS & TS']);
const LevelSchema = z.enum(['easy', 'medium', 'hard']);
const ModeSchema = z.enum(['Train', 'Exam']);

const QuestionSchema = z.object({
  difficulty: z.string().optional(),
  topic: z.string().optional(),

  id: z.union([z.string(), z.number()]),

  question_ru: z.string(),
  question_en: z.string(),

  options__ru: z.string().optional(),

  options: z.array(z.string()),

  options_ru: z.array(z.string()).optional(),
  options_en: z.array(z.string()).optional(),

  answer: z.string(),

  answer_ru: z.string().optional(),
  answer_en: z.string().optional(),

  category: CategorySchema,
  level: LevelSchema
});

const QuestionsStateSchema = z.object({
  currentQuestions: z.array(QuestionSchema).nullable(),
  selectedCategory: CategorySchema.optional(),
  selectedLevel: LevelSchema.optional(),
  selectedMode: ModeSchema.default('Train')
});

export type QuestionsState = z.infer<typeof QuestionsStateSchema>

const defaultState: QuestionsState = {
  currentQuestions: null,
  selectedCategory: undefined,
  selectedLevel: undefined,
  selectedMode: 'Train'
}

export const questionFilter: QuestionsFilter = {
  category: undefined,
  level: undefined,
  mode: 'Train'
}

let questionsState: QuestionsState = loadQuiz()

function loadQuiz(): QuestionsState {
  try {
    const stored = localStorage.getItem('quiz')
    if (!stored) return defaultState

    const parsed: unknown = JSON.parse(stored)

    const result = QuestionsStateSchema.safeParse(parsed)

    if (!result.success) {
      localStorage.removeItem('quiz') // 👈 важно
      return defaultState
    }

    return result.data
  } catch {
    localStorage.removeItem('quiz')
    return defaultState
  }
}

export function getQuiz(): QuestionsState {
  return {
    currentQuestions: questionsState.currentQuestions
      ? [...questionsState.currentQuestions]
      : null,
    selectedCategory: questionsState.selectedCategory,
    selectedLevel: questionsState.selectedLevel,
    selectedMode: questionsState.selectedMode
  }
}

export function updateQuiz(patch: Partial<QuestionsState>): void {
  questionsState = { ...questionsState, ...patch }

  localStorage.setItem('quiz', JSON.stringify(questionsState))
}

export function clearQuiz(): void {
  questionsState = defaultState;
  localStorage.removeItem('quiz')
}
