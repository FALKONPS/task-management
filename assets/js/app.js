const status_process = {
  1: 'To Do',
  2: 'In Progress',
  3: 'Done',
};

let tasks = [];

function createTask(task = {}) {
  let id = 0;
  let taskIDArray = tasks.map((item) => item.id);
  while (true) {
    if (taskIDArray.includes(id)) {
      id++;
    } else {
      break;
    }
  }
  task.id = id;
  task.title = task.title || `Task ${id}`;
  task.description = task.description || `Description ${id}`;
  task.labels = task.labels || ['Nan'];
  task.status = task.status || 1;
  tasks.push(task);
  return id;
}

function deleteTaskById(id) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index >= 0) {
    tasks.splice(index, 1);
  }
}

function editTaskById(id, update = {}) {
  const index = tasks.findIndex((task) => task.id === id);
  // overwrite values
  tasks[index] = Object.assign({}, tasks[index], update);
}

function toggleStatus(id, value = -1) {
  const index = tasks.findIndex((task) => task.id === id);
  if (value > 0) {
    tasks[index].status = value;
  } else {
    tasks[index].status = ((tasks[index].status + 1) % 3) + 1;
  }
  return tasks[index].status;
}

function viewTasks() {
  console.log(tasks);
}

function renderTasks(filteredTasks = tasks) {
  const tasksContainer = document.getElementById('tasksContainer');
  tasksContainer.innerHTML = '';

  filteredTasks.forEach((task) => {
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.innerHTML = `
          <h3>${task.title}</h3>
          <p>${task.description}</p>
          <div class="labels">
              ${task.labels
                .map((label) => `<span class="label">${label}</span>`)
                .join('')} 
          </div>
          <p>Status: ${status_process[task.status]}</p>
          <p>ID: ${task.id}</p>
      `;
    tasksContainer.appendChild(taskCard);
  });
  updateTaskSelects();
}
function searchTask() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm)
  );
  return filteredTasks;
}

function updateTaskSelects() {
  const deleteTaskSelect = document.getElementById('deleteTaskSelect');
  const editTaskSelect = document.getElementById('editTaskSelect');
  deleteTaskSelect.innerHTML = '';
  editTaskSelect.innerHTML = '';

  tasks.forEach((task) => {
    const option = document.createElement('option');
    option.value = task.id;
    option.textContent = `${task.title} (ID: ${task.id})`;
    deleteTaskSelect.appendChild(option.cloneNode(true));
    editTaskSelect.appendChild(option);
  });
}

function loadJsonData() {
  fetch('./assets/data/tasks.json')
    .then((response) => response.json())
    .then((data) => {
      console.log(tasks);
      tasks = data;
      renderTasks();
    });
}

// Event
document.getElementById('searchInput').addEventListener('input', () => {
  renderTasks(searchTask());
});

document.getElementById('searchBtn').addEventListener('click', () => {
  renderTasks(searchTask());
});

//

loadJsonData();

document.getElementById('confirmCreate').addEventListener('click', () => {
  const title = document.getElementById('taskTitle').value;
  const description = document.getElementById('taskDescription').value;
  const labels = document
    .getElementById('taskLabels')
    .value.split(',')
    .map((label) => label.trim()); // trim remove whitespace
  const status = parseInt(document.getElementById('taskStatus').value);

  createTask({ title, description, labels, status });
  renderTasks();
});
document.getElementById('confirmDelete').addEventListener('click', () => {
  const taskId = parseInt(document.getElementById('deleteTaskSelect').value);
  deleteTaskById(taskId);
  renderTasks();
});

document.getElementById('confirmEdit').addEventListener('click', () => {
  const taskId = parseInt(document.getElementById('editTaskSelect').value);
  const title = document.getElementById('editTaskTitle').value;
  const description = document.getElementById('editTaskDescription').value;
  const labels = document
    .getElementById('editTaskLabels')
    .value.split(',')
    .map((label) => label.trim());
  const status = parseInt(document.getElementById('editTaskStatus').value);

  editTaskById(taskId, { title, description, labels, status });
  renderTasks();
});

