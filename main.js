document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.querySelector('.myList ol');
    const addTaskButton = document.querySelector('.add-button');
    const sortTasksButton = document.querySelector('.sort');
    const sortTasksHoverButton = document.querySelector('.sorthover');
    const inputField = document.querySelector('.input-container input');
    let ascending = true;
    function addTask(taskText = '') {
        if (!taskText) return;
        const li = document.createElement('li');
        li.classList.add('task');
        li.setAttribute('draggable', 'true');
        li.innerHTML = `
            <input type="text" value="${taskText}" class="task-input" placeholder="Новая задача" />
            <img class="x" src="./Group 77.svg" alt="delete">
        `;
        attachTaskEvents(li);
        taskList.appendChild(li);
        inputField.value = '';
    }
    function attachTaskEvents(task) {
        const deleteIcon = task.querySelector('.x');
        const taskInput = task.querySelector('.task-input');
        deleteIcon.addEventListener('click', () => {
            task.remove();
        });
        task.addEventListener('dragstart', () => {
            task.classList.add('dragging');
        });

        task.addEventListener('dragend', () => {
            task.classList.remove('dragging');
        });

        task.addEventListener('dragover', (e) => {
            e.preventDefault();
            const draggingTask = document.querySelector('.dragging');
            if (task !== draggingTask) {
                const next = e.clientY < task.getBoundingClientRect().top + task.offsetHeight / 2;
                taskList.insertBefore(draggingTask, next ? task : task.nextSibling);
            }
        });
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                taskInput.blur();
                inputField.focus();
            }
        });
    }
    function sortTasks() {
        const tasks = Array.from(taskList.children);
        tasks.sort((a, b) => {
            const aText = a.querySelector('.task-input').value.toLowerCase();
            const bText = b.querySelector('.task-input').value.toLowerCase();
            return ascending ? aText.localeCompare(bText) : bText.localeCompare(aText);
        });
        taskList.innerHTML = '';
        tasks.forEach(task => taskList.appendChild(task));
        ascending = !ascending;
        sortTasksButton.classList.toggle('sorted-desc', !ascending);
        sortTasksHoverButton.classList.toggle('sorted-desc', !ascending);
    }
    addTaskButton.addEventListener('click', () => addTask(inputField.value.trim()));
    sortTasksButton.addEventListener('click', sortTasks);
    sortTasksHoverButton.addEventListener('click', sortTasks);
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask(inputField.value.trim());
        }
    });
});