let quoteList = [];
const olList = document.querySelector("#ol-list");
const author = document.querySelector(".author");
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
      //console.log("fetch");
      const quoteText = data.quote;
      const quoteAuthor = data.author;
      listWithFetch = [quoteText, quoteAuthor];
      quoteList = listWithFetch;
      renderApp();
      // return result.push(quoteText, quoteAuthor);
    });
}

function renderApp() {
  //console.log(quoteList[0]);
  // console.log(quoteList[1]);
  //console.log("render");
  olList.innerHTML = "";
  const newLiElement = document.createElement("li");
  const textLi = document.createTextNode(quoteList[0]);
  newLiElement.append(textLi);
  olList.appendChild(newLiElement);
  author.innerText = quoteList[1];
}

quotesBtn.addEventListener("click", function () {
  addQuote();

  //console.log(quoteList);
});
