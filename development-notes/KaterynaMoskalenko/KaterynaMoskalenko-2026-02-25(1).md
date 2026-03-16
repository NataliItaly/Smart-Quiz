## 25.02.2026

- My  issue - render Quizz 

My problem is that I keep increasing the function and it is very large and I have to solve a lot of problems, I know that this is very bad
Now I tried and continue to work on the main screen of the quiz and I separate the logic and rendering, which is also a certain challenge for me. Because now a lot of robotic friends are used and they write with huge chunk and my task is to use this help. But to control and understand
- QuizScreen — creates the DOM (buttons, containers, text), i.e., the "body" of the screen.
- quizSelection — is responsible for selecting an option (what the user clicked).
- quizCheck — is responsible for answer verification (what to do when Check is clicked).

quizSelection: - add one handler to the entire optionsEl container
               - add the selected class to the clicked button with answer
               - inform the outside (quizScreen)that it has been selected (onSelect(target.textContent || ''))
                 User clicks → setupOptionSelection → calls onSelect(value) → QuizScreen saves the value
                 
setupCheckLogic is the module that controls the Check button:
                - Waits for the user to click the Check button
                - Asks QuizScreen which option was selected
                - Compares the selected option with the correct one
                - Highlights the correct and incorrect options
                - Hides the Check button
                - Shows the Next button           
setupCheckLogic does NOT know which option the user selected and does NOT store the state.
It queries QuizScreen for the state using the getSelected function.                      
               