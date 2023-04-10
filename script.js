const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const allBtn = document.getElementById('all-btn');
const activeBtn = document.getElementById('active-btn');
const completedBtn = document.getElementById('completed-btn');

let tasks = [];

function renderTasks() {
	taskList.innerHTML = '';

	tasks.forEach((task, index) => {
		const taskItem = document.createElement('div');
		taskItem.className = 'task-item';

		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.checked = task.completed;
		checkbox.addEventListener('change', () => {
			tasks[index].completed = checkbox.checked;
			renderTasks();
		});

		const label = document.createElement('label');
		label.textContent = task.text;

		const deleteBtn = document.createElement('button');
		deleteBtn.className = 'delete-btn';
		deleteBtn.textContent = 'Delete';
		deleteBtn.addEventListener('click', () => {
			tasks.splice(index, 1);
			renderTasks();
		});

		taskItem.appendChild(checkbox);
		taskItem.appendChild(label);
		taskItem.appendChild(deleteBtn);

		if (allBtn.classList.contains('active')) {
			taskList.appendChild(taskItem);
		} else if (activeBtn.classList.contains('active') && !task.completed) {
			taskList.appendChild(taskItem);
		} else if (completedBtn.classList.contains('active') && task.completed) {
			taskList.appendChild(taskItem);
		}
	});
}

function addTask() {
	const text = taskInput.value.trim();
	if (text !== '') {
		tasks.push({text: text, completed: false});
		renderTasks();
		taskInput.value = '';
		taskInput.focus();
	}
}

function filterTasks(filter) {
	allBtn.classList.remove('active');
	activeBtn.classList.remove('active');
	completedBtn.classList.remove('active');
	filter.classList.add('active');
	renderTasks();
}

addBtn.addEventListener('click', (event) => {
	event.preventDefault();
	addTask();
});

allBtn.addEventListener('click', () => {
	filterTasks(allBtn);
});

activeBtn.addEventListener('click', () => {
	filterTasks(activeBtn);
});

completedBtn.addEventListener('click', () => {
	filterTasks(completedBtn);
});

renderTasks();
