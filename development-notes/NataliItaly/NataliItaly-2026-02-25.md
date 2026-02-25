## 25.02.2026


Reviewed pull request from feature/quiz-screen from @KaterynaMoskalenko regarding questions data JSON file. The file was moved to public/data folder to make it accessible for fetching.
The pull request was successfully merged.


Reviewed pull request from feature/quiz screen from @KaterynaMoskalenko for quiz component and requested some changes.


My propositions:
 - change comments from Russian to English,
 - keep the Check button disabled when no answer is selected,
 - after pressing Check button, show whether the answer was correct or not.
  If the answer was wrong let's give a user opportunity to try again.
  So after choosing first time wrong answer don't reveal the correct one.
 - we can fetch json data to implement Next questiton functionality