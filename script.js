alert("JavaScript is working!");
const taskForm = document.getElementById("taskform");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const noTask = document.getElementById("noTask");


let tasks = [
    { id: 2, text: "Learn JavaScript" },
    { id: 32, text: "Build a to-do list" },
    { id: 42, text: "Practice DOM manipulation" },
    { id: 51, text: "Save tasks in local storage" },
    { id: 64, text: "Make it look good" }
];

console.log(tasks.length);

let newId = 6;
let currentFilter = "all";

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

console.log(taskList);


taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const taskText = taskInput.value;

});
