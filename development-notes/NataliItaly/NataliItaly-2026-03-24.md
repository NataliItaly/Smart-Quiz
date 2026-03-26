## 24.03.2026

I completed Loader functionality.
- Our data is mock, so there is no any time interval between start to fetch data and receiving the data.
- The Loader was implemented with use of setTimeout to create artificial delay in 2 seconds in fetching data.
- The time delay permits to display Loader

Now every time user comes to Quiz page he see the Loader first, then the Quiz second.
**Is this behaviour is correct from UX point of view?**:
- New Loader means new quiz questions fetching
- The old quiz will be lost if user changes page or accidentaly writes something in browser search bar (he will came to 404 page)
- I like quiz behavior - the quiz is completed when user press finish quiz button (if there is button) or the questions from the current quiz was completed (even in this scenario I am not sure must we do a possibility to review and correct answers)
- On this step I decided to change our quiz questions fetching mecanism because before:
  - when user press button 'Go to quiz' quiz.service starts to fetch the data and the quiz.screen displays questiton container
- I am were of opinion that user cannot lost current quiz and after changing the page he can be able to continue the same quiz
- So current quiz must be store in memory until it will not be start the new one
- So the quiz data must be fetched and displayed when the new quiz was started. And here must run Loader
- If there is already a current quiz the data will be extract from state and Loader will not run

The code refactoring makes me modify the code of my team mate Kateryna Moskalenko. I am ready to correct all possible conflicts with her code