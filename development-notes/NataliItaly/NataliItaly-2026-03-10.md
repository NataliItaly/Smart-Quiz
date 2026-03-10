## Fix Dashboard component

1. Refactor Routing - init Router in main.ts
2. Fetch json data when the app started and populate QuestionsState.allQuestions
3. Add filters form, the choosen filters populate QuestionsState with category and level
4. Apply filters and populate curentQuestions
5. Pass currentQuestions to Quiz component

## Points to think:
1. What event to use submit form or select change
2. Bug detected when the level wasn't choose