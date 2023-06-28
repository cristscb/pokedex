var apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
var pokemonContainer = document.getElementById('pokemonContainer');
var searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', function() {
  var searchValue = document.getElementById('searchInput').value.toLowerCase();
  searchPokemon(searchValue);
});

function searchPokemon(searchValue) {
  fetch(apiUrl + searchValue)
    .then(function(response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('No se encontró ningún Pokémon con ese nombre');
    })
    .then(function(data) {
      var pokemon = {
        name: data.name,
        types: data.types.map(function(type) {
          return type.type.name;
        }),
        imageUrl: data.sprites.front_default
      };

      displayPokemon(pokemon);
    })
    .catch(function(error) {
      alert(error.message);
    });
}

function displayPokemon(pokemon) {
  var card = document.createElement('div');
  card.className = 'pokemonCard';

  var image = document.createElement('img');
  image.className = 'pokemonImage';
  image.src = pokemon.imageUrl;

  var name = document.createElement('h3');
  name.className = 'pokemonName';
  name.textContent = pokemon.name;

  var types = document.createElement('p');
  types.className = 'pokemonType';
  types.textContent = 'Tipo: ' + pokemon.types.join(', ');

  card.appendChild(image);
  card.appendChild(name);
  card.appendChild(types);

  pokemonContainer.appendChild(card);
}