import { describe, it, expect, vi, beforeEach } from 'vitest'
import { quizQuestionsService } from '../../scripts/services/quiz.questions.service'

// mock dependecies
vi.mock('../../scripts/utils/filter.questions', () => ({
  filterQuestions: vi.fn()
}))
vi.mock('../../scripts/states/questionsState', () => ({
  getQuiz: vi.fn(),
  updateQuiz: vi.fn()
}))
vi.mock('../../scripts/utils/shuffle.array', () => ({
  shuffleArray: vi.fn()
}))
vi.mock('../../scripts/pages/quiz/quiz.container', () => ({
  renderQuizContainer: vi.fn()
}))

import { filterQuestions } from '../../scripts/utils/filter.questions'
import { getQuiz, updateQuiz } from '../../scripts/states/questionsState'
import { shuffleArray } from '../../scripts/utils/shuffle.array'
import { renderQuizContainer } from '../../scripts/pages/quiz/quiz.container'
import type { Question } from '../../scripts/pages/quiz/quiz.types'

describe('quizQuestionsService', () => {
  const container = document.createElement('div')
  const router = {} as any

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should load and render questions', async () => {
    const mockQuestions = [{ id: 1 }, { id: 2 }]
    ;(getQuiz as any).mockReturnValue({
      selectedCategory: 'math',
      selectedLevel: 'easy',
      selectedMode: 'Practice'
    })
    ;(filterQuestions as any).mockResolvedValue(mockQuestions)
    ;(shuffleArray as any).mockReturnValue(mockQuestions)

    await quizQuestionsService(container, router)

    expect(filterQuestions).toHaveBeenCalled()
    expect(updateQuiz).toHaveBeenCalledWith({
      currentQuestions: mockQuestions
    })
    expect(renderQuizContainer).toHaveBeenCalledWith(
      container,
      mockQuestions,
      router
    )
  })

  it('should limit questions to 20 in Exam mode', async () => {
    const questions = Array(30)
      .fill(null)
      .map((_, i) => ({ id: i })) as Question[]

    ;(getQuiz as any).mockReturnValue({
      selectedCategory: 'math',
      selectedLevel: 'easy',
      selectedMode: 'Exam' // need to add exam mode - only exam mode returns 20  questions
    })
    ;(filterQuestions as any).mockResolvedValue(questions)
    ;(shuffleArray as any).mockReturnValue(questions)

    await quizQuestionsService(container, router)

    expect(updateQuiz).toHaveBeenCalledWith({
      currentQuestions: questions.slice(0, 20)
    })
  })

  it('should render error message if something fails', async () => {
    ;(filterQuestions as any).mockRejectedValue(new Error('Failed'))

    await quizQuestionsService(container, router)

    expect(container.innerHTML).toContain('Failed')
  })

  it('should render default error for unknown error', async () => {
    ;(filterQuestions as any).mockRejectedValue('some error')

    await quizQuestionsService(container, router)

    expect(container.innerHTML).toContain('Some error was occured')
  })
})
