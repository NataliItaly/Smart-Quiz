Фреймворк: vitest 

Запустить: npm test

Участники:

- @dariapusovskaya 

Testing:
- form rendering 
- button interactions
- localStorage saving
- form switching
(file: scr/tests/example.test.ts)
(PR: https://github.com/NataliItaly/Smart-Quiz/pull/36)


- @katerynamoskalenko

- API logic
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

- @NataliItaly

1. Filters form:

- filters form with id 'filter-form' exists,
- selects with id 'category' and 'level' exist,
- 4 options exist ( 'All', 'HTML', 'CSS & SCSS', 'JS & TS' ),
- submit button with id 'filter-btn' exists
- prevent submit with both filters empty
  
2. Create element function:

- create HTML element with correct tag, class, id, text content
- accept class as string array of strings
- set correct attributes for HTML element

3. Add tests for questions filtering:

- returns all data if no filters was applied
- returns questions array by category only, level only, category and level
- returns empty array if no match was found

(files: scr/tests/create-element.test.ts, src/tests/filters-form.test.ts, src/tests/questions-filter.test.ts)
PRs: 
- https://github.com/NataliItaly/Smart-Quiz/pull/35
- https://github.com/NataliItaly/Smart-Quiz/pull/40
[PR link](https://github.com/NataliItaly/Smart-Quiz/pull/35)
[PR link](https://github.com/NataliItaly/Smart-Quiz/pull/40)

