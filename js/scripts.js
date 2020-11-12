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
  // function addListItem(pokemon) {
  //   let ul = $(".pokemon-list");
  //   let li = $("<li></li>");
  //   let button = $(
  //     '<button class = "button-class">' + pokemon.name + "</button>"
  //   );
  //   li.append(button);
  //   ul.append(li);
  //   button.on("click", function (event) {
  //     showDetails(pokemon);
  //   });
  // }

  function addListItem(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      let row = $(".row");

      let card = $(
        '<div class="card mt-5" style="width: 18rem; margin:13px;"></div>'
      );
      let image = $('<img class="card-img mx-auto" style="width: 35%;" alt="...">');
      let title = $('<h5 class="card-title">' + pokemon.name + "</h5>");
      image.attr("src", pokemon.imageUrl);
      let body = $('<div class="card-body" style="text-align: center;"></div>');
      let button = $(
        '<button type="button" class="btn" style="background-color: #d88780; color: white" data-toggle="modal" data-target="#pokemonModal">See profile</button>'
      );

      //append
      row.append(card);
      card.append(image);
      card.append(body);
      body.append(title);
      body.append(button);

      button.on("click", function (event) {
        showDetails(pokemon);
      });
    });
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      console.log(pokemon);
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    let modalTitle = $(".modal-title");
    modalTitle.empty();
    let modalHeader = $(".modal-header");
    let pokemonName = $('<h1 style="color: white;">' + pokemon.name + "</h1>");
    let modalBody = $(".modal-body");
    modalBody.empty();
    let imageFront = $(
      '<img class="modal-img" alt="..." style="width: 50%; padding: 30px;">'
    );
    imageFront.attr("src", pokemon.imageUrl);
    // let imageBack = $(
    //   '<img class="modal-img" alt="..." style="width: 35%; padding: 30px;">'
    // );
    // imageBack.attr("src", pokemon.imageUrlBack);
    let modalProfile = $(
      '<h4 style="background-color:#d88780; padding: 5px; color: white;">Profile</h4>'
    );
    let pokemonHeight = $(
      "<p>" + "<strong>Height</strong>: " + pokemon.height + '"' + "</p>"
    );
    // //creating element for type in modal content
    let pokemonTypes = $(
      "<p>" + "<strong>Type</strong>: " + pokemon.types + "</p>"
    );
    // //creating element for abilities in modal content
    let pokemonAbilities = $(
      "<p>" + "<strong>Abilities</strong>: " + pokemon.abilities + "</p>"
    );

    modalTitle.append(pokemonName);
    modalBody.append(imageFront);
    // modalBody.append(imageBack);
    modalBody.append(modalProfile);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonTypes);
    modalBody.append(pokemonAbilities);

    if (pokemon.types.includes("grass")) {
      $(".modal-header").css("background-color", "rgb(120, 200, 80)");
    } else if (pokemon.types.includes("fire")) {
      $(".modal-header").css("background-color", "rgb(240, 128, 48)");
    } else if (pokemon.types.includes("poison")) {
      $(".modal-header").css("background-color", "rgb(168, 144, 240)");
    } else if (pokemon.types.includes("water")) {
      $(".modal-header").css("background-color", "rgb(104, 144, 240)");
    } else if (pokemon.types.includes("bug")) {
      $(".modal-header").css("background-color", "rgb(168, 184, 32)");
    } else if (pokemon.types.includes("water")) {
      $(".modal-header").css("background-color", "rgb(69, 120, 237)");
    } else if (pokemon.types.includes("ice")) {
      $(".modal-header").css("background-color", "rgb(66, 174, 174)");
    } else if (pokemon.types.includes("electric")) {
      $(".modal-header").css("background-color", "rgb(252, 234, 161)");
    } else if (pokemon.types.includes("ground")) {
      $(".modal-header").css("background-color", "rgb(219, 181, 77)");
    } else if (pokemon.types.includes("fairy")) {
      $(".modal-header").css("background-color", "rgb(232, 120, 144)");
    } else if (pokemon.types.includes("ghost")) {
      $(".modal-header").css("background-color", "rgb(100, 78, 136)");
    } else if (pokemon.types.includes("normal")) {
      $(".modal-header").css("background-color", "rgb(156, 156, 99)");
    }
  }



  // function showModal(pokemon) {
  //   let modalContainer = $("#modal-container");
  //   modalContainer.empty();
  //   let modal = $('<div class = "modal"></div>');
  //   let closeButton = $('<button class = "modal-close">Close</button>');
  //   closeButton.on("click", hideModal);
  //   let name = $("<h1>" + pokemon.name + "</h1>");
  //   let image = $('<img class = "modal-img">');
  //   image.attr("src", pokemon.imageUrl);
  //   let imageAnimated = $('<img class = "modal-img-animated">');
  //   imageAnimated.attr("src", pokemon.imageUrlAnimated);
  //   let height = $("<h3>" + "height: " + pokemon.height + "</h3>");
  //   let types = $("<h3>" + "types: " + pokemon.types + "</h3>");
  //   let abilities = $("<h3>" + "abilities: " + pokemon.abilities + "</h3>");
  //   modal.append(name);
  //   modal.append(image);
  //   modal.append(imageAnimated);
  //   modal.append(height);
  //   modal.append(types);
  //   modal.append(abilities);
  //   modal.append(closeButton);
  //   modalContainer.append(modal);
  //   modalContainer.addClass("is-visible");
  // }

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

function search() {
  let input, filter, row, card, a, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  row = document.getElementById("myrow");
  // card = row.getElementsByTagName("");
  card = row.querySelectorAll(".card");
  // console.log(card);
  // console.log(card[0].querySelector(".card-body").querySelector(".card-title"));
  for (i = 0; i < card.length; i++) {
    // a = card[i].getElementsByTagName("a")[0];
    a = card[i].querySelector(".card-body").querySelector(".card-title");
    // console.log(a.innerText);
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      card[i].style.display = "";
    } else {
      card[i].style.display = "none";
    }
  }
} 