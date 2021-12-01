const nextButton = document.querySelector(".page_button");
let baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=10";

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
      console.log(data);
      renderArticles(data);
      baseUrl = data.next;
    })
    .catch((error) => console.error("Error:", error));
}

function renderArticles(data) {
  const articles = data.results;
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
        const articleDiv = document.getElementById("article");
        const pokeArticleName = pokeArticle.name.toUpperCase();
        const heading = document.createElement("h1");
        heading.innerHTML = pokeArticleName;
        articleDiv.appendChild(heading);
        console.log("data", data);
        const pokeArticleImg = data.sprites.front_default;
        const image = document.createElement("img");
        image.src = pokeArticleImg;
        articleDiv.appendChild(image);
        const pokeArticleHeight = data.height;
        const height = document.createElement("h2");
        height.innerHTML = "Height: " + convertHeight(pokeArticleHeight);
        articleDiv.appendChild(height);
        const pokeArticleWeight = data.weight;
        const weight = document.createElement("h2");
        weight.innerHTML = "Weight: " + convertWeight(pokeArticleWeight);
        articleDiv.appendChild(weight);
      });
  });
}

function nextPage(url) {
  callApi(url);
}

nextButton.addEventListener("click", () => {
  nextPage(baseUrl);
});

function convertHeight(height) {
  const heightInMeters = height / 10 + "m";
  return heightInMeters;
}

function convertWeight(weight) {
  const weightInKilograms = weight / 10 + "kg";
  return weightInKilograms;
}
