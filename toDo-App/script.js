let todosStateList = []; //hier initialisiere ich meine todos -( state )- list ABER "intern"!!!!
// später kommen diese Daten vom Backend

const todoInputElement = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-btn");
const todoUlList = document.querySelector("#todo-ul-list");
const removeBtn = document.querySelector("#remove-btn");

///////*******************STATE MANAGEMENT************************/////////////////

///////UPDATE STATE LIST - Function ////////////

//Adds New Todo Object in StateList-"intern"!
function addTodoObj() {
  let newTodo = {
    id: Date.now(),
    description: todoInputElement.value,
    done: false,
  };
  todosStateList.push(newTodo);
}

///////UPDATE STATE LIST - Action //////////////////
addBtn.addEventListener("click", function () {
  addTodoObj();
  renderHtmlAdd();
  todoInputElement.value = "";
});

removeBtn.addEventListener("click", function () {
  renderHtmlRemove();
});

///////************************************************************///////////////////

///////**********************RENDER*******************************///////////////////

///////UPDATE HTML - ADD TODOS ////////// -----"extern" für User sichtbar!!!!
function renderHtmlAdd() {
  todoUlList.innerHTML = "";

  for (let i = 0; i < todosStateList.length; i++) {
    const todo = todosStateList[i];

    const newLiElement = document.createElement("li"); //create -method nur am DOM Element!!!!
    const text = document.createTextNode(todo.description);
    newLiElement.append(text);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        todo.done = true;
      } else {
        todo.done = false;
      }
    });

    newLiElement.appendChild(checkbox);
    todoUlList.appendChild(newLiElement);
  }
}
// ///////UPDATE HTML - REMOVE TODOS ////////// -----"extern" für User sichtbar!!!!
function renderHtmlRemove() {
  let indexFinder = todosStateList.findIndex((item) => item.done === true);

  let doneTodoIndex = indexFinder;
  todosStateList.splice(doneTodoIndex, 1);

  // for (let i = 0; i < todosStateList.length; i++) {
  //   const todoDel = todosStateList[i].done;
  //   console.log(todoDel);
  //   let findervar = todosStateList.find(
  //     (todoDel) => todoDel.done === true
  //   ).done;
  //   console.log(findervar);
  // }
}
// if ((todo.done = true)) {
//   let finder = todosStateList.findIndex((todo.done = true));
// }
// console.log(todo);
//console.log(find);
//todosStateList = [];
// todoUlList.innerHTML = "";

///////***********************************************************/////////////////
renderHtmlAdd();
