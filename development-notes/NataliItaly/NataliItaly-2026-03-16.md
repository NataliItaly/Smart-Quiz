## 16.02.2026

### Tests
1. Write tests with use of Vitest test framework
2. Testing functionality:

 2.1. Filters form:
  - filters form with id 'filter-form' exists,
  - selects with id 'category' and 'level' exist,
  - 4 options exist ( 'All', 'HTML', 'CSS & SCSS', 'JS & TS' ),
  - submit button with id 'filter-btn' exists
  - prevent submit with both filters empty

  2.2. Create element function:
  - create HTML element with correct tag, class, id, text content
  - accept class as string array of strings
  - set correct attributes for HTML element

3. Open PR from test-dashboard branch to develop
[PR](https://github.com/NataliItaly/Smart-Quiz/pull/35)


### Code Review
1. Review on PR by Kateryna Moskalenko, Quiz component
[Feature/quiz screen: feat(quiz): implement Check, next Try Again, Explain, score tracking #4](https://github.com/NataliItaly/Smart-Quiz/pull/4)
Proposed:
  1. Functionality:
  - keep the Check button disabled when no answer is selected,
  - after pressing Check button, show whether the answer was correct or not.
  - If the answer was wrong let's give a user opportunity to try again.
  - So after choosing first time wrong answer don't reveal the correct one.
  2. Fetching data:
  - we can fetch json data to implement Next questiton functionality.
  3. Accessibility issue:
  - use input type radio instead of buttons.
