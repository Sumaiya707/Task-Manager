# ✨ Task Manager

### Organize your tasks. Focus on what matters. Get things done.

A clean, responsive, and interactive task management web application built with **HTML5, CSS3, and Vanilla JavaScript**. Designed to make everyday task organization simple, intuitive, and visually appealing.

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Responsive-Design-2ea44f?style=for-the-badge" alt="Responsive Design" />
</p>

<p align="center">
  <a href="https://github.com/Sumaiya707/Task-Manager">Explore the Repository</a>
  ·
  <a href="https://github.com/Sumaiya707/Task-Manager/issues">Report an Issue</a>
</p>

---

## 🌿 Overview

Task Manager is a frontend web development project that helps users organize everyday tasks through a simple and intuitive interface.

Users can create tasks, track their progress, filter tasks by completion status, and switch between light and dark themes. The application uses the browser's **Local Storage API** to retain tasks and theme preferences between visits.

The project focuses on practical functionality, responsive design, accessibility, and a clean user experience while demonstrating core frontend development concepts.

## 📸 Screenshot

<p align="center">
  <img src="screenshot.png" alt="Task Manager application showing the task list, filters, and theme toggle" width="800" />
</p>

<p align="center">
  <em>Task Manager — a simple and responsive way to organize everyday tasks.</em>
</p>

> **Note:** Save a screenshot of your running application as `screenshot.png` in the root directory of the repository. Replace the image path above if you use a different filename or folder.

## 🚀 Features

<table>
  <tr>
    <td width="50%">
      <h3>📝 Task Management</h3>
      Add new tasks and delete tasks that are no longer needed.
    </td>
    <td width="50%">
      <h3>✅ Progress Tracking</h3>
      Mark tasks as completed or active and update their status whenever needed.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🔎 Task Filtering</h3>
      View all tasks, only active tasks, or only completed tasks.
    </td>
    <td width="50%">
      <h3>🌙 Theme Switching</h3>
      Switch between light and dark themes with a dedicated theme toggle.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>💾 Data Persistence</h3>
      Retain tasks and theme preferences using browser Local Storage.
    </td>
    <td width="50%">
      <h3>📱 Responsive Design</h3>
      Use the application on desktop computers and smaller screens.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🧹 Clear Completed Tasks</h3>
      Remove completed tasks together using the Clear Completed control.
    </td>
    <td width="50%">
      <h3>♿ Accessibility</h3>
      Use semantic HTML, accessible control labels, and visible keyboard focus styles.
    </td>
  </tr>
</table>

## 🛠️ Built With

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and semantic elements |
| CSS3 | Styling, layout, responsive design, and light/dark themes |
| Vanilla JavaScript | DOM manipulation, event handling, and task management logic |
| Local Storage API | Saving tasks and theme preferences in the browser |
| Git | Tracking changes and managing development history |
| GitHub | Hosting the repository and managing project versions |

No frontend framework, backend server, or package installation is required to run the basic application.

## ⚡ Getting Started

Follow these steps to run the project locally.

### Prerequisites

- A modern web browser, such as Google Chrome, Microsoft Edge, or Firefox.
- Git (optional if you download the repository as a ZIP file).
- Visual Studio Code (recommended for editing the project).

### Installation

**1. Clone the repository**

Open your terminal and run:

```bash
git clone https://github.com/Sumaiya707/Task-Manager.git
```

**2. Navigate to the project directory**

```bash
cd Task-Manager
```

**3. Open the project**

Open the project folder in Visual Studio Code:

```bash
code .
```

Alternatively, open `index.html` directly in your browser.

**4. Run the application**

For a convenient development experience, open the project in VS Code and use the Live Server extension to launch `index.html`.

That's it! No build process or dependency installation is required.

## 📂 Project Structure

```text
Task-Manager/
├── index.html       # Application structure and content
├── style.css        # Styling, themes, and responsive layout
├── script.js        # Task management and interaction logic
├── favicon.png      # Browser tab icon
├── screenshot.png   # Application screenshot for this README
└── README.md        # Project documentation
```

> The structure above assumes `favicon.png` and `screenshot.png` are stored in the repository's root directory. Adjust the paths if your files are organized differently.

## 🧪 Manual Testing Checklist

Use this checklist to verify the application's main features before publishing changes.

### Task Management

- [ ] Add a task using the input field and Add button.
- [ ] Verify that an empty or whitespace-only task cannot be added.
- [ ] Verify that a task longer than the permitted character limit cannot be submitted.
- [ ] Mark a task as completed using its checkbox.
- [ ] Mark a completed task as active again.
- [ ] Delete an individual task.
- [ ] Clear all completed tasks using the Clear Completed control.

### Filtering and Display

- [ ] Select **All** and verify that active and completed tasks appear.
- [ ] Select **Active** and verify that only incomplete tasks appear.
- [ ] Select **Completed** and verify that only completed tasks appear.
- [ ] Verify that the active filter is visually distinguishable.
- [ ] Verify that the empty-state message appears when the selected filter has no matching tasks.
- [ ] Verify that the active task count updates after adding, completing, or deleting tasks.

### Data Persistence

- [ ] Add a task and refresh the page; verify that the task remains.
- [ ] Complete a task and refresh the page; verify that its completion status remains.
- [ ] Change the theme and refresh the page; verify that the selected theme remains.
- [ ] Close and reopen the browser page and verify that saved data is retained.

### Theme, Responsiveness, and Accessibility

- [ ] Switch between light and dark themes.
- [ ] Verify that the page layout works on a desktop screen.
- [ ] Verify that the page layout works on a mobile-sized screen.
- [ ] Navigate through interactive controls using the keyboard.
- [ ] Verify that keyboard focus is visible.
- [ ] Verify that the input has a visible label and icon-only buttons have accessible labels.
- [ ] Verify that the theme toggle's accessible label reflects its action.

## ⚠️ Known Issues and Limitations

- **Browser-specific storage:** Tasks and theme preferences are stored in the current browser's Local Storage. They are not automatically synchronized across browsers, devices, or user accounts.
- **Local data can be cleared:** Clearing the browser's site data may remove saved tasks and theme preferences.
- **No backend synchronization:** The application does not currently use a server or database to store user information.

These are current architectural limitations rather than necessarily application bugs. Add any confirmed bugs here as you discover them.

## 💡 What I Learned

Building this project helped me practice and improve my understanding of:

- Structuring web pages with HTML5 and semantic elements.
- Styling interfaces with CSS and responsive media queries.
- Selecting and updating HTML elements through the DOM.
- Handling user interactions with JavaScript event listeners.
- Working with arrays and objects to manage task data.
- Implementing task completion and filtering logic.
- Saving and retrieving data with the Local Storage API.
- Improving usability with accessible labels and keyboard focus styles.
- Using Git, branches, commits, and GitHub to manage project changes.
- Organizing a frontend project and documenting its functionality.

## 🗺️ Future Improvements

Potential enhancements for future versions include:

- [ ] Edit existing tasks.
- [ ] Add due dates and task priorities.
- [ ] Add search functionality.
- [ ] Support drag-and-drop task ordering.
- [ ] Improve accessibility and keyboard navigation.
- [ ] Add automated tests.
- [ ] Introduce code formatting and linting tools.
- [ ] Consider optional cloud synchronization in a future version.

## 🤝 Contributing

Suggestions, bug reports, and improvements are welcome.

1. Fork the repository.
2. Create a feature branch for your changes.
3. Make and test your changes.
4. Commit your work with a clear, descriptive commit message.
5. Open a pull request describing the changes.

For bugs or suggestions, you can also [open an issue](https://github.com/Sumaiya707/Task-Manager/issues).

## 👩‍💻 Author

**Sumaiya**

- GitHub: [@Sumaiya707](https://github.com/Sumaiya707)
- Project Repository: [Task Manager](https://github.com/Sumaiya707/Task-Manager)

---

<p align="center">
  <strong>Built with curiosity, consistency, and a passion for learning. 💚</strong>
  <br />
  If you find this project interesting, consider giving the repository a ⭐
</p>

