# Code Review: Task Manager

Files reviewed: `index.html`, `script.js`, `style.css`, `README.md`

**Short summary:** The UI looks nice and the dark theme idea is good. But the app is **not finished**. Many buttons do nothing, data is lost on reload, and the code has a lot of copy-paste. Fix the bugs first, then clean up the code.

---

## 1. Big Picture (Read This First)

| Area | Status |
|------|--------|
| Add task | Works, but allows empty tasks |
| Delete task | Looks like it works, but the task comes back |
| Complete task | Works on screen, but is **not saved** |
| Filters (All / Active / Completed) | Filter works, but the button highlight never changes |
| "No tasks" message | Never shows |
| Task counter | Always says "0 active tasks" |
| Clear Completed button | Does nothing |
| Dark theme | Works, but many parts are not styled |
| Result message (`#result`) | Never used |

---

## 2. Bugs (Things That Are Broken)

### JavaScript bugs

1. **`alert("JavaScript is working!")` on line 1.**
   This is test code. It pops up every time the page loads. Remove it.

2. **Deleted tasks come back.**
   Delete only does `li.remove()`. It removes the item from the screen, but not from the `tasks` array or from `localStorage`.
   Reload the page, or add a new task, and the deleted task is back.

3. **Completed state is not saved.**
   Checking a box only adds a CSS class to the `<span>`. The `tasks` array has no `completed` field.
   Reload the page and every task is unchecked again.
   Add a new task and the whole list is rebuilt, so every check is lost.

4. **`newId = 6` is wrong.**
   The default tasks use ids `2, 32, 42, 51, 64`. After reload `newId` starts at `6` again.
   Result: two tasks can get the same id. Ids must be unique.

5. **Empty tasks are allowed.**
   `taskInput.value` is never checked. A user can add a blank task, or a task with only spaces. Use `.trim()` and stop if it is empty.

6. **`console.log(tasks[3].id)` can crash the app.**
   If `tasks` has fewer than 4 items (for example `[]` in localStorage), this line throws an error and the rest of the script stops. Remove all debug `console.log` lines.

7. **`JSON.parse` has no error handling.**
   If localStorage contains broken data, the script crashes. Wrap it in `try/catch`.

8. **Default tasks are never saved.**
   They only get saved after the user adds a new task. Until then, deleting/refresh behaves differently.

9. **Filter is not applied after adding a task.**
   Select "Completed", add a task, and the new task shows up in the wrong list because `filterTasks()` is not called after rendering.

10. **Filter buttons never change the `active` class.**
    Click "Completed" and the "All" button still looks selected.

11. **Missing features (HTML exists, JS does not):**
    - `#noTask` is never shown (and CSS hides it forever with `display: none`)
    - `#taskCount` is never updated
    - `#clearCompleted` has no click handler
    - `#result` message is never written to

12. **Theme button label is wrong.**
    `aria-label="Switch to dark mode"` never changes. In dark mode it should say "Switch to light mode".

### CSS bugs

1. **Clear Completed hover is unreadable.**
   `#clearCompleted:hover` sets background `#1f0103` (almost black) with red text. Hard to read.
2. **Delete hover colour `#470d7e` (dark purple)** is almost invisible on the dark theme.
3. **Dark mode is incomplete.** These are not styled for dark: `h1`, `.subtitle`, `#addButton`, `#taskCount`, `#clearCompleted`, `.delete-button`, `.task-footer` border. Some text can end up dark-on-dark.
4. **Layout breaks on tablets.** `padding: 90px 200px` on `.page-container` is fixed. Between 601px and about 1000px wide, the card gets very narrow. There is only one breakpoint (600px).
5. **`box-sizing: border-box` is missing globally.** It is only added inside the mobile media query, so the desktop card is wider than `max-width` says (920px + 80px padding).
6. **Body and card backgrounds are semi-transparent** (`#fcfbfb9d`, `#ffffffc2`). The look depends on what is behind them. Use solid colours.

### HTML bugs

1. **Empty line before `<!DOCTYPE html>`.** Harmless in most browsers, but the doctype should be the first thing in the file.
2. **Delete button has only an emoji (🗑) and no label.** Screen readers cannot tell what it does.
3. **Checkboxes have no label.** Screen readers read "checkbox" with no task name.
4. **Filter buttons have no `aria-pressed`.** Screen readers do not know which filter is on.

---

## 3. Best Practices: JavaScript

### 3.1 Do not repeat code (biggest problem)

The "create `li`, checkbox, span, delete button" block is **copy-pasted twice** (lines 66–96 and 127–153). If you fix a bug in one, the other stays broken.

Put it in **one function**:

```js
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach(function (task) {
        // build the li here, once
    });
}
```

Call `renderTasks()` on page load, after add, after delete, after toggle, after filter.

### 3.2 Keep one source of truth

Right now the truth is split between the **array** and the **DOM** (checked boxes, CSS classes). That is why the bugs above happen.

Rule: **the `tasks` array is the only truth.** Change the array, save it, then re-render.

```js
let tasks = [
    { id: 1, text: "Learn JavaScript", completed: false }
];
```

### 3.3 Use event delegation

Do not add a new listener to every checkbox and every delete button. Add **one** listener on `taskList` and check `event.target`. Store the id in `li.dataset.id`.

### 3.4 Use unique ids

Use `Date.now()` or `crypto.randomUUID()` instead of a counter like `newId++`.

### 3.5 Make small functions with one job

Suggested split:

| Function | Job |
|----------|-----|
| `loadTasks()` | read from localStorage safely |
| `saveTasks()` | write to localStorage |
| `addTask(text)` | validate and add |
| `deleteTask(id)` | remove from array |
| `toggleTask(id)` | flip `completed` |
| `renderTasks()` | draw the list, count, and empty message |
| `setTheme(name)` | set theme and button label |

### 3.6 Do not use inline styles for state

`li.style.display = "none"` is hard to maintain. Filter the array instead and only render the tasks that should be visible.

### 3.7 Other JS tips

- Use `const` for things that never change, `let` only when needed.
- Use `"use strict"` or ES modules (`<script type="module">`).
- Use arrow functions and `addEventListener` consistently.
- Use `for...of` or `.forEach` instead of manual `for (let i...)` when you do not need the index.
- Do not read the same element twice (`getElementById` once, keep in a variable).
- Naming: `taskform` vs `taskInput`. Pick one style (camelCase) and use it everywhere, including HTML ids.
- Remove all `console.log` before committing.
- Add `{ once: true }` or cleanup only where needed. Not needed here, but know it exists.
- Put your localStorage keys in constants: `const TASKS_KEY = "tasks";`.

### 3.8 Comments in JS are bad

The current comments are not useful and look unprofessional:

```js
//what happens when the website opens ??????//
//whatt happens when u click the button?? //
document.body.classList.toggle("dark-mode"); //html e CSS er Class thakte pare, ...
```

Problems: typos, question marks, mixed languages, and they explain *what* the line does instead of *why*.

Good comments are short and explain the reason:

```js
// Load saved theme before first paint to avoid a light-mode flash
```

Better still: use clear function names so most comments are not needed.

---

## 4. Best Practices: CSS

### 4.1 Use classes, not ids (very important)

The CSS styles many things by `#id`:

```css
#taskform, #taskInput, #addButton, #taskList, #noTask,
#taskCount, #clearCompleted, #themeToggle, #result
```

Why this is bad:
- An id has **high specificity**. It is hard to override later.
- An id can only be used **once** on the page. You cannot reuse the style.
- Dark mode needs long selectors like `body.dark-mode #allFilter.active`.

Rule: **ids are for JavaScript hooks and links. Classes are for styling.**

Before:

```css
#addButton { ... }
#addButton:hover { ... }
body.dark-mode #addButton { ... }
```

After:

```css
.btn { ... }
.btn:hover { ... }
.btn--primary { ... }
```

Suggested class names (BEM style):

| Now | Better |
|-----|--------|
| `#taskform` | `.task-form` |
| `#taskInput` | `.task-form__input` |
| `#addButton` | `.btn .btn--primary` |
| `#taskList` | `.task-list` |
| `#noTask` | `.empty-message` |
| `#taskCount` | `.task-count` |
| `#clearCompleted` | `.btn .btn--danger` |
| `#themeToggle` | `.theme-toggle` |
| `#allFilter` etc. | `.filter-button` (already a class, use it!) |

Also `#taskList li` should be `.task-item` (put the class on the `li`).

### 4.2 Use CSS variables (custom properties)

Colours are hard-coded all over the file, and dark mode repeats almost every rule. Use variables once:

```css
:root {
    --bg: #f7f7f9;
    --card: #ffffff;
    --text: #12101b;
    --muted: #747d91;
    --border: #e0e4eb;
    --accent: #c5fa36;
}

body.dark-mode {
    --bg: #0b1220;
    --card: #061125;
    --text: #f5f7ff;
    --muted: #93a4c0;
    --border: #2c3b56;
}

.task-card {
    background: var(--card);
    color: var(--text);
}
```

Result: dark mode becomes about 10 lines instead of 70, and nothing gets forgotten (see Bug CSS-3).

### 4.3 Do not repeat yourself

- `body.dark-mode .task-card` copies `width`, `max-width`, `padding`, `border-radius`, `box-shadow` from `.task-card`. Only the colour changes. With variables this rule is not needed.
- Mobile query repeats `min-width: 0`, `overflow-wrap: anywhere`, `flex-wrap: wrap` that are already set above.
- Button styles (`padding`, `border: none`, `border-radius`, `cursor: pointer`) are repeated in 4 places. Make a shared `.btn` class.

### 4.4 Comments in CSS

The file has almost no comments (only one: `/* Light/Dark mode toggle button */`). Add short section headers so people can find things:

```css
/* ===== Variables ===== */
/* ===== Base ===== */
/* ===== Layout ===== */
/* ===== Components: buttons, form, task item ===== */
/* ===== Dark theme ===== */
/* ===== Responsive ===== */
```

Do not comment every line. Comment sections and non-obvious choices only.

### 4.5 Other CSS tips

- Add a small reset: `*, *::before, *::after { box-sizing: border-box; }`
- Use `rem` for font sizes (not `px`) so users who change browser font size are respected.
- Use `max-width` + `padding: clamp(...)` or `min()` instead of fixed `200px` side padding.
- Use `mobile-first`: write the small-screen style first, then `@media (min-width: ...)` for bigger screens.
- Add `prefers-color-scheme: dark` so the first visit follows the user's system theme.
- Add `transition` on hover/focus for a smoother feel.
- Remove useless rules: `min-height: 0` on `#result`, stray space in `display: none ;`, trailing space in `flex-shrink: 0; `.
- Keep indentation and blank lines consistent (some places have 1, 2, or 3 blank lines).
- Make sure text contrast is at least 4.5:1 (check `#747d91` on white, `#969dad` on white, and `#204ebb` on dark).
- Do not rely on colour only for state. The completed task also uses line-through, which is good.

---

## 5. Best Practices: HTML

1. **Use semantic tags.** Replace generic `div`s:
   ```html
   <main class="page-container">
       <section class="task-card">
           <header> <h1>...</h1> <p>...</p> </header>
   ```
   Use `<footer>` for the task footer, `<nav>` or `role="group"` for the filter buttons.
2. **Add a visible `<label>` for the input** (or keep `aria-label` at minimum, which you did well).
3. **Add `aria-label` to icon-only buttons**, e.g. `aria-label="Delete task: Learn JavaScript"`.
4. **Use `aria-pressed`** on filter buttons, and update it in JS.
5. **Update the theme button `aria-label`** when the theme changes.
6. **Put `aria-live="polite"` on the task count** so screen readers hear the change.
7. **Add `<meta name="description">`** and a favicon.
8. **Move the theme button** into a `<header>` area. Right now it sits between the subtitle and the form with no layout.
9. **Use `defer` on the script:** `<script src="script.js" defer></script>`. Then it can sit in `<head>`.
10. **Required attribute on the input:** `required` and `maxlength="100"` give free validation.
11. **Consistent naming:** `taskform` (all lowercase) vs `taskInput` (camelCase). Pick one. kebab-case is common for ids/classes in HTML.
12. **Remove the blank line at the top** of `index.html` and `style.css`.
13. **Do not use both `id` and `class`** on the same element unless JS really needs the id.
14. **Fix the `data-filter` idea:** you already have `data-filter="all"` on the buttons, but JS ignores it and uses three separate listeners with three ids. Use `data-filter` with one listener. This removes `allFilter`, `activeFilter`, `completedFilter` ids completely.

Example of one listener for all filters:

```js
filterButtons.addEventListener("click", function (event) {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    currentFilter = button.dataset.filter;
    renderTasks();
});
```

---

## 6. Dark Theme: Specific Notes

- Theme is read from `localStorage` at the *bottom* of the page load, so a user in dark mode may see a quick white flash. Fix: add a tiny inline script in `<head>` that sets the class before the page paints.
- Do not use emoji text as the only icon system; they look different on every OS. Consider SVG icons.
- Add `prefers-color-scheme` as the default when nothing is saved.

---

## 7. Project and Repository

- **`README.md` is nearly empty** ("Frontend Task project"). Add: what the app does, how to run it (open `index.html`), features list, screenshot, and known issues.
- **No folder structure.** Suggested:
  ```
  Task-Manager/
  ├── index.html
  ├── css/style.css
  ├── js/script.js
  └── README.md
  ```
- **No `.gitignore`.**
- **Commit messages are weak.** Examples: `dark theke colour added`, `flexible for mobile design`. Use clear English in present tense: `Add dark theme toggle`, `Fix deleted tasks reappearing`. One change per commit.
- **No linter or formatter.** Add Prettier and ESLint (or at least the VS Code "Format on save"). This would fix the messy indentation automatically.
- **Work directly on `main`.** Use a branch per feature and merge.
- **No tests.** For a small app, at least write a manual test checklist in the README.

---

## 8. Priority To-Do List

### Must fix first
- [ ] Remove `alert(...)` and all `console.log`
- [ ] Add `completed` to each task object and save it
- [ ] Delete from the array and `localStorage`, not just the screen
- [ ] Merge the two render loops into one `renderTasks()` function
- [ ] Block empty/whitespace tasks
- [ ] Fix id generation (unique ids)
- [ ] Wrap `JSON.parse` in `try/catch`

### Finish the features
- [ ] Update the task counter
- [ ] Show the "No tasks to show" message
- [ ] Make "Clear Completed" work
- [ ] Highlight the active filter button
- [ ] Show messages in `#result` (e.g. "Task added", "Please type a task")

### Clean up CSS and HTML
- [ ] Replace ids with classes in CSS
- [ ] Add CSS variables and shrink the dark theme block
- [ ] Fix missing dark styles and bad hover colours
- [ ] Add global `box-sizing: border-box` and a tablet breakpoint
- [ ] Use semantic HTML tags and add aria labels
- [ ] Use `defer` on the script

### Polish
- [ ] Rewrite the comments (short, English, explain "why")
- [ ] Write a real README
- [ ] Use folders and better commit messages
- [ ] Add Prettier / ESLint

---

## 9. What Was Done Well

- Good use of `textContent` instead of `innerHTML` for task text. This prevents XSS (script injection). Keep doing this.
- Good `:focus-visible` styles on buttons.
- `aria-label` on the input and `role="status"` on the result line.
- `<meta name="viewport">` and a mobile media query are present.
- The theme choice is saved and loaded from `localStorage`.
- `overflow-wrap: anywhere` handles long task text.
- `type="button"` is used on non-submit buttons, which avoids accidental form submits.

Keep going. The structure is a good start, and most problems above are normal for a first version.
