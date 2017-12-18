// App logic.
window.myApp = {};
var pokemonDAO = new PokemonDAO();
var equipeDAO = new EquipeDAO();

document.addEventListener('init', function(event) {
  var page = event.target;

  // Each page calls its own initialization controller.
  if (myApp.controllers.hasOwnProperty(page.id)) {
    myApp.controllers[page.id](page);
	
	
  }

  // Fill the lists with initial data when the pages we need are ready.
  // This only happens once at the beginning of the app.
  if (page.id === 'menuPage' || page.id === 'listeEquipePage') {
    if (document.querySelector('#menuPage')
      && document.querySelector('#listeEquipePage')
      && !document.querySelector('#listeEquipePage ons-list-item')
    ) {
        //myApp.services.fixtures.forEach(function (data) {
        //    myApp.services.equipes.create(data);
        //});

            var listeEquipe = equipeDAO.getListeEquipe();
            for (var i = 0; i < listeEquipe.length; i++) {
                myApp.services.equipes.create(listeEquipe[i]);
            }

    }
  }
  if (page.id === 'pokedexPage') {
      if (document.querySelector('#pokedexPage')
          && !document.querySelector('#pokedexPage ons-list-item')
      ) {
            var listePokemon = pokemonDAO.getListePokemon();
            for (var i = 0; i < listePokemon.length; i++) {
                myApp.services.pokedex.create(listePokemon[i]);
            }
      }
  }

});
