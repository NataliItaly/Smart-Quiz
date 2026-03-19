## 18.03.2026

Working on page not found functionality.

1. Add 404 page when input unexisting page in browser url
- add Back button
- pressing Back button return to last visited page
- add routState to store current path in localStorage
- enable remain on the same page / question after reload the page

2. Add questions navigation using history API

  2.1. Resolved questions:
  - added window.location.hash to every quiz question url
  - implement manualy navigation between questions using hash input in browser url
  - implement navigation between questions using Next question button

  2.2. Questions to think:
  - Do we need to have Prev question button?
  - Can we easily navigate between questions if they was not checked

3. To do write instruction on use and implement page routing with use of History API
