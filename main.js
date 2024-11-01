document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('taskList');
    const addTaskButton = document.getElementById('addTask');
    const sortTasksButton = document.getElementById('sortTasks');
    let ascending = true;

    function addTask() {
        const li = document.createElement('li');
        li.classList.add('task');
        li.setAttribute('draggable', 'true');
        li.innerHTML = `
            <input type="text" placeholder="Yeni tapşırıq əlavə edin...">
            <button class="delete">Sil</button>
        `;
        taskList.appendChild(li);
        attachDeleteEvent(li);
        attachDragAndDropEvents(li);
    }

    function attachDeleteEvent(task) {
        const deleteButton = task.querySelector('.delete');
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(task);
        });
    }

    function sortTasks() {
        const tasks = Array.from(taskList.children);
        tasks.sort((a, b) => {
            const aText = a.querySelector('input').value.toLowerCase();
            const bText = b.querySelector('input').value.toLowerCase();
            return ascending ? aText.localeCompare(bText) : bText.localeCompare(aText);
        });
        taskList.innerHTML = '';
        tasks.forEach(task => taskList.appendChild(task));
        ascending = !ascending;
    }

    function attachDragAndDropEvents(task) {
        task.addEventListener('dragstart', () => {
            task.classList.add('dragging');
        });

        task.addEventListener('dragend', () => {
            task.classList.remove('dragging');
        });

        task.addEventListener('dragover', (e) => {
            e.preventDefault();
            const dragging = document.querySelector('.dragging');
            if (task !== dragging) {
                const allTasks = Array.from(taskList.children);
                const next = e.clientY < task.getBoundingClientRect().top + task.offsetHeight / 2;
                taskList.insertBefore(dragging, next ? task : task.nextSibling);
            }
        });
    }

    addTaskButton.addEventListener('click', addTask);
    sortTasksButton.addEventListener('click', sortTasks);
});