const btn = document.getElementById('temp-btn');
const div = document.getElementById('output');
const filter = document.getElementById('filter-characters');
const loaading = document.querySelector('.loader');
let page = 1;

function showLoader() {
  loaading.classList.add('show');
  setTimeout(() => {
    page++;
    clearDOM();
    getData()
    scrollUp();
  }, 300);
  setTimeout(() => {
    loaading.classList.remove('show');
  }, 1000);
}

function scrollUp(){
  window.scrollTo(0,0)
}

function clearDOM(){
  div.innerHTML = '';
}

function filterCharacters(e) {
  console.log(`VAL: ${e.target.value}`);
  const filterVal = document
    .getElementById('filter-characters')
    .value.toUpperCase();
  const card = document.querySelectorAll('.card');
  for (let i = 0; i < card.length; i++) {
    let h2 = card[i].getElementsByTagName('h2')[0];
    if (h2.innerHTML.toUpperCase().indexOf(filterVal) > -1) {
      card[i].style.display = '';
    } else {
      card[i].style.display = 'none';
    }
  }
}

async function getData() {
  const BASE_URL = `https://rickandmortyapi.com/api/character?page=${page}`;
  const res = await fetch(`${BASE_URL}`);
  const data = await res.json();
  showDataDOM(data);
}

function showDataDOM(data) {
  console.log(data);
  let output = '';
  data.results.forEach((character) => {
    output += `
    <div class="card">
    <div class="img-container"> 
      <img src="${character.image}" class="card--img" />
      </div>
      <h2 class="character-title">${character.name}</h2>
      <ul class="list">
    <li class="collection-item">
        ${
          character.status === 'Alive'
            ? `<span class="alive">Status: ${character.status}</span>`
            : `<span class="dead">Status: ${character.status}</span>`
        }
        </li> 
      <li class="collection-item">Planet: ${character.origin.name}</li>
      <li class="collection-item">Gender: ${character.gender}</li>
    </ul>
  </div>
    `;
  });
  div.innerHTML = output;
}
// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', getData);
filter.addEventListener('keyup', filterCharacters);
window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoader();
  }
});
