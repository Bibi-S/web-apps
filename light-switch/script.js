const lightButtonElement = document.querySelector(".button-light");
const darkButtonElement = document.querySelector(".button-dark");
const lightBodyElement = document.querySelector(".body-light");
const darkBodyElement = document.querySelector(".body-dark");

function updateDark() {
  let element = document.getElementById("but");
  let elementBody = document.getElementById("bod");
  element.classList.toggle("button-light");
  elementBody.classList.toggle("body-light");
  element.classList.toggle("button-dark");
  elementBody.classList.toggle("body-dark");
}

function updateLight() {
  let element = document.getElementById("but");
  let elementBody = document.getElementById("bod");
  element.classList.toggle("button-dark");
  elementBody.classList.toggle("body-dark");
}

darkButtonElement.addEventListener("click", updateDark);
lightButtonElement.addEventListener("click", updateLight);

// function toggle() {
//   const lightButtonElement = document.querySelector(".button-light");
//   const darkButtonElement = document.querySelector(".button-dark");
// }

// let hidebutton = document.querySelector(".but");
// hidebutton.onclick = toggle;
