var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  modifyTodo: function(pos, todoText) {
    this.todos[pos].todoText = todoText;
  },
  deleteTodo: function(pos) {
    this.todos.splice(pos, 1);
  },
  toggleCompleted: function(pos) {
    var todo = this.todos[pos];
    todo.completed = !todo.completed;
  },
};

var handler = {
 addTodo: function() {
  var addInput = document.getElementById('addTask');
    todoList.addTodo(addInput.value);
    const keyInput = addInput.value;
    const valInput = addInput.value;

    if(keyInput && valInput) {
      localStorage.setItem(keyInput, valInput);
    }
    //localStorage.getItem(keyInput, valInput)

    addInput.value = '';
    listTodos.displayTodos();
 },
 modifyTodo: function() {
  var modifyPos = document.getElementById('modifyPosition');
  var modifyInput = document.getElementById('modifyTask')
    todoList.modifyTodo(modifyPos.valueAsNumber, modifyInput.value);
    modifyPos.value = '';
    modifyInput.value = '';
    listTodos.displayTodos();
  },
  deleteTodo: function(pos) {
    todoList.deleteTodo(pos);
    listTodos.displayTodos();
  },
 toggleCompleted: function() {
  var toggle = document.getElementById('toggleInput');
  todoList.toggleCompleted(toggle.valueAsNumber);
  toggle.value = '';
  listTodos.displayTodos();
 },
};

var listTodos = {
  displayTodos: function() {
   var todoUl = document.querySelector('ul');
   todoUl.innerHTML = '';
    for(let i = 0; i < todoList.todos.length; i++) {
      var todoLi = document.createElement('li');
      var todo = todoList.todos[i];
      var completedTodo = '';

      if(todo.completed === true) {
        completedTodo = '(√) ' + todo.todoText;
      }
      else {
        completedTodo = '( ) ' + todo.todoText;
      }
      todoLi.id = i;
      todoLi.textContent = completedTodo;
      todoLi.appendChild(this.cdBtn());
      todoUl.appendChild(todoLi);
    }
  },
  cdBtn: function() {
    var deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Remove';
    deleteBtn.className = 'deleteBtn';
    return deleteBtn;
  },
  setEvents: function() {
  var todoUl = document.querySelector('ul');

  todoUl.addEventListener('click', function(event) {
   var clicked = event.target;
   if(clicked.className === 'deleteBtn') {
    handler.deleteTodo(parseInt(clicked.parentNode.id));
   }
  });
 }
};

listTodos.setEvents();