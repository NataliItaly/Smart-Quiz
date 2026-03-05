## 04.03.2026 
My issue (every day - new issue - AI implement)

I'm starting to develop a module for my agents, this is the first time I've encountered this, it's a rough idea for now.
a separate branch has been allocated for this - feature/explain-ai
What exactly does the AI ​​agent do in my still crude scenario?
The agent will have two roles, depending on the outcome of the answer:
1) If the user answered incorrectly
The agent does the following:
- Analysis of the question
- Explaining the correct answer
- Explaining the user's mistake
- Examples
- Mini-tips on how to think in similar problems
2) If the user answered correctly
The agent generates a mini-practice related to the question topic:
Examples:
- "Write an HTML fragment that creates a link to Google in a new tab"
- "Correct the error in this HTML code: <a href="google.com">Google</p>"
- "Come up with another example of using the <a> tag"
- "Explain the difference between <a> and <link>"
This turns the quiz into an interactive training exercise, not just a test  

Explain-AI should receive a clean, easy-to-use object - interface ExplainPayload 
Now the Explain module receives:
- the actual question from JSON (quiz-screen)
- the actual user response
- the actual topic
- the actual difficulty
The idea is to show all this in a modal window