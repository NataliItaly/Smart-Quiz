## 23.03.2026

Working on Dashboard and Quiz components connection functionality.

1. Implement enhancing loader animation, using CSS only.
2. Implement loader spinner. But some issue was found:
- The loader spinner works correctly when quiz data is loading.
- But the Loader must work only when the quiz just started (after pressing 'Go to Quiz' button). After this quiz must use the data fetched initially, so after changing pages and after return to current quiz the data there is no need to refetch the data again. It is must be use the already saved data.
- The code of rendering Quiz screen must refactoried.
- It must a function - mediator that checks if there is already saved data:

    - if it is -> the data is passed to QuizScreen function,
    - if it is not -> the loader is displayed while quiz data is fetching, filtering and saving to quizState.currentQuestions -> then the data is passing to QuizService function
- So QuizService function will occupy only by UI -> takes current quiz questions array and displays on the screen
