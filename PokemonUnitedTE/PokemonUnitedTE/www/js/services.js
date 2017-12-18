/***********************************************************************************
 * App Services. This contains the logic of the application organised in modules/objects. *
 ***********************************************************************************/

myApp.services = {

  /////////////////
  // Equipes Service //
  /////////////////
  equipes: {

    // Creates a new team.
      create: function (data) {
          console.log(data);

        if (data.id == "new")
            equipeDAO.ajouterEquipe(data);
        
      // team item template.
      var equipeItem = ons.createElement(
        '<ons-list-item tappable category="' + myApp.services.categories.parseId(data.categorie)+ '">' +
          '<label class="left">' +
          '<img class="pokemon-icon" src="/android_asset/www/img/fa-poke.png">' +
          '</label>' +
          '<div class="center">' +
          '<label id="nomEquipe">' + data.nom + '</label>' +
          '<img id="imgPokemon1" class="pokemon-icon-menu" src="/android_asset/www/pokemon-db/thm/' + pokemonDAO.getPokemonParNom(data.pokemon1).imgName + '">' +
          '<img id="imgPokemon2" class="pokemon-icon-menu" src="/android_asset/www/pokemon-db/thm/' + pokemonDAO.getPokemonParNom(data.pokemon2).imgName + '">' +
          '<img id="imgPokemon3" class="pokemon-icon-menu" src="/android_asset/www/pokemon-db/thm/' + pokemonDAO.getPokemonParNom(data.pokemon3).imgName + '">' +
          '</div>' +
          '<div class="right">' +
            '<ons-icon style="color: grey; padding-left: 4px" icon="ion-ios-trash-outline, material:md-delete"></ons-icon>' +
          '</div>' +
        '</ons-list-item>'
      );

      // Store data within the element.
      equipeItem.data = data;

      // Add button functionality to remove.
      equipeItem.querySelector('.right').onclick = function() {
        myApp.services.equipes.remove(equipeItem);
      };

      // Add functionality to push 'modifier_equipe.html' page with the current element as a parameter.
      equipeItem.querySelector('.center').onclick = function() {
        document.querySelector('#myNavigator')
          .pushPage('html/modifier_equipe.html',
            {
              animation: 'lift',
              data: {
                element: equipeItem
              }
            }
          );
      };

      // Check if it's necessary to create new categories for this item.
      myApp.services.categories.updateAdd(equipeItem.data.categorie);

      // Insert.
      var pendingList = document.querySelector('#liste-equipe');
      pendingList.insertBefore(equipeItem, pendingList.firstChild);
    },

    // Modifies the inner data and current view.
      update: function (equipeItem, data) {
      if (data.nom !== equipeItem.data.nom) {
        // Update title view.
        equipeItem.querySelector("#nomEquipe").innerHTML = data.nom;
      }
      if (data.pokemon1 !== equipeItem.data.pokemon1) {
          var currentPokemon = pokemonDAO.getPokemonParNom(data.pokemon1);
          console.log(currentPokemon);
          equipeItem.querySelector("#imgPokemon1").src = "/android_asset/www/pokemon-db/thm/" + currentPokemon.imgName;
      }
      if (data.pokemon2 !== equipeItem.data.pokemon2) {
          var currentPokemon = pokemonDAO.getPokemonParNom(data.pokemon2);
          console.log(currentPokemon);
          equipeItem.querySelector("#imgPokemon2").src = "/android_asset/www/pokemon-db/thm/" + currentPokemon.imgName;
      }
      if (data.pokemon3 !== equipeItem.data.pokemon3) {
          var currentPokemon = pokemonDAO.getPokemonParNom(data.pokemon3);
          console.log(currentPokemon);
          equipeItem.querySelector("#imgPokemon3").src = "/android_asset/www/pokemon-db/thm/" + currentPokemon.imgName;
      }

      if (data.categorie !== equipeItem.data.categorie) {
        // Modify the item before updating categories.
        equipeItem.setAttribute('categorie', myApp.services.categories.parseId(data.categorie));
        // Check if it's necessary to create new categories.
        myApp.services.categories.updateAdd(data.categorie);
        // Check if it's necessary to remove empty categories.
        myApp.services.categories.updateRemove(equipeItem.data.categorie);

      }

      // Store the new data within the element.
      equipeItem.data = data;
      equipeDAO.modifierEquipe(data);
    },

    // Deletes an item and its listeners.
    remove: function(equipeItem) {

      myApp.services.animators.remove(equipeItem, function() {
        // Remove the item before updating the categories.
        equipeItem.remove();
        // Check if the category has no items and remove it in that case.
        myApp.services.categories.updateRemove(equipeItem.data.categorie);
      });

      equipeDAO.supprimerEquipe(equipeItem.data);
    }
  },


  /////////////////
  // Pokedex Service //
  /////////////////
  pokedex: {
      // Creates a new pokedex.
      create: function (data) {

          // pokedex item template.
          var pokemonItem = ons.createElement(
              '<ons-list-item tappable>' +
              '<label class="left">' +
              '<img class="pokemon-icon" src="/android_asset/www/pokemon-db/thm/' + data.imgName + '">' +
              '</label>' +
              '<div class="center">' +
              data.nom +
              '</div>' +
              '</ons-list-item>'
          );

          // Store data within the element.
          pokemonItem.data = data;

          // Add functionality to push 'pokemon_detail.html' page with the current element as a parameter.
          pokemonItem.querySelector('.center').onclick = function () {
              document.querySelector('#myNavigator')
                  .pushPage('html/pokemon_detail.html',
                  {
                      animation: 'lift',
                      data: {
                          element: pokemonItem
                      }
                  }
                  );
          };

          // Insert
          var pendingList = document.querySelector('#pokedex-list');
          pendingList.insertBefore(pokemonItem, pendingList.lastChild);
      },
  },

  /////////////////
  // Pokemon Detail Service //
  /////////////////
  pokemondetail: {
      // Creates a new pokedex.
      create: function (data) {
          var currentPokemon = pokemonDAO.getPokemonParNom(data.nom);
          // pokedex item template.
          var pokemonItem = ons.createElement(
              '<ons-list-item>' +
              '<div class="center">' +
              '<h1 class="animated slideInRight">' + data.nom + '</h1>' +
              '<img class="animated slideInUp pokemon-img-pokedex"src="/android_asset/www/pokemon-db/img/' + currentPokemon.imgName + '">' +
              '</div>' +
              '</ons-list-item>'
          );

          // Insert
          var pendingList = document.querySelector('#pokemon-detail-list');
          pendingList.insertBefore(pokemonItem, pendingList.lastChild);
      },
  },

  /////////////////////
  // Category Service //
  ////////////////////
  categories: {

    // Creates a new category and attaches it to the custom category list.
    create: function(categoryLabel) {
      var categoryId = myApp.services.categories.parseId(categoryLabel);

      // Category item template.
      var categoryItem = ons.createElement(
        '<ons-list-item tappable category-id="' + categoryId + '">' +
          '<div class="left">' +
            '<ons-radio name="categoryGroup" input-id="radio-'  + categoryId + '"></ons-radio>' +
          '</div>' +
          '<label class="center" for="radio-' + categoryId + '">' +
            (categoryLabel || 'No category') +
          '</label>' +
        '</ons-list-item>'
      );

      // Adds filtering functionality to this category item.
      myApp.services.categories.bindOnCheckboxChange(categoryItem);

      // Attach the new category to the corresponding list.
      document.querySelector('#custom-category-list').appendChild(categoryItem);
    },

    // On task creation/update, updates the category list adding new categories if needed.
    updateAdd: function(categoryLabel) {
      var categoryId = myApp.services.categories.parseId(categoryLabel);
      var categoryItem = document.querySelector('#menuPage ons-list-item[category-id="' + categoryId + '"]');

      if (!categoryItem) {
        // If the category doesn't exist already, create it.
        myApp.services.categories.create(categoryLabel);
      }
    },

    // On task deletion/update, updates the category list removing categories without equipes if needed.
    updateRemove: function(categoryLabel) {
      var categoryId = myApp.services.categories.parseId(categoryLabel);
      var categoryItem = document.querySelector('#tabbarPage ons-list-item[category="' + categoryId + '"]');

      if (!categoryItem) {
        // If there are no equipes under this category, remove it.
        myApp.services.categories.remove(document.querySelector('#custom-category-list ons-list-item[category-id="' + categoryId + '"]'));
      }
    },

    // Deletes a category item and its listeners.
    remove: function(categoryItem) {
      if (categoryItem) {
        // Remove listeners and the item itself.
        categoryItem.removeEventListener('change', categoryItem.updateCategoryView);
        categoryItem.remove();
      }
    },

    // Adds filtering functionality to a category item.
    bindOnCheckboxChange: function(categoryItem) {
      var categoryId = categoryItem.getAttribute('category-id');
      var allItems = categoryId === null;

      categoryItem.updateCategoryView = function() {
        var query = '[category="' + (categoryId || '') + '"]';

        var equipeItems = document.querySelectorAll('#listeEquipePage ons-list-item');
        for (var i = 0; i < equipeItems.length; i++) {
          equipeItems[i].style.display = (allItems || equipeItems[i].getAttribute('category') === categoryId) ? '' : 'none';
        }
      };

      categoryItem.addEventListener('change', categoryItem.updateCategoryView);
    },

    // Transforms a category name into a valid id.
    parseId: function(categoryLabel) {
      return categoryLabel ? categoryLabel.replace(/\s\s+/g, ' ').toLowerCase() : '';
    }
  },

  //////////////////////
  // Animation Service //
  /////////////////////
  animators: {

    // Remove animation for task deletion.
    remove: function(listItem, callback) {
      listItem.classList.add('animation-remove');
      listItem.classList.add('hide-children');

      setTimeout(function() {
        callback();
      }, 750);
    }
  },

  ////////////////////////
  // Initial Data Service //
  ////////////////////////
  fixtures: [
    {
      title: 'Equipe 1',
      pokemon1: 'Pikachu',
      pokemon2: 'Blaziken',
      pokemon3: 'Gengar',
      category: 'Uber',
      description: 'Some description.'
    },
    {
      title: 'Equipe 2',
      pokemon1: 'Pikachu',
      pokemon2: 'Groudon',
      pokemon3: 'Gengar',
      category: 'Overused',
      description: 'Some description.'
    },
    {
      title: 'Equipe 3',
      pokemon1: 'Rayquaza',
      pokemon2: 'Charizard',
      pokemon3: 'Gengar',
      category: 'Never used',
      description: 'Some description.'
    },
  ]
};
