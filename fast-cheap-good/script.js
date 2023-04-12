const boxes = document.querySelectorAll("input[type=checkbox]");
//console.log(boxes);
let boxList = [];

for (const checkbox of boxes) {
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      if (boxList.length == 2) {
        const lastElement = boxList.pop();
        lastElement.checked = false;
      }
      boxList.push(checkbox);
      console.log(boxList.push(checkbox));
    } else {
      boxList.splice(boxes.indexOf(checkbox), 1);
    }
  });
}
