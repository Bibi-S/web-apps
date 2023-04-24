const todoInputElement = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-btn");
const todoUlList = document.querySelector("#todo-ul-list");
const removeBtn = document.querySelector("#remove-btn");
const changeBtn = document.querySelector("#change-btn");
const allBtn = document.querySelector("#all");
const openBtn = document.querySelector("#open");
const closeBtn = document.querySelector("#close");

let todos = [];

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

function addTodoToApi() {
  const newTodo = {
    description: todoInputElement.value,
    done: false,
  };
  fetch("http://localhost:4730/todos", {
    //zw.Z.43-46 ändere ich Backend
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo), //JSON.stringify(todos[todos.length - 1])
  })
    .then((response) => response.json())
    .then((todoFromApi) => {
      //hier lese ich die Kopie von geändertem Backend
      todos.push(todoFromApi); //hier aktualiseiere ich mein Frontend -also die todos-Liste lokal!!!
      renderHtml(); //hier zeige ich die LOKALE aktualisierte todos-Liste im Browser
    });
}
//////////////////////////////////
function removeTodoFromApi() {
  // //filter ändert nicht das Orginal
  // const doneTodos = todos.filter((todo) => {
  //   return todo.done === true;
  // }); --hier bearbeite ich "NUR" die Kopie, nicht das Orginal

  for (const todo of todos) {
    if (todo.done === false) {
      fetch("http://localhost:4730/todos/" + todo.id, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((deletedTodo) => {
          console.log(deletedTodo);
          readDataFromApi();
          renderHtml();
        });
      console.log(todos);
    }
  }
}

/////////////////////////////////
function editTodo() {}
for (const todo of todos) {
  if (todo.done === false) {
    fetch("http://localhost:4730/todos/" + todo.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: todoInputElement.value,
        done: todo.done,
      }),
    })
      .then((response) => response.json())
      .then((changedTodo) => {
        console.log(changedTodo);
        todo.description = changedTodo.description;
        //console.log(todos);
        renderHtml();
      });
  }
}

/////////////////////////////////
function renderHtml() {
  todoUlList.innerHTML = "";
  todos.forEach((todo) => {
    const newLiElement = document.createElement("li");
    const textLi = document.createTextNode(todo.description);
    newLiElement.append(textLi);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;

    checkbox.addEventListener("change", function () {
      if (todos.some((todo) => todo.done === true)) {
        fetch("http://localhost:4730/todos/" + todo.id, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            description: todo.description,
            done: !todo.done,
          }),
        })
          .then((response) => response.json())
          .then((updatedTodoFromApi) => {
            todo.done = updatedTodoFromApi.done;
            //console.log(updatedTodoFromApi);
            console.log(todos);
          });
      }
    });

    newLiElement.append(checkbox);
    todoUlList.appendChild(newLiElement);
  });
}

// ////////////////////////////////

// function chooseTodo() {
//   checkbox.addEventListener("change", function () {});
//   const checkboxElements = document.querySelectorAll("input[type = checkbox]");
//   console.log(checkboxElements);
// }
///////////////////////////////
readDataFromApi();

addBtn.addEventListener("click", function () {
  addTodoToApi();
});

removeBtn.addEventListener("click", function () {
  removeTodoFromApi();
});

changeBtn.addEventListener("click", function () {
  editTodo();
});
