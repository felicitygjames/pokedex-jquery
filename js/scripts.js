let pokemonList = [
  { name: "Bulbasaur", height: 0.7, types: ["grass", " poison"] },
  { name: "Ivysaur", height: 1, types: ["water", " poison"] },
  { name: "Venusaur", height: 2, types: ["flying", " poison"] },
  { name: "Charmander", height: 0.6, types: ["fire"] },
];

// for (let i = 0; i < pokemonList.length; i++) {
//   let color = "";
//   for (let k = 0; k < pokemonList[i].types.length; k++){
//     if (pokemonList[i].types[k] === "grass"){
//       color = '<span style="color:green;">'
//     } else if (pokemonList[i].types[k] === "flying"){
//       color = '<span style="color:lightblue;">'
//     } else if (pokemonList[i].types[k] === "water") {
//       color = '<span style="color:blue;">'
//     } else if (pokemonList[i].types[k] === "fire") {
//       color = '<span style="color:red;">'
//     }
//   } 
//   let size = "";
//   if (pokemonList[i].height > 1){
//     size = "It's a big pokemon!";
//   } else if(pokemonList[i].height < 0.7){
//     size = "It's a small pokemon!";
//   } else {
//     size = "It's an average pokemon";
//   }
//   document.write(
//     '<div class = "box">' +
//       pokemonList[i].name +
//       " (height: " +
//       pokemonList[i].height +
//       ") " +
//       size + 
//       color +
//       "<br>" +
//       pokemonList[i].types +
//       "<br>" +
//       "</div>"
//   );
// }

pokemonList.forEach(function(pokemon) {
  document.write(pokemon.name + " (" + pokemon.height + ") " + "<br>");
});