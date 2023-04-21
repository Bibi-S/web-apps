let todos = [];

const todoInputElement = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-btn");
const todoUlList = document.querySelector("#todo-ul-list");
const removeBtn = document.querySelector("#remove-btn");
const allBtn = document.querySelector("#all");
const openBtn = document.querySelector("#open");
const closeBtn = document.querySelector("#close");
/////////////////////////////////
function readDataFromApi() {
  fetch("http://localhost:4730/todos")
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        console.log("ERROR");
      }
    })
    .then((todosApi) => {
      todos = todosApi;
      console.log(todos);
      renderHtml();
    });
}

/////////////////////////////////
// function addTodo() {
//   const todoText = todoInputElement.value;
//   const newTodo = {
//     description: todoText,
//     done: false,
//   };
//   return newTodo;
// }
function addTodoToApi() {
  //addTodo();
  //const todo = newTodo;
  const todoText = todoInputElement.value;
  const newTodo = {
    description: todoText,
    done: false,
  };
  fetch("http://localhost:4730/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo), // JSON.stringify(newTodo);
  })
    .then((response) => response.json())
    .then((todoFromApi) => {
      todos.push(todoFromApi);
      renderHtml();
    });
}
function removeTodoFromApi() {
  fetch("http://localhost:4730/todos/", {
    //http://localhost:4730/todos"....[]
    //hier func mit done===true einbauen
    method: "DELETE",
  })
    .then((response) => response.json())
    .then(() => {});
}
/////////////////////////////////
function renderHtml() {
  todoUlList.innerHTML = "";
  todos.forEach((todo) => {
    const newLiElement = document.createElement("li");
    const textLi = document.createTextNode(todo.description);
    newLiElement.append(textLi);
    todoUlList.appendChild(newLiElement);
  });
}
////////////////////////////////
readDataFromApi();

addBtn.addEventListener("click", function () {
  addTodoToApi();
});

removeBtn.addEventListener("click", function () {
  readDataFromApi();
  removeTodoFromApi();
  renderHtml();
});
