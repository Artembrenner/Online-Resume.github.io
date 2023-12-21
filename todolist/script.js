document.getElementById('todo-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var taskInput = document.getElementById('todo-input');
    var task = taskInput.value.trim();
    if (task !== '') {
      var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push({ text: task, checked: false, timestamp: new Date().getTime() });
      localStorage.setItem('tasks', JSON.stringify(tasks));
      taskInput.value = '';
      showTasks();
    }
  });
  
  document.getElementById('clear-button').addEventListener('click', function() {
    localStorage.removeItem('tasks');
    showTasks();
  });
  
  function showTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    var taskList = document.getElementById('todo-list');
    taskList.innerHTML = '';
  
    tasks.sort(function(a, b) {
      return b.timestamp - a.timestamp;
    });
  
    if (tasks.length === 0) {
      var emptyMessage = document.createElement('li');
      emptyMessage.textContent = 'No tasks found.';
      taskList.appendChild(emptyMessage);
    } else {
      tasks.forEach(function(task) {
        var listItem = document.createElement('li');
        var taskContainer = document.createElement('div');
        taskContainer.style.display = 'flex'; // Apply flex layout to task container
  
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.checked;
        checkbox.addEventListener('change', function(e) {
          task.checked = e.target.checked;
          localStorage.setItem('tasks', JSON.stringify(tasks));
          showTasks();
        });
  
        var text = document.createElement('span');
        text.textContent = task.text;
        text.style.textDecoration = task.checked ? 'line-through' : 'none'; // Apply line-through if task is checked
  
        var timestampContainer = document.createElement('div');
        timestampContainer.style.marginLeft = 'auto'; // Push timestamp to the right
  
        var date = document.createElement('span');
        date.textContent = new Date(task.timestamp).toLocaleDateString();
        var time = document.createElement('span');
        time.textContent = new Date(task.timestamp).toLocaleTimeString();
  
        timestampContainer.appendChild(date);
        timestampContainer.appendChild(time);
  
        taskContainer.appendChild(checkbox);
        taskContainer.appendChild(text);
        taskContainer.appendChild(timestampContainer);
        listItem.appendChild(taskContainer);
        taskList.appendChild(listItem);
      });
    }
  }
  
  showTasks();
  