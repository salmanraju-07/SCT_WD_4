let lists = JSON.parse(localStorage.getItem('todoLists')) || [
  { id: 1, name: 'Personal', tasks: [] },
  { id: 2, name: 'Work', tasks: [] }
];

let currentListId = lists[0]?.id || 1;
let editingTaskId = null;

function saveData() {
  localStorage.setItem('todoLists', JSON.stringify(lists));
  updateStats();
}

function updateStats() {
  const currentList = lists.find(l => l.id === currentListId);
  const tasks = currentList? currentList.tasks : [];
  const completed = tasks.filter(t => t.completed).length;

  document.getElementById('totalTasks').textContent = `${tasks.length} Tasks`;
  document.getElementById('completedTasks').textContent = `${completed} Completed`;
  document.getElementById('activeTasks').textContent = `${tasks.length - completed} Active`;
}

function renderLists() {
  const listsEl = document.getElementById('lists');
  listsEl.innerHTML = '';

  lists.forEach(list => {
    const activeClass = list.id === currentListId? 'active' : '';
    const activeCount = list.tasks.filter(t =>!t.completed).length;

    listsEl.innerHTML += `
      <div class="list-item ${activeClass}" onclick="switchList(${list.id})">
        <span class="list-name">${list.name}</span>
        <span class="list-count">${activeCount}</span>
        ${lists.length > 1? `<button class="delete-list" onclick="event.stopPropagation(); deleteList(${list.id})">×</button>` : ''}
      </div>
    `;
  });
}

function renderTasks() {
  const tasksEl = document.getElementById('tasks');
  const currentList = lists.find(l => l.id === currentListId);
  const tasks = currentList? currentList.tasks : [];

  if (tasks.length === 0) {
    tasksEl.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📋</div>
        <h3>No tasks yet</h3>
        <p>Add a task above to get started</p>
      </div>
    `;
    return;
  }

  // Sort: incomplete first, then by date
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed!== b.completed) return a.completed? 1 : -1;
    if (!a.dateTime &&!b.dateTime) return 0;
    if (!a.dateTime) return 1;
    if (!b.dateTime) return -1;
    return new Date(a.dateTime) - new Date(b.dateTime);
  });

  tasksEl.innerHTML = '';
  sortedTasks.forEach(task => {
    const isEditing = editingTaskId === task.id;
    const isOverdue = task.dateTime && new Date(task.dateTime) < new Date() &&!task.completed;

    tasksEl.innerHTML += `
      <div class="task ${task.completed? 'completed' : ''}">
        <input type="checkbox" class="task-checkbox" ${task.completed? 'checked' : ''}
               onchange="toggleTask(${task.id})">

        <div class="task-content">
          ${isEditing? `
            <input type="text" class="edit-input" id="editInput" value="${task.text}"
                   onblur="saveEdit(${task.id})" onkeypress="if(event.key==='Enter') saveEdit(${task.id})">
          ` : `
            <div class="task-text">${task.text}</div>
          `}

          <div class="task-meta">
            ${task.dateTime? `
              <span class="task-date ${isOverdue? 'overdue' : ''}">
                📅 ${formatDateTime(task.dateTime)} ${isOverdue? '(Overdue)' : ''}
              </span>
            ` : ''}
            <span>Added ${formatDate(task.createdAt)}</span>
          </div>
        </div>

        <div class="task-actions">
          ${!isEditing? `<button class="task-btn" onclick="startEdit(${task.id})" title="Edit">✏️</button>` : ''}
          <button class="task-btn" onclick="deleteTask(${task.id})" title="Delete">🗑️</button>
        </div>
      </div>
    `;
  });

  if (editingTaskId) {
    setTimeout(() => document.getElementById('editInput')?.focus(), 0);
  }
}

function formatDateTime(dateTimeStr) {
  const date = new Date(dateTimeStr);
  const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const timeStr = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return `${dateStr} ${timeStr}`;
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function addList() {
  const input = document.getElementById('newListInput');
  const name = input.value.trim();

  if (!name) return;

  lists.push({
    id: Date.now(),
    name: name,
    tasks: []
  });

  input.value = '';
  saveData();
  renderLists();
}

function deleteList(listId) {
  if (lists.length === 1) {
    alert('You must have at least one list');
    return;
  }

  if (confirm('Delete this list and all its tasks?')) {
    lists = lists.filter(l => l.id!== listId);
    if (currentListId === listId) {
      currentListId = lists[0].id;
    }
    saveData();
    renderLists();
    renderTasks();
  }
}

function switchList(listId) {
  currentListId = listId;
  editingTaskId = null;
  renderLists();
  renderTasks();
  updateStats();
}

function addTask() {
  const input = document.getElementById('taskInput');
  const dateInput = document.getElementById('taskDate');
  const timeInput = document.getElementById('taskTime');

  const text = input.value.trim();
  if (!text) return;

  const currentList = lists.find(l => l.id === currentListId);
  let dateTime = null;

  if (dateInput.value) {
    dateTime = dateInput.value;
    if (timeInput.value) {
      dateTime += `T${timeInput.value}`;
    } else {
      dateTime += 'T09:00';
    }
  }

  currentList.tasks.push({
    id: Date.now(),
    text: text,
    completed: false,
    dateTime: dateTime,
    createdAt: new Date().toISOString()
  });

  input.value = '';
  dateInput.value = '';
  timeInput.value = '';

  saveData();
  renderTasks();
  renderLists();
}

function toggleTask(taskId) {
  const currentList = lists.find(l => l.id === currentListId);
  const task = currentList.tasks.find(t => t.id === taskId);
  task.completed =!task.completed;

  saveData();
  renderTasks();
  renderLists();
}

function deleteTask(taskId) {
  const currentList = lists.find(l => l.id === currentListId);
  currentList.tasks = currentList.tasks.filter(t => t.id!== taskId);

  saveData();
  renderTasks();
  renderLists();
}

function startEdit(taskId) {
  editingTaskId = taskId;
  renderTasks();
}

function saveEdit(taskId) {
  const input = document.getElementById('editInput');
  const newText = input.value.trim();

  if (newText) {
    const currentList = lists.find(l => l.id === currentListId);
    const task = currentList.tasks.find(t => t.id === taskId);
    task.text = newText;
    saveData();
  }

  editingTaskId = null;
  renderTasks();
}

// Init
renderLists();
renderTasks();
updateStats();