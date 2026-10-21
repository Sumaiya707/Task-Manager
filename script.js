alert("JavaScript is working!");
const taskForm = document.getElementById("taskform");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const noTask = document.getElementById("noTask");
const allFilter = document.getElementById("allFilter");
const activeFilter = document.getElementById("activeFilter");
const completedFilter = document.getElementById("completedFilter");

let tasks = JSON.parse(localStorage.getItem("tasks")) ||
 [
    { id: 2, text: "Learn JavaScript" },
    { id: 32, text: "Build a to-do list" },
    { id: 42, text: "Practice DOM manipulation" },
    { id: 51, text: "Save tasks in local storage" },
    { id: 64, text: "Make it look good" }
];

console.log(tasks.length);

let newId = 6;
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

console.log(tasks[3].id);


for (let i = 0; i < tasks.length; i++) {

    const li = document.createElement("li");

    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";

    
    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = tasks[i].text;

    
    checkbox.addEventListener("change", function() {
        span.classList.toggle("completed");
        filterTasks();
    });
    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "🗑";
    deleteButton.className = "delete-button";

    
    deleteButton.addEventListener("click", function() {
        li.remove();
    });

    li.append(checkbox, span, deleteButton);

    taskList.appendChild(li);
}

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
}

console.log(taskList);

taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const taskText = taskInput.value;
    tasks.push({
        id: newId++, text:taskText
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskList.innerHTML = "";

for (let i = 0; i < tasks.length; i++) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = tasks[i].text;

    checkbox.addEventListener("change", function() {
        span.classList.toggle("completed");
        filterTasks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "🗑";
    deleteButton.className = "delete-button";

    deleteButton.addEventListener("click", function() {
        li.remove();
    });

    li.append(checkbox, span, deleteButton);
    taskList.appendChild(li);
}
taskInput.value = "";

});
