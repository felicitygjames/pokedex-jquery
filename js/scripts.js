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
    let ul = $(".pokemon-list");
    let li = $("<li></li>");
    let button = $(
      '<button class = "button-class">' + pokemon.name + "</button>"
    );
    li.append(button);
    ul.append(li);
    button.on("click", function (event) {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      console.log(pokemon);
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    let modalContainer = $("#modal-container");
    modalContainer.empty();
    let modal = $('<div class = "modal"></div>');
    let closeButton = $('<button class = "modal-close">Close</button>');
    closeButton.on("click", hideModal);
    let name = $("<h1>" + pokemon.name + "</h1>");
    let image = $('<img class = "modal-img">');
    image.attr("src", pokemon.imageUrl);
    let imageAnimated = $('<img class = "modal-img-animated">');
    imageAnimated.attr("src", pokemon.imageUrlAnimated);
    let height = $("<h3>" + "height: " + pokemon.height + "</h3>");
    let types = $("<h3>" + "types: " + pokemon.types + "</h3>");
    let abilities = $("<h3>" + "abilities: " + pokemon.abilities + "</h3>");
    modal.append(name);
    modal.append(image);
    modal.append(imageAnimated);
    modal.append(height);
    modal.append(types);
    modal.append(abilities);
    modal.append(closeButton);
    modalContainer.append(modal);
    modalContainer.addClass("is-visible");
  }

  function hideModal() {
    let modalContainer = $("#modal-container");
    modalContainer.removeClass("is-visible");
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
        item.imageUrlAnimated =
          details.sprites.versions["generation-v"][
            "black-white"
          ].animated.front_default;
        item.height = details.height;
        item.types = [];
        details.types.forEach(function (itemType) {
          item.types.push(itemType.type.name);
        });
        item.abilities = [];
        details.abilities.forEach(function (itemAbility) {
          item.abilities.push(itemAbility.ability.name);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  let modalContainer = $('#modal-container');

  $(window).on('keydown', (e) => {
    let modalContainer = $('#modal-container');
    if (e.key === 'Escape' && modalContainer.hasClass('is-visible')) {
      hideModal();
    }
  });

  modalContainer.on("click", (e) => {
    if (modalContainer.hasClass('is-visible')) {
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
    showModal: showModal,
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
