## 26.03.2026

I try to understand why a code which was (or not was?) checked by husky shows errors in CI workflow.
What we must know:
1. **Husky doesn't check everything - only modified files are checked.**
2. Different rules/configurations - in CI, it can be:
- stricter ESLint
- different tsconfig
- or just a clean install of dependencies
3. Errors appeared AFTER the commit: commit -> pulls from develop -> conflicts
**Husky was checking the old condition, but CI was already checking the new one**

### Prepare an instruction git workflow:
(How to avoid merge conflicts)[]

### To do:

1. Fix quiz questions array - I think it's better to shuffle it, so choosing same filters user see different questions (the same questions will be random shuffled)
   

### Team work:

1. Assist if needed in resolve merge conflicts
2. Specify and fix common instances in the code
3. What about styling?