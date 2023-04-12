const showButtonElement = document.querySelector("#show");
const passwordElement = document.querySelector("#passWord");
//console.log(showButtonElement.innerText);

function showPassword() {
  if (showButtonElement.innerText === "Show Password") {
    showButtonElement.innerText = "Hide Password";
    passwordElement.type = "text";
  } else {
    showButtonElement.innerText = "Show Password";
    passwordElement.type = "password";
  }
}
showButtonElement.addEventListener("click", showPassword);
