## 02.03.2026

- My post today is called "Everything Upside Down"

As I said, everything is a challenge for me, and the more our application grows, the more tasks I implement, the more confusion there is in my head, and I understand that I need to introduce a state that I didn’t have before, which monitors the state of my application. At the first stage, it worked very primitively: a button to turn off, a button to turn on, and so on in each file. If this button is turned off, then this button is turned on as the file grows. You understand that this is abnormal; there must be some separate state that monitors the state of the application.So:
 Main state entities
Two layers of state:
1) Logical state of the quiz (questions, index, score)
- questions: Question[] — an array of questions (currently without difficulty levels, although Jason already supports them)
- index: number (getIndex / setIndex) — the current question number.
- score: number (getScore) — the number of correct answers.
2) UI state (how the screen appears)
- selectedOption: string | null — what the user selected.
- isChecked: boolean — whether the current question has been checked.
- isCorrect: boolean | null — result of the last check.
- showNext: boolean — whether to show the Next button.
- showTryAgain: boolean — whether to show the Try Again button.
- showExplain: boolean — whether to show the Explain button.
- showExplanation: boolean — whether to show the explanation text.
This UI state is accessed via:
- getUIState() — read.
- updateUIState(partial) — change the partial.
- applyUIState({ buttons... }) — apply to the DOM.
My motto is simpler, easier, more fun. Otherwise, I'll get confused myself. I don't even pay attention to style yet.

Because I was confused, I had to turn to my robotic friend, Copilot,  and draw me a visual flow of how it works.
Help me, diagram, we're going to fix the mistakes. Of course, he writes code better and faster than me, but I'm more vigilant.
The thoughtless copying and past confused us both even more. So we went step by step. He suggests points of correction, I double-check them, and so we arrived at a more or less working logic.

Let's quickly run through what's working today:
We already know about steaks, now let's talk about rendering:
I already told you about my main functions of quizScrean. Now my task was to change the question next next next. I couldn't come up with a good solution. I created a regular function, quizRenderQuestion. The next question:
1. questions[]  - Stored in quizScreen after loading. Passed to functions as an argument.
2. index  - Stored in the state module (quiz.state.ts). Determines the current question.
3. Inside quizNext: const current = getIndex()
                  const next = current + 1
                  setIndex(next)
This is the only place where the index changes.

A question by index is selected.
Only one function: quizRenderQuestion It does: 
const question = questions[index] 
That is:
- quizNext → changes the index
- quizRenderQuestion → takes the question by index

Going to the next question does quizNext

The tryAgain function has also been implemented, attempting the next option