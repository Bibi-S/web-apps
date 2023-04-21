let todos = [];

const todoInputElement = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-btn");
const todoUlList = document.querySelector("#todo-ul-list");
const removeBtn = document.querySelector("#remove-btn");
const allBtn = document.querySelector("#all");
const openBtn = document.querySelector("#open");
const closeBtn = document.querySelector("#close");

function readApi() {
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

function renderHtml() {
  todoUlList.innerHTML = "";
  todos.forEach((todo) => {
    const newLiElement = document.createElement("li");
    const textLi = document.createTextNode(todo.description);
    newLiElement.append(textLi);
    todoUlList.appendChild(newLiElement);
  });
}

readApi();
addBtn.addEventListener("click", function () {
  readApi();
});
