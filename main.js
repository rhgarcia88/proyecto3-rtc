import { generateHeader } from "./components/header/header.js";
import { createCard, accessKey } from "./components/card/card.js";
import { extraSearch } from "./components/functions/requests.js";

let searchKeyword;

const appDiv = document.querySelector("#app");
appDiv.innerHTML += generateHeader();

createCard(30).then(cards => {
  appDiv.innerHTML += `<div class="cards-container"> ${cards} </div>`;

  const h1 = document.querySelector("h1");
  h1.style.display = "none";

  const searchButton = document.querySelector(".search-button");
  const searchInput = document.querySelector("#search-input");
  const inspoLogo = document.querySelector(".logo-div");

  searchButton.addEventListener('click', () => {
    const inputValue = searchInput.value;
    searchImages(inputValue);
  });

  searchInput.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (document.activeElement === searchInput) {
        const inputValue = searchInput.value;
        searchImages(inputValue);
      }
    }
  });

  inspoLogo.addEventListener('click', () => {location.reload();})

  const searchImages = async (searchText) => {
    if (searchText && searchText.trim() !== "") {
      let cards = '';
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${searchText}&client_id=${accessKey}&per_page=30`);
      const data = await response.json();

      data.results.forEach(photo => {
        const imageUrl = photo.urls.regular;
        cards += `<div class="image-card">
          <img class="image-in-card" src="${imageUrl}">
        </div>`;
      });
      if(cards===''){
        h1.innerText = `No hay resultados para "${searchText}"`;
      }else{
        h1.innerText = `Mostrando imágenes de: ${searchText}`;
      }
console.log(cards);
      searchKeyword = searchText;
      h1.style.display = "block";


      const cardsContainer = document.querySelector(".cards-container");
      cardsContainer.innerHTML = cards;
    }
  };
});

let loading = false;

window.addEventListener('scroll', function() {
  if (!loading && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    loading = true;
    extraSearch(accessKey,searchKeyword).then(cards => { 
      const cardsContainer = document.querySelector(".cards-container");
      cardsContainer.innerHTML += cards;
      loading = false;
    })
  }
});