const nextButton = document.querySelector(".page_button");
const toggleAlphabetical = document.querySelector(".toggle_alphabetical");
const articleDiv = document.getElementById("article");
const image = document.getElementById("image");
let baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=10";
let nextUrl = "";

let articles = [];

let sorted = false;

callApi(baseUrl);

function callApi(url) {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error");
      }
    })
    .then((data) => {
      articles = [...data.results];
      renderArticles(articles);
      nextUrl = data.next;
    })
    .catch((error) => console.error("Error:", error));
}

function renderArticles(articles) {
  articles.forEach((pokeArticle) => {
    fetch(pokeArticle.url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error");
        }
      })
      .then((data) => {
        const pokeArticleName = pokeArticle.name.toUpperCase();
        const heading = document.createElement("h1");
        heading.id = "heading";
        heading.innerHTML = pokeArticleName;
        articleDiv.appendChild(heading);
        console.log("data", data);
        const pokeArticleImg = data.sprites.front_default;
        const image = document.createElement("img");
        image.id = "image";
        image.src = pokeArticleImg;
        articleDiv.appendChild(image);
        const pokeArticleHeight = data.height;
        const height = document.createElement("h2");
        height.id = "height";
        height.innerHTML = "Height: " + convertHeight(pokeArticleHeight);
        articleDiv.appendChild(height);
        const pokeArticleWeight = data.weight;
        const weight = document.createElement("h2");
        weight.id = "weight";
        weight.innerHTML = "Weight: " + convertWeight(pokeArticleWeight);
        articleDiv.appendChild(weight);
      });
  });
}

function removeElements() {
  var child = articleDiv.lastElementChild;
  while (child) {
    articleDiv.removeChild(child);
    child = articleDiv.lastElementChild;
  }
}

function sortAlphabetically(data) {
  removeElements();
  data.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
  renderArticles(data);
}

toggleAlphabetical.addEventListener("click", () => {
  sortAlphabetically(articles);
});

nextButton.addEventListener("click", () => {
  callApi(nextUrl);
});

function convertHeight(height) {
  const heightInMeters = height / 10 + "m";
  return heightInMeters;
}

function convertWeight(weight) {
  const weightInKilograms = weight / 10 + "kg";
  return weightInKilograms;
}
