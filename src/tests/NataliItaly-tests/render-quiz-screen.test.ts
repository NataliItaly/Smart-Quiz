import { describe, it, expect, vi, beforeEach } from 'vitest'
import { quizScreen } from '../../scripts/pages/quiz/quiz.screen'
import { getQuiz } from '../../scripts/states/questionsState'
import { renderQuizContainer } from '../../scripts/pages/quiz/quiz.container'
import { renderLoader } from '../../scripts/components/loader'
import { quizQuestionsService } from '../../scripts/services/quiz.questions.service'


vi.mock('../../scripts/states/questionsState', () => ({
  getQuiz: vi.fn()
}))

vi.mock('../../scripts/pages/quiz/quiz.container', () => ({
  renderQuizContainer: vi.fn()
}))

vi.mock('../../scripts/components/loader', () => ({
  renderLoader: vi.fn()
}))

vi.mock('../../scripts/services/quiz.questions.service', () => ({
  quizQuestionsService: vi.fn()
}))

describe('quizScreen', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render quiz when questions exist', () => {
    const router = { navigate: vi.fn() }

    const questions = [{ id: 1 }]

    vi.mocked(getQuiz).mockReturnValue({ currentQuestions: questions } as any)

    /* const {
      renderQuizContainer
    } = require('../../scripts/pages/quiz/quiz.container')
    const { renderLoader } = require('../../scripts/components/loader')
    const {
      quizQuestionsService
    } = require('../../scripts/services/quiz.questions.service')
 */
    const container = quizScreen(router as any)

    expect(renderQuizContainer).toHaveBeenCalledWith(
      container,
      questions,
      router
    )

    expect(renderLoader).not.toHaveBeenCalled()
    expect(quizQuestionsService).not.toHaveBeenCalled()
  })
})