document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const tasksContainer = document.getElementById('tasksContainer');
        const taskElement = createTaskElement(taskText);
        tasksContainer.insertBefore(taskElement, tasksContainer.firstChild);

        saveTasks();
        taskInput.value = '';
    }
}

function createTaskElement(taskText) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.setAttribute('onclick', 'selectTask(this)'); 

    const textContainer = document.createElement('div');
    textContainer.textContent = taskText;
    taskElement.appendChild(textContainer);

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');

    const deleteButton = createButton('Удалить в корзину', 'deleteTask(this)');
    const completeButton = createButton('Выполнено', 'completeTask(this)');

    buttonsContainer.appendChild(deleteButton);
    buttonsContainer.appendChild(completeButton);

    taskElement.appendChild(buttonsContainer);

    return taskElement;
}

function createButton(text, onClickFunction) {
    const button = document.createElement('button');
    button.textContent = text;
    button.setAttribute('onclick', onClickFunction);
    return button;
}

function selectTask(element) {
    element.classList.toggle('selected'); 
}


function deleteTask(element) {
    const taskElement = element.closest('.task');
    const tasksContainer = document.getElementById('tasksContainer');
    const completedTasksContainer = document.getElementById('completedTasksContainer');
    const deletedTasksContainer = document.getElementById('deletedTasksContainer');

    if (taskElement.classList.contains('selected')) {
        taskElement.remove();
        saveTasks();
    } else {
        taskElement.classList.add('deleted');
        taskElement.classList.remove('completed'); 
        taskElement.style.backgroundColor = '#d9534f'; 
        tasksContainer.removeChild(taskElement);

        if (!deletedTasksContainer) {
            const deletedTasksContainer = document.createElement('div');
            deletedTasksContainer.id = 'deletedTasksContainer';
            document.getElementById('app').appendChild(deletedTasksContainer);
        }

        deletedTasksContainer.appendChild(taskElement);
        saveTasks();
    }
}

function completeTask(element) {
    const taskElement = element.closest('.task');
    const tasksContainer = document.getElementById('tasksContainer');
    const completedTasksContainer = document.getElementById('completedTasksContainer');

    if (taskElement.classList.contains('selected')) {
        taskElement.remove();
        saveTasks();
    } else {
        
        taskElement.classList.add('completed');
        tasksContainer.removeChild(taskElement);

        if (!completedTasksContainer) {
            
            const completedTasksContainer = document.createElement('div');
            completedTasksContainer.id = 'completedTasksContainer';
            document.getElementById('app').appendChild(completedTasksContainer);
        }

        completedTasksContainer.appendChild(taskElement);
        saveTasks();
    }
}

function saveTasks() {
    const tasksContainer = document.getElementById('tasksContainer');
    const tasks = [];

    tasksContainer.childNodes.forEach(taskElement => {
        tasks.push(taskElement.firstChild.textContent);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasksContainer = document.getElementById('tasksContainer');
    const completedTasksContainer = document.getElementById('completedTasksContainer');
    const deletedTasksContainer = document.getElementById('deletedTasksContainer');
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));

    if (savedTasks) {
        savedTasks.reverse().forEach(taskText => {
            const taskElement = createTaskElement(taskText);

            if (taskElement.classList.contains('completed')) {
                completedTasksContainer.appendChild(taskElement);
            } else if (taskElement.classList.contains('deleted')) {
                deletedTasksContainer.appendChild(taskElement);
            } else {
                tasksContainer.appendChild(taskElement);
            }
        });
    }
}

function filterTasks() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const tasksContainer = document.getElementById('tasksContainer');
    const completedTasksContainer = document.getElementById('completedTasksContainer');
    const deletedTasksContainer = document.getElementById('deletedTasksContainer');

    const allTasks = document.querySelectorAll('.task');

    allTasks.forEach(task => {
        task.style.display = 'none';
    });

    switch (categoryFilter) {
        case 'assigned':
            tasksContainer.childNodes.forEach(task => {
                task.style.display = 'block';
            });
            break;
        case 'completed':
            completedTasksContainer.childNodes.forEach(task => {
                task.style.display = 'block';
            });
            break;
        case 'deleted':
            deletedTasksContainer.childNodes.forEach(task => {
                task.style.display = 'block';
            });
            break;
        default:
            break;
    }
}