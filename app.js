const BASE_URL = `https://rickandmortyapi.com/api/character`;
const btn = document.getElementById('temp-btn');
const div = document.getElementById('output');

async function getData() {
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