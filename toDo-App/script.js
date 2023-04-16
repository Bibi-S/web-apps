let todosStateList = [];
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

///////UPDATE STATE LIST - Functions ////////////

//Adds New Todo Object in StateList-"intern"!
function addTodoObj() {
  let newTodo = {
    id: Date.now(),
    description: todoInputElement.value,
    done: false,
  };
  todosStateList.push(newTodo);
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
      //filterdTodoList = [...filterdTodoList, todofilterdObj];
    }
  }

  console.log(filterdTodoList);
  // console.log(todosStateList);
}

function filterClose() {
  let filterdTodoList = [];
  for (let i = 0; i < todosStateList.length; i++) {
    const todofilterdObj = todosStateList[i];

    if (todofilterdObj.done === true) {
      filterdTodoList.push(todofilterdObj);
      //filterdTodoList = [...filterdTodoList, todofilterdObj];
    }
  }

  console.log(filterdTodoList);
  //console.log(todosStateList);
}
///////UPDATE STATE LIST - Actions //////////////////
addBtn.addEventListener("click", function () {
  addTodoObj();
  renderHtml();
  todoInputElement.value = "";
});

removeBtn.addEventListener("click", function () {
  removeTodoObj();
  renderHtml();
});

allBtn.addEventListener("change", function () {
  todosStateList;
  console.log(todosStateList);
  renderHtml();
});

openBtn.addEventListener("change", function () {
  filterOpen();
  //renderHtml();
});

closeBtn.addEventListener("change", function () {
  filterClose();
  //renderHtml();
});

///////************************************************************///////////////////

///////**********************RENDER*******************************///////////////////

///////UPDATE HTML - ADD/REMOVE TODOS ////////// -----"extern" für User sichtbar!!!!
function renderHtml() {
  todoUlList.innerHTML = "";

  for (let i = 0; i < todosStateList.length; i++) {
    const todo = todosStateList[i];
    // console.log(todo.done);
    //console.log(todo);

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
      //ALTERNATIVE;
      // todo.done = checkbox.checked;
    });

    newLiElement.appendChild(checkbox);
    todoUlList.appendChild(newLiElement);
  }
}

///////************************************************************///////////////////
renderHtml();
