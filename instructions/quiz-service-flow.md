## Что возвращает data JSON

JSON имеет структуру:

```{
  "quiz": {
    "HTML": {
      "easy": [Question],
      "medium": [Question],
      "hard": [Question]
    },
    "CSS & SCSS": {
      "easy": [...],
      "medium": [...],
      "hard": [...]
    }
  }
}
```

Тип данных:
`Category → Level → Question[]`


## Чтo делает функция quizService

**quizService в текущем виде делает “flatten” данных — превращает вложенную структуру в один массив вопросов.**

1. код:

```for (const category of Object.keys(data.quiz) as Category[]) {
  for (const level of Object.keys(data.quiz[category]) as Level[]) {
    allQuestions.push(...data.quiz[category][level])
  }
}
```
проходит по:

```HTML
  easy
  medium
  hard
CSS
  easy
  medium
  hard
JS
  easy
  medium
  hard
```
и складывает всё в один массив.

Результат: тип Question[]

Например:

```[
  { id: 1, question_ru: "...", ... },
  { id: 2, question_ru: "...", ... },
  { id: "css_1", question_ru: "...", ... }
]
```

2. Это удобно, если:
- нужно показывать случайные вопросы
- делать shuffle
- фильтровать
- выбирать N вопросов

## Механизм фильтрации
*Должен ли механизм фильтрации быть в функции quizService?*

  - Например, если ничего не было выбрано, будут отображены все вопросы,
  - если был какой-то выбор, будут отображаться только выбранные вопросы.
  
Здесь у меня есть 2 способа: 
1. Сохранить сортировку внутри функции quizService, но это будет очень длинная функция.
2. Функция quizService извлекает только вопросы, а другая функция при необходимости их фильтрует.

**Но функция quizService возвращает только массив вопросов без контекста**.
Я могу добавить к каждому вопросу поля категории и уровня и иметь возможность фильтровать их.
И мне нужно расширить Question интерфейс:
```
export interface Question {
  id: string | number;
  question_ru: string;
  question_en: string;
  options: string[];
  answer: string;
  category: Category;  // added
  level: Level;   // added
}
```

## Принцип разделения ответственности

- quizService только загружает данные,
- фильтрация происходит в отдельной функции,
- к каждому вопросу добавить категорию и уровень.

Если сделать так:
```quizService(filters?: QuizFilter)
```
функция начнёт отвечать сразу за несколько задач:
- загрузка данных
- преобразование структуры
- фильтрация
- логика формы

**Это нарушает принцип Single Responsibility Principle.**
И со временем функция превращается в монстра:

```if(category && level) ...
else if(category) ...
else if(level) ...
else ...
```

## Aрхитектура
1. quizService будет формировать данные при загрузке приложения, так как данные не меняются:
```export async function quizService(): Promise<Question[]> {
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

      const enriched = questions.map(q => ({
        ...q,
        category,
        level
      }))

      allQuestions.push(...enriched)
    }
  }

  return allQuestions
}
```

Теперь каждый вопрос выглядит так:

```{
  id: 1,
  question_ru: "...",
  question_en: "...",
  options: [...],
  answer: "...",
  category: "HTML",
  level: "easy"
}
```

2. Фильтрация  происходит в filterQuestions при сабмите filters form:
export function filterQuestions(
  questions: Question[],
  filter: Partial<{ category: Category; level: Level }>
): Question[] {
  return questions.filter(q => {
    return (
      (!filter.category || q.category === filter.category) &&
      (!filter.level || q.level === filter.level)
    )
  })
}

3. Использование - вывод выбранных вопросов при нажатии на кнопку 'Go to quiz'

## Плюсы:
- quizService простая
- фильтрация переиспользуемая
- можно делать дополнительные фильтры
- данные удобные
- код легче тестировать

## архитектура загрузки данных
**Где вызывать quizService()**:
1. внутри filterQuestions
Технически можно, но это плохая практика:
```filterQuestions()
   ↓
quizService()
   ↓
fetch JSON
```
Если пользователь меняет фильтр 5 раз: 5 фильтров = 5 fetch запросов
Это:
- медленно
- создаёт лишний network трафик
- усложняет состояние приложения.

2. загрузить вопросы один раз, а потом фильтровать их.
Типичный поток:
  1. quizService() → загрузка JSON
  2. сохранить вопросы в state
  3. filterQuestions() → фильтрация массива
Например:
```const allQuestions = await quizService()
const filtered = filterQuestions(allQuestions, category, level)
```

## Основной поток:
- quizService() — только загрузка данных
- filters форма регистрирует фильтры:
    - Форма не хранит данные сама.
    - читает значения select
    - 3аписывает их в state (переменные)
    - другие части приложения используют эти значения.
      
- filterQuestions() — только фильтрация
- QuestionsState хранит Question[]:
```export const QuestionsState = {
  allQuestions: [] as Question[],
  currentQuestions: [] as Question[],
  selectedCategory: undefined as Category | undefined, // здесь undefined → значение не установлено, вместо "" → значение есть, но пустое
  selectedLevel: undefined as Level | undefined
}
```
- фильтрация не делает fetch
- кнопка "go to quiz" отображает вопросы

## Рефакторинг:
1. Удалить возврат из функции отправки:
  - если пользователь ничего не выбрал -> ничего не делать
  - Но проблема в том, что:
    - пользователь мог раньше выбрать фильтр
    - потом очистить его
    - submit
    - return
    - старые фильтры остаются в state
    
**Лучше всегда обновлять QuestionsState**

## Пункты для уточнения:
1. Возможно надо сделать shuffle или ограничение количества вопросов
2. Нужен ли нам прослушиватель отправки формы  или будет достаточно слушать изменения select?
 
