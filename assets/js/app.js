const status = {
  1: 'To Do',
  2: 'In Progress',
  3: 'Done',
};

let tasks = [
  {
    id: 1,
    title: 'Nice',
    description: 'Search for a job',
    labels: ['hard'],
    status: 2,
  },
  {
    id: 2,
    title: 'Cool',
    description: 'Find a good movie',
    labels: ['easy'],
    status: 1,
  },
  {
    id: 3,
    title: 'Trip to the Moon',
    description: 'Build a spaceship and strive to explore space',
    labels: ['hard'],
    status: 3,
  },
  {
    id: 4,
    title: 'Build a Company',
    description:
      "No job? Corrupt companies? It's okay, create your own company!",
    labels: ['easy'],
    status: 2,
  },
];

console.log(tasks);

function createDummyTask(task = {}) {
  let id = 0;
  let taskIDArray = tasks.map((item, index, array) => item.id);
  while (true) {
    if (id in taskIDArray) {
      id++;
    } else {
      break;
    }
  }

  task.id = id;
  task.title = `task ${id}`;
  task.description = `description ${id}`;
  task.labels = ['Nan'];
  task.status = 1;
  tasks.push(task);
  return task;
}

function deleteTaskById(id) {
  let taskIDArray = tasks.map((item, index, array) => item.id);
  index = taskIDArray.findIndex((element) => (element = id));
  if (index >= 0) {
    // warring
    delete tasks[index];
  }
}

function editTaskById(id, update = {}) {
  let taskIDArray = tasks.map((item, index, array) => item.id);
  index = taskIDArray.findIndex((element) => (element = id));

  // overwrite values
  tasks[index] = Object.assign({}, tasks[index], update);
}

function toggleStatus(id, value = -1) {
  let taskIDArray = tasks.map((item, index, array) => item.id);
  index = taskIDArray.findIndex((element) => (element = id));
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
