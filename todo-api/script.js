const todoInputElement = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-btn");
const todoUlList = document.querySelector("#todo-ul-list");
const removeBtn = document.querySelector("#remove-btn");
const editBtn = document.querySelector("#edit-btn");
const allBtn = document.querySelector("#all");
const openBtn = document.querySelector("#open");
const closeBtn = document.querySelector("#close");

const state = {
  todos: [],
};

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
      state.todos = todosApi;
      console.log(state.todos);
      renderHtml();
    });
}
/////////////////////////////////
function addTodo() {
  const newTodo = {
    description: todoInputElement.value,
    done: false,
  };
  fetch("http://localhost:4730/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  })
    .then((response) => response.json())
    .then((todoFromApi) => {
      state.todos.push(todoFromApi);
      todoInputElement.value = "";
      renderHtml();
      //zw.Z.36-39 hier ändere ich Backend
      // Z.43 - hier lese ich die Kopie von geändertem Backend
      // Z. 45 hier aktualiseiere ich mein Frontend -also die todos-Liste lokal!!!
      //Z.47 hier zeige ich die LOKALE aktualisierte todos-Liste im Browser
    });
}

addBtn.addEventListener("click", function () {
  addTodo();
});

/////////////////////////////////
function updateCheckboxState(todoData) {
  fetch("http://localhost:4730/todos/" + todoData.id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      description: todoData.description,
      done: !todoData.done,
    }),
  })
    .then((response) => response.json())
    .then((updatedTodoApi) => {
      todoData.done = updatedTodoApi.done;
      renderHtml();
    });
}

/////////////////////////////////
function renderHtml() {
  todoUlList.innerHTML = "";

  state.todos.forEach((todo) => {
    const newLiElement = document.createElement("li");
    const textLi = document.createTextNode(todo.description);
    newLiElement.append(textLi);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;

    checkbox.addEventListener("change", updateCheckboxState(todo));

    newLiElement.append(checkbox);
    todoUlList.appendChild(newLiElement);
  });
}
//////////////////////////////////
function deleteDataFromApi() {
  const doneTodos = state.todos.filter((todo) => todo.done === true);
  const fetchDeleteCalls = [];

  for (let doneTodo of doneTodos) {
    fetchDeleteCalls.push(
      fetch("http://localhost:4730/todos/" + doneTodo.id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
    );
  }

  Promise.all(fetchDeleteCalls).then(() => {
    state.todos = state.todos.filter((todo) => todo.done === false);
    renderTodos();
  });
}

removeBtn.addEventListener("click", function () {
  removeTodoFromApi();
});
/////////////////////////////////
// function editTodo(todoEdit, todoInputElement) {}
// for (const todo of state.todos) {
//   if (todo.done === false) {
//     fetch("http://localhost:4730/todos/" + todo.id, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         description: todoInputElement.value,
//         done: todo.done,
//       }),
//     })
//       .then((response) => response.json())
//       .then((editedTodo) => {
//         console.log(editedTodo);
//         todoEdit.description = editedTodo.description;
//         //console.log(todos);
//         renderHtml();
//       });
//   }
// }
// function todoEditing() {
//   state.todos.forEach((todo) => {
//     checkbox.addEventListener("change", editTodo(todo, todoInputElement));
//   });
// }

// editBtn.addEventListener("click", function () {
//   todoEditing();
// });
///////////////////////////////

readDataFromApi();
