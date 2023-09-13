// FORM SUBMIT
form.addEventListener('submit', function (event) {
    event.preventDefault();
  
    Todo();
    render();
    localStorage.setItem('todos', JSON.stringify(todos));
  });