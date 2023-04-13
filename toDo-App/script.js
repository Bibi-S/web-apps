let todosStateList = []; //hier initialisiere ich meine todo-list ABER "intern"!!!!

const todoInputElement = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-btn");
const todoUlList = document.querySelector("#todo-ul-list");

//todoUlList.innerHTML = "";

///////*******************STATE MANAGEMENT************************////////

///////UPDATE STATE LIST -  Function ////////////  -----"intern"!!!!
function updateTodosStateList() {
  let newTodo = {
    id: Date.now(),
    description: todoInputElement.value,
    done: false,
  };
  todosStateList.push(newTodo);
}

//UPDATE STATE LIST - Action //////////////////
addBtn.addEventListener("click", function () {
  updateTodosStateList();
  renderHtml();
});

///////************************************************************////////

///////*******************RENDER**********************************////////

///////UPDATE HTML - ADD TODOS ////////// -----"extern" für User sichtbar!!!!
function renderHtml() {
  todoUlList.innerHTML = "";

  //todosStateList.description = todoInputElement.value;

  for (let i = 0; i < todosStateList.length; i++) {
    const todo = todosStateList[i];
    const newLiElement = document.createElement("li"); //create -method nur am DOM Element!!!!
    const text = document.createTextNode(todo.description);
    newLiElement.append(text);

    todoUlList.appendChild(newLiElement);
  }
}

///////***********************************************************////////
renderHtml();
