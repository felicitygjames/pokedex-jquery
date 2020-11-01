let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Bulbasaur", height: 0.7, types: ["grass", " poison"] },
    { name: "Ivysaur", height: 1, types: ["grass", " poison"] },
    { name: "Venusaur", height: 2, types: ["grass", " poison"] },
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
    // document.body.appendChild(ul);

    button.addEventListener("click", function(){
      showDetails(pokemon);
    })
  }
function showDetails (pokemon){
  console.log(pokemon);
}

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
  };
})();
console.log(pokemonRepository.getAll());
pokemonRepository.add({
  name: "Charmeleon",
  height: 1.1,
  types: ["fire"],
});

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);

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
