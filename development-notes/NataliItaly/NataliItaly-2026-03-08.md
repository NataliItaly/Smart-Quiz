## 08.02.2026

### Working on Dashboard page

1. Creating page elements with help of utils/createElement function which has interface that extends for creating any html element with different attributes.
2. Creating filters form with possibility to choose category and level (multiple choices).
3. After creating filters there derived a problem to typization of quiz data.
4. Create types for Category, Level, QuizData and intefaces for QuizResponse, QuizFilter, FilterOptions.
5. Refactor quiz.service according to new types.
6. Fix eslint error: res.json returns any. Resolve with assign unknown type to res.json:
```const json: unknown = await res.json();
const data = json as QuizResponse;
```
7. Create quiz state for conserve current quiz in local storage.
8. Facing issue with "warning  Missing return type on function" (Husky pre commit) - resolve
9. Add event listener function on filters form submit event
10. Decide on filter architecture: where to filter questions. According to Single Responsibility Principle I decide to filter questions in separate function, but I will add category and level fields to every question in returned data array.
11. Current or filtered questions issue: if there is no choice it will be just return from submit listener. The form just registeres the filters, but another button 'Go to quiz' displays questions. But now I am in doubt what questions will displays 'Go to quiz' button. If there are filters, I will filter all questions and put them in currentQuestionsState, but if there is filters on which step currentQuestionsState will be populate.
12. Create questionsState to resolve above issue, keep trace on
  - allQuestions (loaded on init app),
  - currentQuestions - filtered or not,
  - selected category,
  - selected level
