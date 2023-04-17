let todosStateList = [];
let filterdTodoStateList = [];
//hier initialisiere ich meine todos -( state )- list ABER "intern"!!!!
// später kommen diese Daten vom Backend

const todoInputElement = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-btn");
const todoUlList = document.querySelector("#todo-ul-list");
const removeBtn = document.querySelector("#remove-btn");
const allBtn = document.querySelector("#all");
const openBtn = document.querySelector("#open");
const closeBtn = document.querySelector("#close");

///////*******************STATE MANAGEMENT************************/////////////////

///// UPDATE LOCAL STORAGE - Functions ///////////

//Writes to Local Storage-"intern"!
function updateLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todosStateList));
}
//Reads from Local Storage-"intern"!
function readLocalStorage() {
  const todosLocalStorage = localStorage.getItem("todos");
  if (todosLocalStorage !== null) {
    todosStateList = JSON.parse(todosLocalStorage);
    // } else {
    //   updateLocalStorage();
    //   todosStateList = JSON.parse(todosLocalStorage);
  }
}

///// UPDATE STATE LIST - Functions ////////////

//Adds New Todo Object in StateList-"intern"!
function addTodoObj() {
  let newTodo = {
    id: Date.now(),
    description: todoInputElement.value,
    done: false,
  };
  todosStateList.push(newTodo);
  updateLocalStorage();
}

//Removes "Done"-Todo Object from StateList - "intern"!
function removeTodoObj() {
  const filterElements = todosStateList.filter((item) => item.done === false);
  todosStateList = filterElements;

  //--------ALTERNATIVE: hier nur ein Todo pro "klick"-----------//
  // const indexFinder = todosStateList.findIndex((item) => item.done === true);
  // const doneTodoIndex = indexFinder;
  // todosStateList.splice(doneTodoIndex, 1); -hier nur ein Todo pro "klick"
}
//Filters Open and Close - Todo - Objects in StateList - "intern"!
function filterOpen() {
  let filterdTodoList = [];
  for (let i = 0; i < todosStateList.length; i++) {
    const todofilterdObj = todosStateList[i];
    if (todofilterdObj.done === false) {
      filterdTodoList.push(todofilterdObj);
      // ALTERNATIVE für Copy:
      //filterdTodoList = [...filterdTodoList, todofilterdObj];
      //console.log(todofilterdObj);
    }
  }
  filterdTodoStateList = filterdTodoList;
  //console.log(filterdTodoStateList);
}

function filterClose() {
  let filterdTodoList = [];
  for (let i = 0; i < todosStateList.length; i++) {
    const todofilterdObj = todosStateList[i];
    //console.log(todofilterdObj);
    if (todofilterdObj.done === true) {
      filterdTodoList.push(todofilterdObj);
      // ALTERNATIVE für Copy:
      //filterdTodoList = [...filterdTodoList, todofilterdObj];
      //console.log(todofilterdObj);
    }
  }
  filterdTodoStateList = filterdTodoList;
  //console.log(filterdTodoStateList);
}

///////UPDATE STATE LIST - Actions //////////////////

// Adds new ToDo
addBtn.addEventListener("click", function () {
  //console.log(todoInputElement.value);
  // console.log(todosStateList);
  if (
    todosStateList.some(
      (item) =>
        item.description.toLowerCase() === todoInputElement.value.toLowerCase()
    )
  ) {
    window.alert("todo alrady exist");
  } else {
    addTodoObj();
    updateLocalStorage();
    renderHtml();
    todoInputElement.value = "";
  }
});
// Removes Close ToDo
removeBtn.addEventListener("click", function () {
  removeTodoObj();
  updateLocalStorage();
  renderHtml();
});

//Filters All
allBtn.addEventListener("change", function () {
  todosStateList;
  renderHtml();
});

//Filters Open
openBtn.addEventListener("change", function () {
  filterOpen();
  renderHtmlFilterd();
});

//Filters Close
closeBtn.addEventListener("change", function () {
  filterClose();
  renderHtmlFilterd();
});

///////************************************************************///////////////////

///////**********************RENDER*******************************///////////////////

/////// UPDATE HTML - ADD/REMOVE TODOS ////////// -----"extern" für User sichtbar!!!!
function renderHtml() {
  todoUlList.innerHTML = "";

  for (let i = 0; i < todosStateList.length; i++) {
    const todo = todosStateList[i];

    const newLiElement = document.createElement("li"); //create -method nur am DOM Element!!!!
    const text = document.createTextNode(todo.description);
    newLiElement.append(text);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        todo.done = true;
      } else {
        todo.done = false;
      }
      updateLocalStorage();
      //ALTERNATIVE;
      // todo.done = checkbox.checked;
    });

    newLiElement.appendChild(checkbox);
    todoUlList.appendChild(newLiElement);
  }
}
/////// FILTER HTML //////////////////////////////-----"extern" für User sichtbar!!!!

function renderHtmlFilterd() {
  todoUlList.innerHTML = "";

  for (let i = 0; i < filterdTodoStateList.length; i++) {
    const todofilterdObj = filterdTodoStateList[i];
    const newLiElement = document.createElement("li");
    const text = document.createTextNode(todofilterdObj.description);
    newLiElement.append(text);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todofilterdObj.done;
    newLiElement.appendChild(checkbox);
    todoUlList.appendChild(newLiElement);
  }
}
///////********************************updateLocalStorage();

readLocalStorage();
updateLocalStorage();
renderHtml();
