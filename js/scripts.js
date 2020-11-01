let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Bulbasaur", height: 0.7, types: ["grass", " poison"] },
    { name: "Ivysaur", height: 1, types: ["water", " poison"] },
    { name: "Venusaur", height: 2, types: ["flying", " poison"] },
    { name: "Charmander", height: 0.6, types: ["fire"] },
  ];
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      alert("Please enter a valid pokemon");
    }
  }
  function getAll() {
    return pokemonList;
  }
  return {
    getAll: getAll,
    add: add,
  };
})();
console.log(pokemonRepository.getAll());
pokemonRepository.add({
  name: "Pikachu",
  height: 0.9,
  types: ["electric", " poison"],
});

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  let pokemonList = document.querySelector(".pokemon-list");
  let listPokemon = document.createElement("li");
  let button = document.createElement("button");
  button.innerText = "placeholder";
  button.classList.add("button-class");
  unorderedList.appendChild(button);
  container.appendChild(button);
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
});
