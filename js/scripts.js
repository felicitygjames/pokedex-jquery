let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
      // &&
      // "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      alert("Please enter a valid pokemon");
    }
  }
  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon) {
    let ul = document.querySelector(".pokemon-list");
    // let ul = document.createElement("ul");
    // ul.classList.add("pokemon-list");
    let li = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    li.appendChild(button);
    ul.appendChild(li);
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_detault;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

console.log(pokemonRepository.getAll());

// console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// let color = "";
// if (pokemon.types.includes("grass")) {
//   color = '<span style="color:green;">';
// } else if (pokemon.types.includes("flying")) {
//   color = '<span style="color:lightblue;">';
// } else if (pokemon.types.includes("water")) {
//   color = '<span style="color:blue;">';
// } else if (pokemon.types.includes("fire")) {
//   color = '<span style="color:red;">';
// } else if (pokemon.types.includes("electric")) {
//   color = '<span style="color:yellow;">';
// }
// let size = "";
// if (pokemon.height > 1) {
//   size = "It's a big pokemon!";
// } else if (pokemon.height < 0.7) {
//   size = "It's a small pokemon!";
// } else {
//   size = "It's an average pokemon";
// }
// document.write(
//   '<div class = "box">' +
//     pokemon.name +
//     " (height: " +
//     pokemon.height +
//     ") " +
//     size +
//     color +
//     "<br>" +
//     pokemon.types +
//     "<br>" +
//     "</div>"
// );

// pokemonRepository.loadList().then(function() {
//   // Now the data is loaded!
//   pokemonRepository.getAll().forEach(function(pokemon){
//     pokemonRepository.addListItem(pokemon);
//   });
// });

// function showDetails(pokemon) {
//   loadDetails(pokemon).then(function () {
//     console.log(pokemon);
//   });
// }
