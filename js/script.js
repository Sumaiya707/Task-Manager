const TASKS_STORAGE_KEY = "tasks";
const THEME_STORAGE_KEY = "theme";
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const noTask = document.getElementById("noTask");
const allFilter = document.getElementById("allFilter");
const activeFilter = document.getElementById("activeFilter");
const completedFilter = document.getElementById("completedFilter");
const themeToggle = document.getElementById("themeToggle");
const clearCompleted = document.getElementById("clearCompleted");
const result = document.getElementById("result");

// Set the theme when the website opens

function setTheme() {
  if (localStorage.getItem(THEME_STORAGE_KEY) === "dark") {
    document.documentElement.classList.add("dark-mode");
    themeToggle.innerHTML =
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>';
    themeToggle.setAttribute("aria-label", "Switch to light mode");
  } else {
    document.documentElement.classList.remove("dark-mode");
    themeToggle.innerHTML =
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 15A8 8 0 0 1 9 4a8 8 0 1 0 11 11Z"/></svg>';
    themeToggle.setAttribute("aria-label", "Switch to dark mode");
  }
}

setTheme();
// What happens when you click the theme button?
// Switch between light and dark mode

themeToggle.addEventListener("click", function () {
  if (document.documentElement.classList.contains("dark-mode")) {
    localStorage.setItem(THEME_STORAGE_KEY, "light");
  } else {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
  }

  setTheme();
});

// Load saved tasks

function loadTasks() {
  let savedTasks;

  try {
    savedTasks = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY));
  } catch {
    savedTasks = null;
  }

  if (!Array.isArray(savedTasks)) {
    savedTasks = [
      { id: 2, text: "Learn JavaScript", completed: false },
      { id: 32, text: "Build a to-do list", completed: false },
      { id: 42, text: "Practice DOM manipulation", completed: false },
      { id: 51, text: "Save tasks in local storage", completed: false },
      { id: 64, text: "Make it look good", completed: false },
    ];

    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(savedTasks));
  }

  savedTasks.forEach(function (item) {
    if (item.completed === undefined) {
      item.completed = false;
    }
  });

  return savedTasks;
}

let tasks = loadTasks();

function saveTasks() {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}
let currentFilter = "all";
// Handle all filter button clicks in one listener.
const filterButtons = document.getElementById("filterButtons");

filterButtons.addEventListener("click", function (event) {
  const selectedFilter = event.target.dataset.filter;

  if (selectedFilter) {
    currentFilter = selectedFilter;
    filterTasks();
  }
});

// The one shared task-rendering function
function renderTasks() {
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter(function (task) {
    if (currentFilter === "active") {
      return task.completed === false;
    }

    if (currentFilter === "completed") {
      return task.completed === true;
    }

    return true;
  });
  for (let i = 0; i < filteredTasks.length; i++) {
    const li = document.createElement("li");
    li.dataset.taskId = filteredTasks[i].id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = filteredTasks[i].completed || false;

    checkbox.setAttribute(
      "aria-label",
      "Mark task as complete: " + filteredTasks[i].text,
    );
    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = filteredTasks[i].text;
    span.classList.toggle("completed", checkbox.checked);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "🗑";
    deleteButton.className = "delete-button";
    deleteButton.setAttribute(
      "aria-label",
      "Delete task: " + filteredTasks[i].text,
    );

    li.append(checkbox, span, deleteButton);
    taskList.appendChild(li);
  }
}
// Toggle a task's completed status
function toggleTask(taskId, isCompleted) {
  const task = tasks.find(function (item) {
    return String(item.id) === taskId;
  });

  if (!task) {
    return;
  }

  task.completed = isCompleted;

  saveTasks();
  updateTaskCount();
  filterTasks();
}

// Handle checkbox changes using event delegation
taskList.addEventListener("change", function (event) {
  if (!event.target.classList.contains("task-checkbox")) {
    return;
  }

  const li = event.target.closest("li");
  const taskId = li.dataset.taskId;

  toggleTask(taskId, event.target.checked);
});
// Delete a task
function deleteTask(taskId) {
  tasks = tasks.filter(function (item) {
    return String(item.id) !== taskId;
  });

  saveTasks();
  result.textContent = "Task deleted successfully!";

  filterTasks();
  updateTaskCount();
}
// Handle delete clicks using event delegation

taskList.addEventListener("click", function (event) {
  const deleteButton = event.target.closest(".delete-button");
  if (!deleteButton || !taskList.contains(deleteButton)) {
    return;
  }
  const li = deleteButton.closest("li");
  const taskId = li.dataset.taskId;
  deleteTask(taskId);
});

// Filter tasks

function filterTasks() {
  renderTasks();
  updateFilterButtons();
  updateNoTaskMessage();
}

// Update the selected filter button

function updateFilterButtons() {
  allFilter.classList.toggle("active", currentFilter === "all");
  allFilter.setAttribute("aria-pressed", currentFilter === "all");

  activeFilter.classList.toggle("active", currentFilter === "active");
  activeFilter.setAttribute("aria-pressed", currentFilter === "active");

  completedFilter.classList.toggle("active", currentFilter === "completed");
  completedFilter.setAttribute("aria-pressed", currentFilter === "completed");
}

// Show or hide the empty-state message

function updateNoTaskMessage() {
  if (taskList.children.length === 0) {
    noTask.style.display = "block";
  } else {
    noTask.style.display = "none";
  }
}

// Update the active task count

function updateTaskCount() {
  const taskCount = document.getElementById("taskCount");

  const activeTasks = tasks.filter(function (item) {
    return item.completed === false;
  });

  taskCount.textContent = activeTasks.length + " active tasks";
}

// Add a task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    result.textContent = "Please enter a task.";
    taskInput.focus();
    return;
  }
  tasks.push({
    id: crypto.randomUUID(),
    text: taskText,
    completed: false,
  });

  result.textContent = "Task added successfully!";
  saveTasks();
  taskInput.value = "";
  filterTasks();
  updateTaskCount();
}

// Handle form submission
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  addTask();
});
// Clear completed tasks
function clearCompletedTasks() {
  const completedCount = tasks.filter(function (item) {
    return item.completed === true;
  }).length;

  tasks = tasks.filter(function (item) {
    return item.completed === false;
  });

  if (completedCount > 0) {
    result.textContent = "Completed tasks cleared successfully!";
  } else {
    result.textContent = "There are no completed tasks to clear.";
  }

  saveTasks();
  filterTasks();
  updateTaskCount();
}
// Handle clear completed button click
clearCompleted.addEventListener("click", function () {
  clearCompletedTasks();
});
// Render tasks when the website first opens

filterTasks();
updateTaskCount();
