const centerCounterElement = document.querySelector("#counter");
const resetElement = document.querySelector("#reseted");
const mainElement = document.querySelector(".flexy");
const bodyElement = document.querySelector("body");

let countNum = 0;
let colorCounter = 0;

centerCounterElement.addEventListener("click", function () {
  colorCounter++;
  if (countNum >= 0 && countNum < 101) {
    countNum++;
    centerCounterElement.textContent = countNum;
  } else {
    centerCounterElement.textContent = 0;
    colorCounter = 0;
  }
  mainElement.style.setProperty("--counter", colorCounter + "%");
});
resetElement.addEventListener("click", function () {
  centerCounterElement.textContent = 0;
  countNum = 0;
  colorCounter = 0;
  mainElement.style.setProperty("--counter", 0 + "%");
});

bodyElement.addEventListener("keyup", function (event) {
  if (event.key === "Enter" || event.key === "Space") {
    colorCounter++;
    if (countNum >= 0 && countNum < 101) {
      countNum++;
      centerCounterElement.textContent = countNum;
    } else {
      centerCounterElement.textContent = 0;
      colorCounter = 0;
    }
    mainElement.style.setProperty("--counter", colorCounter + "%");
  }
});
/// das funktioniert nicht!!!!
