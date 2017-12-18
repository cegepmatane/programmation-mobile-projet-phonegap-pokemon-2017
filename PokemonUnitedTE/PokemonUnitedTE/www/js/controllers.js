/***********************************************************************
 * App Controllers. These controllers will be called on page initialization. *
 ***********************************************************************/

myApp.controllers = {

  //////////////////////////
  // Tabbar Page Controller //
  //////////////////////////
  tabbarPage: function(page) {
    // Set button functionality to open/close the menu.
    page.querySelector('[component="button/menu"]').onclick = function() {
      document.querySelector('#mySplitter').left.toggle();
    };

    // Set button functionality to push 'nouvelle_equipe.html' page.
    Array.prototype.forEach.call(page.querySelectorAll('[component="button/nouvelle-equipe"]'), function(element) {
      element.onclick = function() {
        document.querySelector('#myNavigator').pushPage('html/nouvelle_equipe.html');
      };

      element.show && element.show(); // Fix ons-fab in Safari.
    });

    // Set button functionality to push 'contact.html' page.
    Array.prototype.forEach.call(page.querySelectorAll('[component="button/contact"]'), function (element) {
        element.onclick = function () {
            document.querySelector('#myNavigator').pushPage('html/contact.html');
        };

        element.show && element.show(); // Fix ons-fab in Safari.
    });

    // Change tabbar animation depending on platform.
    page.querySelector('#myTabbar').setAttribute('animation', ons.platform.isAndroid() ? 'slide' : 'none');
  },

  ////////////////////////
  // Menu Page Controller //
  ////////////////////////
  menuPage: function(page) {
    // Set functionality for 'No Category' and 'All' default categories respectively.
    myApp.services.categories.bindOnCheckboxChange(page.querySelector('#default-category-list ons-list-item[category-id=""]'));
    myApp.services.categories.bindOnCheckboxChange(page.querySelector('#default-category-list ons-list-item:not([category-id])'));

    // Change splitter animation depending on platform.
    document.querySelector('#mySplitter').left.setAttribute('animation', ons.platform.isAndroid() ? 'overlay' : 'reveal');
  },

  ////////////////////////////
  // Nouvelle equipe Page Controller //
  ////////////////////////////
  nouvelleEquipePage: function (page) {
      var options = {

          url: "/android_asset/www/pokemon-db/pokedex.json",

          getValue: "ename",

          list: {
              match: {
                  enabled: true
              }
          },

          theme: "square"
      };

      $("#pokemon1-input").easyAutocomplete(options);
      $("#pokemon2-input").easyAutocomplete(options);
      $("#pokemon3-input").easyAutocomplete(options);

    // Set button functionality to save a new task.
    Array.prototype.forEach.call(page.querySelectorAll('[component="button/sauvegarder-equipe"]'), function(element) {
      element.onclick = function() {
        var newTitle = page.querySelector('#title-input').value;

        if (newTitle) {
          // If input title is not empty, create a new task.
          myApp.services.equipes.create(
            {
              id: "new",
              nom: newTitle,
              pokemon1: page.querySelector('#pokemon1-input').value,
              pokemon2: page.querySelector('#pokemon2-input').value,
              pokemon3: page.querySelector('#pokemon3-input').value,
              categorie: page.querySelector('#category-input').value,
              description: page.querySelector('#description-input').value
            }
          );

          // Set selected category to 'All', refresh and pop page.
          document.querySelector('#default-category-list ons-list-item ons-radio').checked = true;
          document.querySelector('#default-category-list ons-list-item').updateCategoryView();
          document.querySelector('#myNavigator').popPage();

        } else {
          // Show alert if the input title is empty.
          ons.notification.alert('Vous devez fournir un nom');
        }
      };
    });
  },

  ////////////////////////////
  // Pokedex Page Controller //
  ////////////////////////////
  pokedexPage: function (page) {

  },

  ////////////////////////////
  // Battle Page Controller //
  ////////////////////////////
  battlePage: function (page) {

  },

  ////////////////////////////
  // Contact Page Controller //
  ////////////////////////////
  contactPage: function (page) {

  },


  ////////////////////////////
  // Pokemon Detail Page Controller //
  ////////////////////////////
  pokemonDetailPage: function (page) {
      // Get the element passed as argument to pushPage.
      var element = page.data.element;

      myApp.services.pokemondetail.create(
          {
              id: element.data.id,
              nom: element.data.nom,
          }
      );

  },
  ////////////////////////////////
  // Modifier Equipe Page Controller //
  ///////////////////////////////
  modifierEquipePage: function (page) {
      var options = {

          url: "/android_asset/www/pokemon-db/pokedex.json",
          placeholder: "Pokemon",

          getValue: "ename",

          list: {
              match: {
                  enabled: true
              }
          },

          theme: "square"
      };

      $("#pokemon1-input").easyAutocomplete(options);
      $("#pokemon2-input").easyAutocomplete(options);
      $("#pokemon3-input").easyAutocomplete(options);

    // Get the element passed as argument to pushPage.
    var element = page.data.element;

    // Fill the view with the stored data.
    page.querySelector('#title-input').value = element.data.nom;
    page.querySelector('#pokemon1-input').value = element.data.pokemon1;
    page.querySelector('#pokemon2-input').value = element.data.pokemon2;
    page.querySelector('#pokemon3-input').value = element.data.pokemon3;
    page.querySelector('#category-input').value = element.data.categorie;
    page.querySelector('#description-input').value = element.data.description;
    page.querySelector("#imgPokemon1").src = "/android_asset/www/pokemon-db/thm/" + pokemonDAO.getPokemonParNom(element.data.pokemon1).imgName;
    page.querySelector("#imgPokemon2").src = "/android_asset/www/pokemon-db/thm/" + pokemonDAO.getPokemonParNom(element.data.pokemon2).imgName;
    page.querySelector("#imgPokemon3").src = "/android_asset/www/pokemon-db/thm/" + pokemonDAO.getPokemonParNom(element.data.pokemon3).imgName;

    // Set button functionality to push 'battle.html' page.
    Array.prototype.forEach.call(page.querySelectorAll('[component="button/battle"]'), function (element) {
        element.onclick = function () {
            document.querySelector('#myNavigator').pushPage('html/battle.html');
        };

        element.show && element.show(); // Fix ons-fab in Safari.
    });

    // Set button functionality to save.
    page.querySelector('[component="button/sauvegarder-equipe"]').onclick = function () {
        console.log("clicked save");
      var newTitle = page.querySelector('#title-input').value;
      var currentId = element.data.id;

      console.log(newTitle);
      if (newTitle) {
        // If input title is not empty, ask for confirmation before saving.
        ons.notification.confirm(
            {
                title: 'Sauvegarder les modifications ?',
                message: 'Les anciennes donnees seront suprimees',
                buttonLabels: ['Non', 'Oui']
            }
        ).then(function(buttonIndex) {
          if (buttonIndex === 1) {
            // If 'Save' button was pressed.
            myApp.services.equipes.update(element,
                {
                id: currentId,
                nom: newTitle,
                pokemon1: page.querySelector('#pokemon1-input').value,
                pokemon2: page.querySelector('#pokemon2-input').value,
                pokemon3: page.querySelector('#pokemon3-input').value,
                categorie: page.querySelector('#category-input').value,
                description: page.querySelector('#description-input').value
              }
            );

            // Set selected category to 'All', refresh and pop page.
            document.querySelector('#default-category-list ons-list-item ons-radio').checked = true;
            document.querySelector('#default-category-list ons-list-item').updateCategoryView();
            document.querySelector('#myNavigator').popPage();
          }
        });

      } else {
        // Show alert if the input title is empty.
         ons.notification.alert('Vous devez fournir un nom');
      }
    };
  }
};
