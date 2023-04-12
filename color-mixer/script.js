const redColor = document.querySelector("#red");
//console.log(redColor);
const greenColor = document.querySelector("#green");
const blueColor = document.querySelector("#blue");
const bodyElement = document.querySelector("body");
const mixedCodeElement = document.querySelector("#color-code");

///////// Color Mixer //////////
redColor.addEventListener("input", colorMixer);
greenColor.addEventListener("input", colorMixer);
blueColor.addEventListener("input", colorMixer);
colorMixer();
function colorMixer(event) {
  let mainColor = ` rgb(${redColor.value},${greenColor.value},${blueColor.value})`;
  //console.log(mainColor);
  bodyElement.style.backgroundColor = mainColor;

  mixedCodeElement.textContent = rgbToHex(
    redColor.value,
    greenColor.value,
    blueColor.value
  );
}

//////// RGB to Hex Code ////////

function colorToHex(colorNum) {
  hexColor = colorNum.toString(16);
  if (hexColor.length === 1) {
    hexColor = "0" + hexColor;
  }
  return hexColor;
}
function rgbToHex(re, gr, bl) {
  return (
    "#" +
    colorToHex(parseInt(re)) +
    colorToHex(parseInt(gr)) +
    colorToHex(parseInt(bl))
  );
}
