document.addEventListener('DOMContentLoaded', function () {
  const addTaskForm = document.getElementById('addtask');
  const todoList = document.getElementById('todolist-body');

  addTaskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const newTodoInput = document.getElementById('newtodo');
    const todoText = newTodoInput.value.trim();
    if (todoText !== '') {
      createNewTodoItem(todoText);
      newTodoInput.value = '';
    }
  });

  function createNewTodoItem(text) {
    const todoItem = document.createElement('div');
    todoItem.className = 'newtask';
    todoItem.innerHTML = `
      <p>${text}</p>
      <i class="bi bi-square"></i>
      <i class="bi bi-check-square-fill"></i>
      <i class="bi bi-trash"></i>
    `;
    

    todoList.appendChild(todoItem);

    // Add event listener for marking as done and deleting
    const checkboxes = todoItem.querySelectorAll('.bi-square, .bi-check-square-fill, .bi-trash');
    checkboxes[0].addEventListener('click', () => toggleDone(todoItem));
    checkboxes[2].addEventListener('click', () => deleteTodoItem(todoItem));
  }

  function toggleDone(todoItem) {
    todoItem.classList.toggle('done');
  }

  function deleteTodoItem(todoItem) {
    todoItem.remove();
  }
});
