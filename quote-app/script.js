let quoteList = [];
const olList = document.querySelector("#ol-list");
const quotesBtn = document.querySelector("#button");

function addQuote() {
  fetch("https://dummy-apis.netlify.app/api/quote")
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        console.log("ERROR");
      }
    })
    .then((data) => {
      const quoteText = data.quote;
      const quoteAuthor = data.author;
      quoteList.push(quoteText, quoteAuthor);
      // return result.push(quoteText, quoteAuthor);
    });
}

function renderApp() {
  console.log(quoteList[0]);
  console.log(quoteList[1]);
  const newLiElement = document.createElement("li");
  const textLi = document.createTextNode(quoteList[0]);
  newLiElement.append(textLi);
  const divElement = document.createElement("div");
  const textDiv = document.createTextNode(quoteList[1]);
  divElement.append(textDiv);
  olList.appendChild(newLiElement);
  olList.append(divElement);
}

quotesBtn.addEventListener("click", function () {
  addQuote();
  renderApp();
  console.log(quoteList);
});
// renderApp();
