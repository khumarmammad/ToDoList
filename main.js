document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('taskList');
    const addTaskButton = document.querySelector('.add-button');
    const sortTasksButton = document.querySelector('.sort');
    const sortTasksHoverButton = document.querySelector('.sorthover');
    const sortik = document.querySelector('.sortik');
    const sortikhover = document.querySelector('.sortikhover');
    const inputField = document.querySelector('.input-container input');
    let ascending = true;

    const addTask = (taskText = '') => {
        const li = document.createElement('li');
        li.classList.add('task');
        li.setAttribute('draggable', 'true');
        li.innerHTML = `
            <input type="text" value="${taskText}" class="task-input" />
            <img class="x" src="./Group 77.svg" alt="delete">
            <img class="xhover" src="./Group 70.svg" alt="delete-hover">
        `;
        attachTaskEvents(li);
        taskList.appendChild(li);
        inputField.value = '';
    };

    const attachTaskEvents = (task) => {
        const deleteIcon = task.querySelector('.x');
        deleteIcon.addEventListener('click', () => task.remove());

        task.addEventListener('dragstart', () => task.classList.add('dragging'));
        task.addEventListener('dragend', () => task.classList.remove('dragging'));

        task.addEventListener('dragover', (e) => {
            e.preventDefault();
            const draggingTask = document.querySelector('.dragging');
            if (task !== draggingTask) {
                const next = e.clientY < task.getBoundingClientRect().top + task.offsetHeight / 2;
                taskList.insertBefore(draggingTask, next ? task : task.nextSibling);
            }
        });
    };

    const sortTasks = () => {
        const tasks = Array.from(taskList.children);
        tasks.sort((a, b) => {
            const aText = a.querySelector('.task-input').value.toLowerCase();
            const bText = b.querySelector('.task-input').value.toLowerCase();
            return ascending ? aText.localeCompare(bText) : bText.localeCompare(aText);
        });
        taskList.innerHTML = '';
        tasks.forEach(task => taskList.appendChild(task));
        updateSortIcons();
    };

    const updateSortIcons = () => {
        if (ascending) {
            sortTasksButton.style.display = 'none';
            sortTasksHoverButton.style.display = 'none';
            sortik.style.display = 'inline';
            sortikhover.style.display = 'none';
        } else {
            sortTasksButton.style.display = 'inline';
            sortTasksHoverButton.style.display = 'none';
            sortik.style.display = 'none';
            sortikhover.style.display = 'inline';
        }
        ascending = !ascending;
    };

    addTaskButton.addEventListener('click', () => addTask(inputField.value));

    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTask(inputField.value);
        }
    });

    sortTasksButton.addEventListener('click', sortTasks);
    sortTasksHoverButton.addEventListener('click', sortTasks);
});