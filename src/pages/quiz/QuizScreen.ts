import './QuizScreen.css'

export function QuizScreen() {
  // Корневой контейнер
  const container = document.createElement('div')
  container.className = 'quiz-screen'

  // Заголовок вопроса
  const titelEl = document.createElement('h2')
  titelEl.className = 'quiz-question'
  titelEl.textContent = 'Online test'

  const question = {
    id: 'css_28',
    question_ru: 'Какое свойство меняет прозрачность?',
    question_en: 'Which property changes opacity?',
    options: ['opacity', 'transparent', 'visibility', 'alpha'],
    answer: 'opacity'
  }

  const progressEl = document.createElement('div')
  progressEl.className = 'quiz-progress'
  progressEl.textContent = 'Вопрос 1 из 30'

  const questionEl = document.createElement('div')
  questionEl.textContent = question.question_ru
  questionEl.className = 'quiz-question'

  // Контейнер вариантов
  const optionsEl = document.createElement('div')
  optionsEl.className = 'quiz-options'

  question.options.forEach((opt) => {
    const btn = document.createElement('button')
    btn.className = 'quiz-option'
    btn.textContent = opt
    optionsEl.appendChild(btn)
  })

  // Кнопка Check
  const checkBtn = document.createElement('button')
  checkBtn.textContent = 'Check'
  checkBtn.className = 'quiz-check'

  // Кнопка Next
  const nextBtn = document.createElement('button')
  nextBtn.textContent = 'Next'
  nextBtn.className = 'quiz-next'
  nextBtn.style.display = 'none'

  // Кнопка Try Again
  const tryBtn = document.createElement('button')
  tryBtn.textContent = 'Try again'
  tryBtn.className = 'quiz-try'
  tryBtn.style.display = 'none'

  // Кнопка Explain
  const explainBtn = document.createElement('button')
  explainBtn.textContent = 'Explain'
  explainBtn.className = 'quiz-explain'
  explainBtn.style.display = 'none'

  // Блок объяснения
  const explainEl = document.createElement('p')
  explainEl.className = 'quiz-explanation'
  explainEl.style.display = 'none'

  // Добавляем элементы в контейнер

  container.appendChild(titelEl)
  container.appendChild(progressEl)
  container.appendChild(questionEl)
  container.appendChild(optionsEl)
  container.appendChild(checkBtn)
  container.appendChild(nextBtn)
  container.appendChild(tryBtn)
  container.appendChild(explainBtn)
  container.appendChild(explainEl)

  return container
}
