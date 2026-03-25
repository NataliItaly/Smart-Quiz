import { Question, Category, Level } from '../pages/quiz/quiz.types'

export interface QuestionsFilter {
  category?: Category
  level?: Level
}

export interface QuestionsState {
  readonly currentQuestions: Question[] | null;
  readonly selectedCategory: Category | undefined;
  readonly selectedLevel: Level | undefined;
  //isFirstFetch: boolean;
}

export const questionFilter: QuestionsFilter = {
  category: undefined,
  level: undefined
}

let questionsState: QuestionsState = loadQuiz();

/* export const QuestionsState = {
  currentQuestions: [] as Question[],
  selectedCategory: undefined as Category | undefined,
  selectedLevel: undefined as Level | undefined
} */


//let quiz: Question[] | null = null

function loadQuiz(): QuestionsState {
  try {
    const stored = localStorage.getItem('quiz')

    if (!stored) {
      return {
        currentQuestions: null,
        selectedCategory: undefined,
        selectedLevel: undefined,
        //isFirstFetch: true
      }
    }

    const parsed = JSON.parse(stored) as QuestionsState
    return parsed
  } catch {
    return {
      currentQuestions: null,
      selectedCategory: undefined,
      selectedLevel: undefined,
      //isFirstFetch: true
    }
  }
}

export function getQuiz(): QuestionsState | null {
  return {
    currentQuestions: questionsState.currentQuestions ? [...questionsState.currentQuestions] : null,
    selectedCategory: questionsState.selectedCategory,
    selectedLevel: questionsState.selectedLevel
  }
}

export function updateQuiz(patch: Partial<QuestionsState>): void {
  questionsState = {
    ...questionsState,
    ...patch
  }
}

/* export function setQuiz(newQuizState: QuestionsState): void {
  questionsState = {
    currentQuestions: newQuizState.currentQuestions ? [...newQuizState.currentQuestions] : null,
    selectedCategory: newQuizState.selectedCategory,
    selectedLevel: newQuizState.selectedLevel,
  }

  localStorage.setItem('quiz', JSON.stringify(newQuizState))
} */

export function clearQuiz(): void {
  questionsState = {
    currentQuestions: null,
    selectedCategory: undefined,
    selectedLevel: undefined,
    //isFirstFetch: true
  };
  localStorage.removeItem('quiz')
}