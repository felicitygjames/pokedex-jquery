let pokemonRepository = (function () {
  let e = [],
    o = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  function t(o) {
    "object" == typeof o && "name" in o
      ? e.push(o)
      : alert("Please enter a valid pokemon");
  }
  function n(e) {
    pokemonRepository.loadDetails(e).then(function () {
      console.log(e), r(e);
    });
  }
  function r(e) {
    let o = $(".modal-title");
    o.empty();
    $(".modal-header");
    let t = $('<h1 style="color: white;">' + e.name + "</h1>"),
      n = $(".modal-body");
    n.empty();
    let r = $(
      '<img class="modal-img" alt="..." style="width: 50%; padding: 30px;">'
    );
    r.attr("src", e.imageUrl);
    let a = $(
        '<h4 style="background-color:#d88780; padding: 5px; color: white;">Profile</h4>'
      ),
      l = $("<p><strong>Height</strong>: " + e.height + '"</p>'),
      s = $("<p><strong>Type</strong>: " + e.types + "</p>"),
      i = $("<p><strong>Abilities</strong>: " + e.abilities + "</p>");
    o.append(t),
      n.append(r),
      n.append(a),
      n.append(l),
      n.append(s),
      n.append(i),
      e.types.includes("grass")
        ? $(".modal-header").css("background-color", "rgb(120, 200, 80)")
        : e.types.includes("fire")
        ? $(".modal-header").css("background-color", "rgb(240, 128, 48)")
        : e.types.includes("poison")
        ? $(".modal-header").css("background-color", "rgb(168, 144, 240)")
        : e.types.includes("water")
        ? $(".modal-header").css("background-color", "rgb(104, 144, 240)")
        : e.types.includes("bug")
        ? $(".modal-header").css("background-color", "rgb(168, 184, 32)")
        : e.types.includes("water")
        ? $(".modal-header").css("background-color", "rgb(69, 120, 237)")
        : e.types.includes("ice")
        ? $(".modal-header").css("background-color", "rgb(66, 174, 174)")
        : e.types.includes("electric")
        ? $(".modal-header").css("background-color", "rgb(252, 234, 161)")
        : e.types.includes("ground")
        ? $(".modal-header").css("background-color", "rgb(219, 181, 77)")
        : e.types.includes("fairy")
        ? $(".modal-header").css("background-color", "rgb(232, 120, 144)")
        : e.types.includes("ghost")
        ? $(".modal-header").css("background-color", "rgb(100, 78, 136)")
        : e.types.includes("normal") &&
          $(".modal-header").css("background-color", "rgb(156, 156, 99)");
  }
  return {
    getAll: function () {
      return e;
    },
    add: t,
    addListItem: function (e) {
      pokemonRepository.loadDetails(e).then(function () {
        let o = $(".row"),
          t = $(
            '<div class="card mt-5" style="width: 18rem; margin:13px;"></div>'
          ),
          r = $(
            '<img class="card-img mx-auto pokemon-top-margin" style="width: 35%" alt="...">'
          ),
          a = $('<h5 class="card-title">' + e.name + "</h5>");
        r.attr("src", e.imageUrl);
        let l = $('<div class="card-body" style="text-align: center;"></div>'),
          s = $(
            '<button type="button" class="btn" style="background-color: #d88780; color: white" data-toggle="modal" data-target="#pokemonModal">See profile</button>'
          );
        o.append(t),
          t.append(r),
          t.append(l),
          l.append(a),
          l.append(s),
          s.on("click", function (o) {
            n(e);
          });
      });
    },
    loadList: function () {
      return fetch(o)
        .then(function (e) {
          return e.json();
        })
        .then(function (e) {
          e.results.forEach(function (e) {
            t({ name: e.name, detailsUrl: e.url });
          });
        })
        .catch(function (e) {
          console.error(e);
        });
    },
    loadDetails: function (e) {
      let o = e.detailsUrl;
      return fetch(o)
        .then(function (e) {
          return e.json();
        })
        .then(function (o) {
          (e.imageUrl = o.sprites.other.dream_world.front_default),
            (e.imageUrlAnimated =
              o.sprites.versions["generation-v"][
                "black-white"
              ].animated.front_default),
            (e.height = o.height),
            (e.types = []),
            o.types.forEach(function (o) {
              e.types.push(o.type.name);
            }),
            (e.abilities = []),
            o.abilities.forEach(function (o) {
              e.abilities.push(o.ability.name);
            });
        })
        .catch(function (e) {
          console.error(e);
        });
    },
    showDetails: n,
    showModal: r,
  };
})();
function search() {
  let e, o, t, n, r, a, l;
  for (
    o = (e = document.getElementById("myInput")).value.toUpperCase(),
      n = (t = document.getElementById("myrow")).querySelectorAll(".card"),
      a = 0;
    a < n.length;
    a++
  )
    (l =
      (r = n[a].querySelector(".card-body").querySelector(".card-title"))
        .textContent || r.innerText)
      .toUpperCase()
      .indexOf(o) > -1
      ? (n[a].style.display = "")
      : (n[a].style.display = "none");
}
console.log(pokemonRepository.getAll()),
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (e) {
      pokemonRepository.addListItem(e);
    });
  });
