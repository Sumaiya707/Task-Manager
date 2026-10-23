const taskForm = document.getElementById("taskform");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const noTask = document.getElementById("noTask");
const allFilter = document.getElementById("allFilter");
const activeFilter = document.getElementById("activeFilter");
const completedFilter = document.getElementById("completedFilter");
const themeToggle = document.getElementById("themeToggle");
const clearCompleted = document.getElementById("clearCompleted");
const result = document.getElementById("result");

//what happens when the website opens ??????//

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
    themeToggle.setAttribute("aria-label", "Switch to light mode");
} else {
    themeToggle.textContent = "🌙";
    themeToggle.setAttribute("aria-label", "Switch to dark mode");
}
//whatt happens when u click the button?? //
themeToggle.addEventListener("click", function() {

    document.body.classList.toggle("dark-mode"); 
    //adds the class if missing, or removes it if present. //html e CSS er Class thakte pare, dark-mode is there or not ?? the toggle decide then change ,
if (document.body.classList.contains("dark-mode")) {
    themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
    themeToggle.setAttribute("aria-label", "Switch to light mode");
} else {
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
    themeToggle.setAttribute("aria-label", "Switch to dark mode");
}

});

let tasks;

try {
    tasks = JSON.parse(localStorage.getItem("tasks"));
} catch (error) {
    tasks = null;
}
if (!Array.isArray(tasks)) {
    tasks = [
        { id: 2, text: "Learn JavaScript", completed: false },
        { id: 32, text: "Build a to-do list", completed: false },
        { id: 42, text: "Practice DOM manipulation", completed: false },
        { id: 51, text: "Save tasks in local storage", completed: false },
        { id: 64, text: "Make it look good", completed: false }
    ];
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

tasks.forEach(function(item) {
    if (item.completed === undefined) {
        item.completed = false;
    }
});

let newId = Date.now();
let currentFilter = "all";
allFilter.addEventListener("click", function() {
    currentFilter = "all";
    filterTasks();
});
activeFilter.addEventListener("click", function() {
    currentFilter = "active";
    filterTasks();
});
completedFilter.addEventListener("click", function() {
    currentFilter = "completed";
    filterTasks();
});

for (let i = 0; i < tasks.length; i++) {

    const li = document.createElement("li");
    const taskId = tasks[i].id;
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = tasks[i].completed || false;

    
    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = tasks[i].text;
    span.classList.toggle("completed", checkbox.checked);

    checkbox.addEventListener("change", function() {
    const task = tasks.find(function(item) {
        return item.id === taskId;
    });
    task.completed = checkbox.checked;
    updateTaskCount();

    localStorage.setItem("tasks", JSON.stringify(tasks));
    span.classList.toggle("completed", checkbox.checked);
    filterTasks();
});
    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "🗑";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", function() {
    tasks = tasks.filter(function(item) {
        return item.id !== taskId;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    li.remove();
    updateNoTaskMessage();
      updateTaskCount();
});

    li.append(checkbox, span, deleteButton);

    taskList.appendChild(li);
}
    updateNoTaskMessage();
    updateFilterButtons();
    updateTaskCount();

function filterTasks() {
    const items = taskList.querySelectorAll("li");

    items.forEach(function(li) {
        const checkbox = li.querySelector("input");

        if (currentFilter === "all") {
            li.style.display = "";
        } else if (currentFilter === "active") {
            li.style.display = checkbox.checked ? "none" : "";
        } else {
            li.style.display = checkbox.checked ? "" : "none";
        }
    });
    updateFilterButtons();
}
function updateFilterButtons() {
    allFilter.classList.toggle("active", currentFilter === "all");
    activeFilter.classList.toggle("active", currentFilter === "active");
    completedFilter.classList.toggle("active", currentFilter === "completed");
}
function updateNoTaskMessage() {
    if (taskList.children.length === 0) {
        noTask.style.display = "block";
    } else {
        noTask.style.display = "none";
    }
}


function updateTaskCount() {
    const taskCount = document.getElementById("taskCount");

    const activeTasks = tasks.filter(function(item) {
        return item.completed === false;
    });

    taskCount.textContent = activeTasks.length + " active tasks";
}

taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

const taskText = taskInput.value.trim();
if (taskText === "")
     {
    result.textContent = "Please enter a task.";
    taskInput.focus();
    return;
     }
tasks.push({
    id: crypto.randomUUID(),
    text: taskText,
    completed: false
});
result.textContent = "Task added successfully!";

    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskList.innerHTML = "";

for (let i = 0; i < tasks.length; i++) {
    const li = document.createElement("li");
    const taskId = tasks[i].id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = tasks[i].text;
     checkbox.checked = tasks[i].completed;
    span.classList.toggle("completed", checkbox.checked);

   
    checkbox.addEventListener("change", function() {
    const task = tasks.find(function(item) {
        return item.id === taskId;
    });

    task.completed = checkbox.checked;
    updateTaskCount();

    localStorage.setItem("tasks", JSON.stringify(tasks));
    span.classList.toggle("completed", checkbox.checked);
    filterTasks();
});

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "🗑";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", function() {
    tasks = tasks.filter(function(item) {
        return item.id !== taskId;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
   li.remove();
   result.textContent = "Task deleted successfully!";

   updateNoTaskMessage();
   updateTaskCount();
});

    li.append(checkbox, span, deleteButton);
    taskList.appendChild(li);
}
taskInput.value = "";
updateNoTaskMessage();
filterTasks();
updateTaskCount();
});

clearCompleted.addEventListener("click", function() {
        const completedCount = tasks.filter(function(item) {
        return item.completed === true;
    }).length;
    tasks = tasks.filter(function(item) {
        
        return item.completed === false;
    });
    if (completedCount > 0)
         {
    result.textContent = "Completed tasks cleared successfully!";
         } else
         {
    result.textContent = "There are no completed tasks to clear.";
         }

    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        const li = document.createElement("li");
        const taskId = tasks[i].id;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = tasks[i].completed;

        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = tasks[i].text;
        span.classList.toggle("completed", checkbox.checked);

        checkbox.addEventListener("change", function() {
            const task = tasks.find(function(item) {
                return item.id === taskId;
            });

            task.completed = checkbox.checked;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            updateTaskCount();
            span.classList.toggle("completed", checkbox.checked);
            filterTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "🗑";
        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", function() {
            tasks = tasks.filter(function(item) {
                return item.id !== taskId;
            });

            localStorage.setItem("tasks", JSON.stringify(tasks));
            li.remove();
            result.textContent = "Task deleted successfully!";
            updateNoTaskMessage();
            updateTaskCount();
        });

        li.append(checkbox, span, deleteButton);
        taskList.appendChild(li);
    }

    updateNoTaskMessage();
    updateTaskCount();
    filterTasks();
});

