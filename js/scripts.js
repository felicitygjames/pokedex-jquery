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

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      console.log(pokemon);
      showModal(pokemon)
    });
  }

  function showModal (pokemon) {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.innerHTML = "";
    let modal = document.createElement("div");
    modal.classList.add("modal");
    let closeButton = document.createElement("button");
    closeButton.classList.add("modal-close");
    closeButton.innerText = "close";
    closeButton.addEventListener("click", hideModal);
    let name = document.createElement("h1");
    name.innerText = pokemon.name;
    let image = document.createElement("img");
    image.classList.add("modal-img");
    image.setAttribute("src", pokemon.imageUrl);
    let imageAnimated = document.createElement("img");
    imageAnimated.classList.add("modal-img-animated");
    imageAnimated.setAttribute("src", pokemon.imageUrlAnimated);
    let height = document.createElement("h3");
    height.innerText = "height: " + pokemon.height;
    let types = document.createElement("h3");
    types.innerText = "types: " + pokemon.types;
    let abilities = document.createElement("h3");
    abilities.innerText = "abilities: " + pokemon.abilities;
    modal.appendChild(name);
    modal.appendChild(image);
    modal.appendChild(imageAnimated);
    modal.appendChild(height);
    modal.appendChild(types);
    modal.appendChild(abilities);
    modal.appendChild(closeButton);
    modalContainer.appendChild(modal);
    modalContainer.classList.add("is-visible");
  }

  function hideModal () {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
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
          // console.log(pokemon);
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
        item.imageUrl = details.sprites.other.dream_world.front_default;
        item.imageUrlAnimated = details.sprites.versions['generation-v']['black-white'].animated.front_default;
        item.height = details.height;
        item.types = [];
        details.types.forEach(function(itemType) {
          item.types.push(itemType.type.name)
        })
        item.abilities = [];
        details.abilities.forEach(function(itemAbility) {
          item.abilities.push(itemAbility.ability.name);
        })
      })
      .catch(function (e) {
        console.error(e);
      });
  }
let modalContainer = document.querySelector('#modal-container');

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });

  modalContainer.addEventListener("click", (e) => {
    let modalContainer = document.querySelector('#modal-container');
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal
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
