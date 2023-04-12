const state = {};

const toDos = document.querySelector("#to-do");
const addBtn = document.querySelector("#add-btn");
const tasksList = document.querySelector("#tasks-list");

let checky;
/////// ADD NEW TASK //////////
function addTask() {
  let result;
  let todoText = toDos.value;
  //typeof todoText === "string";
  //console.log(todoText);
  const newTask = document.createElement("li");
  const task = document.createElement("input");
  task.type = "checkbox";
  let checky = task.type;
  const taskText = document.createTextNode(`${todoText}`); //create -methon nur am DOM Element!!!!
  newTask.appendChild(task);
  newTask.append(taskText);

  //console.log(newTask.attributes);
  tasksList.appendChild(newTask);
  //console.log(tasksList);
  //console.log(taskText);
  return [newTask, checky];
}
addBtn.addEventListener("click", addTask);
////////////////////////////////
let arguments = addTask();
///// CREATE TASKS LIST /////////////
function createTasksList() {
  let arguments = addTask();

  let state;
  state.push({ description: arguments[0], done: arguments[1].checked });
}
//createTasksList();
console.log(state);
console.log(arguments[0]);
console.log(arguments[1]);
arguments[1].addEventListener("change", createTasksList);
/////////////////////////////
