## Soft Review of the Filter Component

Overall, the component works, and the filtering logic is now completely closed—thanks for expanding my section. I looked at the code again and see several places where it could be made a bit cleaner and more maintainable.

### What could be improved
- **Local access to form elements.**

Currently, we access elements via `document.getElementById`, which makes the component dependent on the global DOM. Using `filterForm.querySelector(...)` would make the component more isolated and easier to test.

```ts
const categorySelect = filterForm.querySelector('#category') as HTMLSelectElement;
```

- **Separation of UI and logic.**
Currently, the component creates the form, updates the global state, and calls filtering. Moving the filtering outside (for example, via a callback) will make the component cleaner and more reusable.

Example idea:

``ts
filterForm.addEventListener('submit', e => {
e.preventDefault();
onFilter({ category, level });
});
```

- **Avoid duplicate transformations.**
`toCategory` and `toLevel` are called twice – you can save the result once and use it.

``ts
const category = toCategory(choosenCategory);
const level = toLevel(choosenLevel);
```

### A small example of how this could look a little neater

```ts
const category = toCategory(categorySelect.value);
const level = toLevel(levelSelect.value);

QuestionsState.selectedCategory = category;
QuestionsState.selectedLevel = level;
```

---

If you'd like, I can help you rewrite the component in a cleaner, more modular style, but without changing the behavior—just improving the structure.