# Task Manager — Master Fix Checklist

Based on the issues listed in `CODE_REVIEW.md`.

## Phase 1 — Fix JavaScript Bugs

- [x] Remove the test `alert(...)` and all debug `console.log` statements.
- [x] Fix task deletion so deleted tasks stay deleted after refresh.
- [x] Add a `completed` property to every task object.
- [x] Save checkbox completion changes to `localStorage`.
- [x] Generate unique task IDs instead of resetting `newId` to `6`.
- [x] Prevent empty and whitespace-only tasks using `.trim()`.
- [x] Handle invalid `localStorage` JSON using `try/catch`.
- [x] Save the default task data consistently.
- [x] Fix filtering after a new task is added.
- [x] Update the active filter button's visual state.

## Phase 2 — Complete Missing Features

- [x] Update the active task counter.
- [x] Show the empty-state message when appropriate.
- [x] Implement the **Clear Completed** button.
- [x] Display useful feedback in the result message.
- [x] Update the theme button's `aria-label` when the theme changes.

## Phase 3 — Improve JavaScript Structure

- [x] Create one `renderTasks()` function instead of duplicated rendering code.
- [ ] Use the `tasks` array as the single source of truth.
- [x] Use event delegation for task checkboxes and delete buttons.
- [x] Create small functions with one job:
  - [x] `loadTasks()` — read from `localStorage` safely.
  - [x] `saveTasks()` — write to `localStorage`.
  - [x] `addTask()` — validate and add a task.
  - [x] `deleteTask()` — remove a task from the array.
  - [x] `toggleTask()` — change the `completed` state.
  - [x] `renderTasks()` — draw the list, counter, and empty message.
  - [x] `setTheme()` — set the theme and button label.
- [x] Filter the task array instead of hiding elements with inline styles.
- [x] Use `const` and `let` correctly and keep naming consistent.
- [x] Use one listener for all filter buttons through `data-filter`.
- [x] Improve comments: keep them short, in English, and explain why.
- [x] Store `localStorage` keys in constants.

## Phase 4 — Fix CSS and Responsive Design

- [x] Replace styling IDs with reusable CSS classes where appropriate.
- [x] Introduce CSS variables for colours, backgrounds, borders, and text.
- [x] Complete dark-mode styling for headings, buttons, counter, and footer.
- [x] Fix the **Clear Completed** and delete-button hover colours.
- [x] Add global `box-sizing: border-box`.
- [x] Fix fixed `200px` side padding that breaks tablet layouts.
- [x] Add a tablet breakpoint in addition to the mobile breakpoint.
- [x] Use solid background colours instead of semi-transparent colours.
- [x] Remove duplicate and unnecessary CSS rules.
- [x] Use consistent spacing, section comments, and `rem` font sizes.
- [x] Check text contrast and add smooth hover/focus transitions.
- [x] Consider mobile-first CSS and system dark-mode preference.

## Phase 5 — Improve HTML and Accessibility

- [x] Remove the blank line before `<!DOCTYPE html>`.
- [x] Use semantic `main`, `section`, `header`, `nav`, and `footer` elements appropriately.
- [x] Add a visible label to the task input.
- [x] Give icon-only delete buttons accessible labels.
- [x] Give each checkbox an accessible task-specific label.
- [x] Add and update `aria-pressed` on filter buttons.
- [x] Add `aria-live="polite"` to the task counter.
- [x] Add a meta description and favicon.
- [x] Place the theme toggle appropriately in the header.
- [x] Use `defer` on the external script.
- [x] Add `required` and `maxlength="100"` to the task input.
- [x] Use consistent HTML ID naming.
- [x] Remove redundant IDs/classes where possible.

## Phase 6 — Theme Improvements

- [x] Prevent the light-theme flash when a saved dark theme is loaded.
- [x] Consider a small inline script in `<head>` for early theme initialization.
- [x] Consider SVG icons instead of emoji-only controls.
- [x] Use the system colour preference when no theme is saved.

## Phase 7 — Project and GitHub Quality

- [x] Write a complete `README.md` with the app's purpose, features, setup instructions, screenshot, and known issues.
- [ ] Organize files into `css/` and `js/` folders if appropriate.
- [ ] Add a suitable `.gitignore`.
- [ ] Use clear, specific English commit messages.
- [ ] Work on feature branches and merge changes into `main`.
- [ ] Set up Prettier or use VS Code **Format on Save**.
- [ ] Consider ESLint for JavaScript checks.
- [ ] Add a manual test checklist to the README.

## Recommended Fix Order

1. Fix data and persistence: deletion, completion state, unique IDs, safe loading, and saving.
2. Complete functionality: validation, filters, counter, empty message, Clear Completed, and result messages.
3. Refactor JavaScript: one rendering function, one source of truth, reusable functions, and event delegation.
4. Fix CSS and HTML: responsive layout, dark theme, accessibility, and semantic markup.
5. Polish the project: README, formatting, testing, and clean Git commits.

## Important Notes

- This checklist is based on the findings in `CODE_REVIEW.md`.
- The review identifies issues in `index.html`, `script.js`, `style.css`, and `README.md`; verify each issue against the latest version of your files before changing it.
- Preserve features that already work. Fix one related group at a time and test each change in the browser.
