## 17.03.2026

1. Resolve questions bug issue:
- question objects without field "options" was found

- function quizRenderQuestion failed in line 46:
```question.options.forEach((opt) => {...
```

```Uncaught TypeError - Cannot read properties of undefined (reading 'forEach')
at quizRenderQuestion (quiz.render.question.ts:46:20)
at quizScreen (quiz.screen.ts:74:3)
```

- update data json, change "options_en" to "options"