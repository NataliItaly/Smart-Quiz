## 20.02.2026

On mutual decision in Discord chat the setup was choosen simple to ensure the project can be completed within limited time and team size.

### Done:

#### Setup:
- Initialized project with Vite
- Installed and configured TypeScript
- Configured ESLint with strict rules (noImplicitAny, strict mode)
- Added Prettier
- Added Husky pre-commit

#### Structure:
- Created project structure (src, components, pages, router, services, types)
- Added .gitignore
- Configured index.html entry point
- Added favicon in public folder

### Decisions:
- Using Vite without frameworks (vanilla TS SPA)
- Using strict TypeScript configuration to avoid `any`
- CSS imported via main.ts instead of link tag
- Assets stored in src/assets, static files in public/

### Challenges:
- Understanding why TS showed "No inputs were found" (the src older was absent)
- Clarifying module type (ES module vs commonjs)

### Next steps to do:
- Implement basic router - ?
- Fix next team meeting
- Define e distribute components between team members
