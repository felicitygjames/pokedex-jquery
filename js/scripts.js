let pokemonList = [
  { name: "Bulbasaur (height: 0.7)", height: 0.7, types: ["grass", "poison"] },
  { name: "Ivysaur (height: 1)", height: 1, types: ["grass", "poison"] },
  { name: "Venusaur (height: 2)", height: 2, types: ["grass", "poison"] },
  { name: "Charmander (height 0.6)", height: 0.6, types: "fire" },
];

let text = "";
let i = 0;
for (;pokemonList[i];) {
  text = text + " " + pokemonList[i].name; i++;
}
document.write(text);

for (let i = 0; i < pokemonList.length; i++){
  if (pokemonList[i].height > 1.5){
    document.write(" - Wow, that's a big pokemon!");
  } else if (pokemonList[i].height <= 1.5){
    document.write();
  }
}