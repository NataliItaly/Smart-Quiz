## 26.02.2026

- My  issue - fetch

Json's file with questions was placed in the Public folder, and therefore it was necessary to implement a request via fеtch and integrate it into the existing quiz function.
So far, there's a simple implementation of a get-request, no category, no anything, all questions in a row, HTML, CSS, JavaScript, Easy, Medium, Hard, everything in a row, no extras, just throw together a framework of what the request turned out to be, and how our quiz function renders this question and the possible answer.

A server that:
- downloads JSON const data = (await res.json()) as QuizData

- reviews all categories   for (const category in data.quiz) 

- reviews all difficulty levels  for (const difficulty in data.quiz[category]) 

- collects all questions into a single array allQuestions.push(...data.quiz[category][difficulty])
thus the server returns Question[] -> quizScreen receives the data const questions = await quizService()
The full chain:
- quizScreen calls quizService()
- quizService performs fetch → receives Response
- quizService performs res.json() → receives a JSON object
- quizService collects all questions → returns an array
- quizScreen receives an array of questions
- quizScreen renders the first question
- the selection/checking logic is based on the array of questions.