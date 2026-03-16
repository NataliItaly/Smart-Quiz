## 16.03.2026

 API logic
- correct data handling
- successful responses
- error responses
- validation behavior
- AI logic (Netlify Function explain)
- returns 405 for non‑POST requests
- returns 400 when required fields are missing
- returns a valid explanation when Groq API responds successfully
- handles Groq API errors correctly
- handles unexpected exceptions safely
test pure function
test create element
(file: scr/tests/netlify.handler.test.ts
file: scr/tests/quiz.api.test.ts
file: scr/tests/quiz.applyUIState.test.ts
file: scr/tests/quiz.test.ts)
https://github.com/NataliItaly/Smart-Quiz/pull/39

Фреймворк: vitest 

Запустить: npm test

