# NataliItaly self assessment

## My components

| Component | Features |
|-----------|----------|
| Router | I implemented a simple client-side router in pure TypeScript without using any frameworks. The goal of this component is to handle navigation in a single-page application (SPA) by mapping URL paths to rendering functions.

### Key Responsibilities
- Managing application routes
- Handling browser navigation events
- Rendering the correct view based on the current URL
- Protecting certain routes with a basic authentication guard
- Design Overview

Each route is defined using the Route type:
- path: a string representing the URL path
- render: a function that renders the corresponding view
- protected (optional): indicates whether the route requires authentication

The router receives two dependencies via the constructor:
- A list of routes
- An isAuth function, which determines whether the user is authenticated

This approach keeps the router flexible and decoupled from any specific authentication implementation.

### Core Functionality
Initialization
- The init() method sets up event listeners for:
- popstate — triggered when the user navigates with browser back/forward buttons
- DOMContentLoaded — ensures the correct route is rendered on initial page load
- It also immediately calls handleLocation() to render the current route.

### Navigation - navigate(path: string) method:
- Updates the browser history using history.pushState
- Calls handleLocation() to render the new route

**This enables SPA-style navigation without page reloads.**

### Route Handling
The handleLocation() method:
- Reads the current path from window.location.pathname
- Finds a matching route in the route list
- Handles three cases:
  - Route not found - Displays a simple 404 message
  - Protected route without authentication - Redirects the user to the root path ("/")
  - Valid route - Calls the route’s render() function

### Notable Features
- Lightweight and framework-free
The router is implemented using only browser APIs, making it easy to understand and extend.
- Dependency injection
Authentication logic is passed in as a function, which improves testability and separation of concerns.
- Basic route protection
The protected flag provides a simple way to restrict access to certain views.
- History API usage
Uses pushState and popstate to maintain clean URLs and support browser navigation.


### Limitations and Possible Improvements
- Exact path matching only
Currently, routes are matched strictly by string equality. Supporting dynamic routes (e.g., /quiz/:id) would improve flexibility.
- No query parameter handling
The router ignores query strings and hash fragments.
- Simple 404 handling
The fallback UI is minimal and could be replaced with a dedicated view.
- No async handling
The router assumes synchronous rendering. Supporting async views could improve scalability.
- No route guards beyond auth
Additional guard logic (e.g., role-based access) could be added.|

| Dashboard | I implemented the Dashboard view and a reusable Filters Form using pure TypeScript and direct DOM manipulation, without relying on any UI frameworks. This was a deliberate choice to focus on core browser APIs, component structure, and state interaction.

The Dashboard acts as a navigation entry point, while the Filters Form is responsible for configuring quiz parameters and updating the application state accordingly.

The renderDashboard function is a simple UI entry point that:
- Renders basic navigation controls
- Handles user logout
- Redirects users to the quiz page

### Responsibilities
- Provide navigation between core parts of the application
- Integrate with the router for SPA navigation
- Control authentication state via setAuth

### Key Design Choices
- Stateless rendering function
The component does not store internal state, relying entirely on external dependencies (router, setAuth).
- Explicit event binding
Event handlers are attached directly after rendering, making the flow easy to follow and debug.
- Router integration
Navigation is delegated to the router, keeping responsibilities clearly separated.

### Filters Form Component
The renderFiltersForm function is a more complex UI component responsible for filtering quiz questions based on user-selected criteria.

### Responsibilities
- Render a dynamic form based on predefined filter options
- Collect and transform user input
- Update application state
- Provide user feedback via a temporary popup

### Form Structure and Rendering
The form is generated dynamically using a helper function (createElement), which abstracts DOM creation and improves readability.

Filter options include:
- Category (e.g., HTML, CSS & SCSS, JS & TS)
- Difficulty level (easy, medium, hard)
- Mode (Train, Exam)

Each filter is rendered as a <select> element with options generated programmatically. This makes the component easily extensible.

### State Management Integration

On form submission:
1. Default form behavior is prevented
2. Selected values are extracted from the DOM
3. Values are converted into strongly typed domain values using helper functions:
- toCategory
- toLevel
- toMode
4. The quiz state is reset and updated:
- clearQuiz() removes previous data
- updateQuiz() initializes new quiz settings
5. A shared questionFilter object is updated

This demonstrates a clear separation between:
- UI layer (form)
- Transformation layer (converter functions)
- State management layer
- User Feedback

**After applying filters, a temporary popup is displayed:**
- Confirms selected filter values
- Automatically fades out and removes itself after a delay
This improves UX without adding significant complexity.

### Notable Features
- Framework-free component design
- All UI is built using native DOM APIs, demonstrating understanding of low-level mechanics.
- Reusable DOM utility (createElement)
- Reduces boilerplate and improves maintainability.
- Type-safe data flow
- Conversion functions ensure that raw user input is transformed into controlled domain values.
- Explicit state transitions
- State updates are predictable and easy to trace.
- Separation of concerns
- Rendering, state updates, and data transformation are clearly divided.

### Limitations and Possible Improvements
- Tight coupling to DOM via IDs
Direct use of getElementById could be replaced with scoped queries or component encapsulation.
- No reactive updates
UI does not automatically respond to state changes (no observer pattern or reactivity system).
- Manual event management
Could become harder to scale as the application grows.
- Global mutable state (questionFilter)
Could be improved with a more structured state management approach.
- Popup lifecycle management
The timing logic is simple and could be made more robust.

### Justification of Approach
Although the implementation is relatively simple, it reflects an intentional focus on:
- understanding core JavaScript and browser behavior
- building components without abstraction layers
- maintaining full control over rendering and state flow

|
| Loader | The renderLoader function is a small, focused UI utility that creates and returns a loading indicator element.

### What it does well
- Encapsulated UI element
The loader is implemented as a self-contained function that returns a ready-to-use DOM element. This makes it easy to reuse across different parts of the application.
- Separation of structure and styling
The component only defines the DOM structure, while all visual behavior (spinner animation, layout, accessibility) is handled via CSS. This is a clean and scalable approach.
- Use of utility (createElement)
The helper function simplifies DOM creation and keeps the code readable and declarative.

### CSS Implementation
The loader styling shows several strong points:
- Custom CSS animation
The spinner uses @keyframes and layered pseudo-elements (:before, :after) to create a more visually interesting animation without external libraries.
- Efficient animation design
The use of transform: rotate() ensures good performance, as it leverages GPU acceleration.
- Accessibility consideration
The .loader__text is visually hidden but still present in the DOM, which is a good practice for screen readers.

### Quiz Screen Integration
The quizScreen function demonstrates how the loader is used in a real application flow.

Behavior:
1. A container element is created
2. The function checks if quiz questions already exist in the state
3. If data is available:
- It renders the quiz immediately
4. If not:
- It displays the loader
- It triggers an asynchronous data fetch via quizQuestionsService

### Key Strengths
- Conditional rendering based on state
The component avoids unnecessary loading states by checking existing data before triggering a fetch.
- Progressive rendering approach
The UI responds immediately by showing a loader, improving perceived performance.
- Separation of concerns
  - UI container (quizScreen)
  - Loading indicator (renderLoader)
  - Data fetching (quizQuestionsService)
- Non-blocking async call
The use of void quizQuestionsService(...) signals intentional fire-and-forget behavior, making it clear that rendering should not be blocked.

### Subtle Good Practices
- Graceful fallback
The loader acts as a fallback UI while data is being prepared.
- Reusability
The loader can be reused in any async scenario across the app.
- Minimal but effective UX
**Even with a simple implementation, the user is never left without feedback.**

### Potential Improvements
- Loader lifecycle management
Currently, removal of the loader depends on external logic. This could be made more explicit or centralized.
E- rror handling
There is no visible handling for failed data loading.
- State-driven re-rendering
The component relies on manual updates rather than a reactive pattern.
- Accessibility enhancement
Adding ARIA attributes (e.g., aria-busy) could improve accessibility further. |

| 404 Page Component | I implemented a dedicated render404Page function to handle unknown routes and display a fallback UI. Although the component is intentionally simple, it addresses an important edge case in SPA navigation and improves overall user experience.

### Responsibilities
The component is responsible for:
- displaying a clear “Page not found” message
- providing a recovery action for the user
- integrating with both the browser history and the application router

### Key Strengths
- Explicit edge-case handling
The presence of a dedicated 404 page shows that non-happy paths are considered, not just standard navigation flows.
- Clear and minimal UI
The layout is simple but functional, containing all essential elements: message, context, and user action.
- Thoughtful navigation logic
The "Back" button adapts to the user’s context:
- uses history.back() when navigation history exists
- falls back to router.navigate("/") when it does not
This ensures predictable and user-friendly behavior.
- Consistent routing integration
Using the router for fallback navigation keeps all navigation logic unified.

### UX Considerations
Even in its minimal form, the component:
- provides immediate feedback to the user
- prevents dead-end scenarios
- offers a clear and intuitive recovery path

This contributes to a more complete and robust application experience.

### Justification of Simplicity
The simplicity of this component is intentional and appropriate:
- it serves a single, well-defined purpose
- additional complexity would not provide meaningful value
- it remains easy to read, maintain, and extend
This follows the principle of keeping solutions minimal and fit for purpose.

### Possible Improvements
- use a structured DOM helper (e.g., - createElement) for consistency
- enhance styling and visual presentation
- improve accessibility (e.g., ARIA attributes)
optionally add logging for debugging invalid routes |

| UI & Interaction | I made a conscious effort to improve accessibility across all components, ensuring the application is usable for a wider range of users, including those relying on assistive technologies.

### Key Improvements
- Semantic and ARIA enhancements
I added appropriate ARIA attributes (e.g., aria-label, aria-live, aria-busy) where necessary to provide meaningful context for screen readers, especially in dynamic UI parts such as the loader and form interactions.
- Accessible form controls
All form elements are properly associated with labels, ensuring they are understandable and navigable via screen readers. The structure of the filters form supports clear input relationships and improves usability.
- Keyboard navigation support
Interactive elements such as buttons and form controls are fully accessible via keyboard. Focus behavior is predictable, and no interaction depends solely on mouse input.
- Non-visual feedback
Important UI states (e.g., loading, filter application) are communicated not only visually but also in a way that can be interpreted by assistive technologies.
- Focus on progressive enhancement
Accessibility improvements were implemented without introducing heavy dependencies, relying instead on native browser capabilities and standards.

### Result
These improvements ensure that the application:
- is more inclusive and user-friendly
- aligns better with accessibility best practices
- is closer to passing automated accessibility audits |

|Quality | Unit Tests (Full): 50% covering of my code |
|DevOps & Role| Auto-deploy
## Auto-Deploy and Development Workflow
I took a comprehensive approach to setting up the project for smooth development, testing, and automatic deployment. The goal was to create a workflow that is reliable, maintainable, and easy for other team members to follow.

### Key Actions and Strengths
- Automatic Deployment (Netlify)
I configured the project to auto-deploy on Netlify, ensuring that changes pushed to the repository are immediately reflected in the live application. This allows the team and stakeholders to see the latest updates without manual steps.
- CI/CD Workflow Setup
I set up a complete continuous integration workflow, including linting with ESLint, pre-commit hooks with Husky, and automated testing with Vitest. This ensures code quality and prevents regressions from entering the main branch.
- Project Configuration and Tooling
The project is configured with TypeScript, Vite, and modern build tools. ESLint rules and Husky hooks enforce code style and consistency across the team.
- Testing Infrastructure
Vitest is included to allow team members to write and run unit tests easily. This demonstrates foresight in building a maintainable and testable codebase.

### Comprehensive Documentation
I created clear instructions covering:
- Development setup
- Usage of provided tools and scripts
- Coding style and naming conventions
- Process guidelines for contributions and pull requests
This makes onboarding new developers faster and reduces potential errors or inconsistencies.

### Result
These actions collectively ensure that the project is:
- Automated and reliable — deploys and tests run without manual intervention
- Consistent — code style and quality are enforced through tooling
- Collaborative — documentation and workflow allow the whole team to work efficiently
- Future-proof — infrastructure supports testing, CI/CD, and easy scaling |
|Design Patterns Usage| I applied several design patterns in a lightweight and framework-free manner, focusing on clarity and control rather than over-engineering.

- Dependency Injection
Used in the Router to decouple routing logic from authentication logic.
- Factory Pattern (utility level)
The createElement helper abstracts DOM creation, reducing duplication and improving readability.
- Single Responsibility Principle
Components are designed with focused responsibilities (e.g., routing, UI rendering, state updates).
- State Management (custom lightweight store)
Quiz state is managed through dedicated functions, separating state logic from UI.
- Route Guard Pattern
Protected routes are implemented via an authentication check inside the router.
|
