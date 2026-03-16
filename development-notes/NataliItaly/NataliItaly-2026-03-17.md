## 17.03.2026

1. Resolve questions bug issue:
- question objects without field "options" was found
- function quizRenderQuestion failed in line 46:
```question.options.forEach((opt) => {...
```
because of options not found.
- update data json, change "options_en" to "options"