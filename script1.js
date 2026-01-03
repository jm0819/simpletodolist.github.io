// script1.js - Simple To-Do List Functionality
let tasks = [];

// Load tasks from localStorage when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();

    const taskInput = document.getElementById('taskInput');
    
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

function loadTasks() {
    const savedTasks = localStorage.getItem('todoTasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        tasks.forEach(task => {
            addTaskToDOM(task.text, task.completed, task.id);
        });
    }
}

function saveTasks() {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    // Don't add empty tasks
    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }
    
    // Create task object
    const task = {
        id: Date.now(), // Unique ID
        text: taskText,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.push(task);
    saveTasks();
    
    // Add to DOM
    addTaskToDOM(task.text, task.completed, task.id);
    
    // Clear input and focus
    taskInput.value = '';
    taskInput.focus();

}
    function addTaskToDOM(taskText, completed = false, taskId = null) {
        const taskList = document.getElementById('taskList');
        const id = taskId || Date.now();
        // Create the list item
        const listItem = document.createElement('li');

        listItem.dataset.id = id; // Store ID on element
        
        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        
        // Create task text
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        
        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✕';
        deleteBtn.className = 'delete-btn';

        if (completed) {
            listItem.classList.add('completed');
        }

        checkbox.addEventListener('change', function() {
            const isCompleted = this.checked;
            
            // Update DOM
            if (isCompleted) {
                listItem.classList.add('completed');
            } else {
                listItem.classList.remove('completed');
            }
            
            // Update array
            const taskIndex = tasks.findIndex(t => t.id == id);
            if (taskIndex !== -1) {
                tasks[taskIndex].completed = isCompleted;
                saveTasks();
            }
        });    
    
        // Add event to delete button
        deleteBtn.addEventListener('click', function() {
            taskList.removeChild(listItem);

            const taskIndex = tasks.findIndex(t => t.id == id);
            if (taskIndex !== -1) {
                tasks.splice(taskIndex, 1);
                saveTasks();
            }
    });
    
    // Put everything together
    listItem.appendChild(checkbox);
    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteBtn);
    
    // Add to the list
    taskList.appendChild(listItem);
    
    // Clear input and focus
    taskInput.value = '';
    taskInput.focus();
}