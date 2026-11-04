type Task = {
  id: number | string;
  text: string;
  completed: boolean;
};
const TASKS_STORAGE_KEY: string = "tasks";
const THEME_STORAGE_KEY: string = "theme";

const taskForm = document.getElementById("taskForm") as HTMLFormElement; //TYPE ASSERTION . AS FORM ELEMENT AT HTML KNOWN
const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;
const noTask = document.getElementById("noTask") as HTMLElement;
const allFilter = document.getElementById("allFilter") as HTMLButtonElement;
const activeFilter = document.getElementById(
  "activeFilter",
) as HTMLButtonElement;
const completedFilter = document.getElementById(
  "completedFilter",
) as HTMLButtonElement;
const themeToggle = document.getElementById("themeToggle") as HTMLButtonElement;
const clearCompleted = document.getElementById(
  "clearCompleted",
) as HTMLButtonElement;
const result = document.getElementById("result") as HTMLElement;

function setTheme(): void {
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
themeToggle.addEventListener("click", function (): void {
  if (document.documentElement.classList.contains("dark-mode")) {
    //"Does this class currently exist on the HTML element?"
    localStorage.setItem(THEME_STORAGE_KEY, "light");
  } else {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
  }

  setTheme(); //decides which theme to save and then calls setTheme() to apply it.
});
// Load saved tasks

function loadTasks(): Task[] {
  //union type
  let savedTasks: Task[] | null; //savedTasks will hold the tasks that JavaScript gets from the browser's saved data.

  try {
    const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    if (storedTasks) {
      savedTasks = JSON.parse(storedTasks) as Task[];
    } else {
      savedTasks = null;
    }
  } catch {
    savedTasks = null;
  }
  if (!Array.isArray(savedTasks)) {
    //“IF savedTasks is NOT a list, run the code inside these curly braces.”
    savedTasks = [
      { id: 2, text: "Learn JavaScript", completed: false },
      { id: 32, text: "Build a to-do list", completed: false },
      { id: 42, text: "Practice DOM manipulation", completed: false },
      { id: 51, text: "Save tasks in local storage", completed: false },
      { id: 64, text: "Make it look good", completed: false },
    ];

    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(savedTasks));
  }

  savedTasks.forEach(function (item: Task): void {
    if (item.completed === undefined) {
      item.completed = false;
    }
  });

  return savedTasks;
}
let tasks: Task[] = loadTasks();

function saveTasks(): void {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}
let currentFilter: string = "all";

// Handle all filter button clicks in one listener.
const filterButtons = document.getElementById("filterButtons") as HTMLElement;

filterButtons.addEventListener("click", function (event: MouseEvent) {
  // telling typscript its a mouse event click
  const selectedFilter = (event.target as HTMLElement).dataset.filter;

  if (selectedFilter) {
    currentFilter = selectedFilter;
    filterTasks();
  }
});

// The one shared task-rendering function
function renderTasks(): void {
  //responsible for updating what tasks appear on your webpage
  taskList.innerHTML = "";

  const filteredTasks: Task[] = tasks.filter(function (task: Task) {
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
    li.dataset.taskId = String(filteredTasks[i]!.id); //dataset values are always strings in JavaScript , soit converts number to the string  using string() method
    //! tells TypeScript: "I know this item exists at this index."

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = filteredTasks[i]!.completed || false;

    checkbox.setAttribute(
      "aria-label",
      "Mark task as complete: " + filteredTasks[i]!.text,
    );
    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = String(filteredTasks[i]!.text);
    span.classList.toggle("completed", checkbox.checked);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "🗑";
    deleteButton.className = "delete-button";
    deleteButton.setAttribute(
      "aria-label",
      "Delete task: " + filteredTasks[i]!.text,
    );

    li.append(checkbox, span, deleteButton);
    taskList.appendChild(li);
  }
}
// Toggle a task's completed status
function toggleTask(taskId: string, isCompleted: boolean): void {
  const task = tasks.find(function (item: Task) {
    return String(item.id) === taskId; //converts nummber to string to compare with taskid which is a string
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
taskList.addEventListener("change", function (event: Event) {
  if (!(event.target as HTMLElement).classList.contains("task-checkbox")) {
    return;
  }

  const li = (event.target as HTMLElement).closest("li");
  const taskId = li!.dataset.taskId; //dataset.taskId is always a string
  toggleTask(taskId!, (event.target as HTMLInputElement).checked);
  //taskId! tells TypeScript that taskId is not undefined
  //checked is a property of HTMLInputElement, not HTMLElement
});
// Delete a task
function deleteTask(taskId: string): void {
  //taskId is a string
  tasks = tasks.filter(function (item: Task) {
    return String(item.id) !== taskId;
  });

  saveTasks();
  result.textContent = "Task deleted successfully!";

  filterTasks();
  updateTaskCount();
}
// Handle delete clicks using event delegation

taskList.addEventListener("click", function (event: Event) {
  const deleteButton = (event.target as HTMLElement).closest(".delete-button");
  if (!deleteButton || !taskList.contains(deleteButton)) {
    return;
  }
  const li = deleteButton.closest("li");
  const taskId = li!.dataset.taskId;
  deleteTask(taskId!);
});

// Filter tasks

function filterTasks(): void {
  renderTasks();
  updateFilterButtons();
  updateNoTaskMessage();
}

// Update the selected filter button

function updateFilterButtons(): void {
  allFilter.classList.toggle("active", currentFilter === "all");
  allFilter.setAttribute("aria-pressed", String(currentFilter === "all"));

  activeFilter.classList.toggle("active", currentFilter === "active");
  activeFilter.setAttribute("aria-pressed", String(currentFilter === "active"));

  completedFilter.classList.toggle("active", currentFilter === "completed");
  completedFilter.setAttribute(
    "aria-pressed",
    String(currentFilter === "completed"),
  );
}

// Show or hide the empty-state message

function updateNoTaskMessage(): void {
  if (taskList.children.length === 0) {
    noTask.style.display = "block";
  } else {
    noTask.style.display = "none";
  }
}

// Update the active task count

function updateTaskCount(): void {
  const taskCount = document.getElementById("taskCount") as HTMLElement;

  const activeTasks = tasks.filter(function (item: Task) {
    return item.completed === false;
  });

  taskCount.textContent = activeTasks.length + " active tasks";
}

// Add a task
function addTask(): void {
  const taskText: string = taskInput.value.trim();

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
taskForm.addEventListener("submit", function (event: Event): void {
  event.preventDefault();
  addTask();
});
// Clear completed tasks
function clearCompletedTasks(): void {
  const completedCount: number = tasks.filter(function (item: Task): boolean {
    return item.completed === true; //It checks if the task is completed
  }).length; //Counts how many items are inside the filtered array, We are counting completed tasks before deleting them.

  tasks = tasks.filter(function (item: Task): boolean {
    return item.completed === false; //keeps incomplete tasks
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
clearCompleted.addEventListener("click", function (): void {
  clearCompletedTasks(); //Its job is to remove completed tasks
});
// Render tasks when the website first opens
filterTasks();
updateTaskCount();
