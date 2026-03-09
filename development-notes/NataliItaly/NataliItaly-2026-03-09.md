## Component's Presentation
[Dashboard Component Presentation](https://youtu.be/CX-lkU0616c)

## Prepare for team meeting

### Questions to discuss next meeting:

1. Keep every page's css styles in separate file, example:
```css
    - quiz.css
    - dashboard.css
    - login.css
    and so on....
```
2. Use import in style.css:
```@import './reset.css';
   @import './quiz.css';
```
3. Instruction [css-flow.md](https://github.com/NataliItaly/Smart-Quiz/blob/main/instructions/css-flow.md)

3. Fix dashboard and quiz intersection questions:
  - review quiz types and states
  - review enlarged quiz.service with aim to set category and level for questions:
```export async function quizService(): Promise<Question[]> {
  const res = await fetch('/data/quiz_questions.json')
  if (!res.ok) {
    throw new Error('Failed to load quiz questions')
  }

  const json: unknown = await res.json();
  const data = json as QuizResponse;

  const allQuestions: Question[] = []

  for (const category of Object.keys(data.quiz) as Category[]) {
    for (const level of Object.keys(data.quiz[category]) as Level[]) {
      const questions = data.quiz[category][level];

      const enlarged = questions.map(q => ({...q, category, level}))
      allQuestions.push(...enlarged);
    }
  }

  return allQuestions;
}
```
