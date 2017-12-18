var PokemonDAO = function () {

    var listePokemon = null;
    //var pokemon1 = new Pokemon(0, "????", "None");

    //listePokemon = [pokemon1];

    initialiser = function () {
        if (!listePokemon && localStorage['pokemon']) {
            listePokemon = new Array();
            listeAnonyme = JSON.parse(localStorage['pokemon']);
            for (var indiceAnonyme in listeAnonyme) {
                pokemonAnonyme = listeAnonyme[indiceAnonyme];
                pokemon = new Pokemon(pokemonAnonyme.id,
                    pokemonAnonyme.nom,
                    pokemonAnonyme.imgName);

                listePokemon.push(pokemon);
            }
        }
        if (localStorage['pokemon'] == null)
        {
            console.log("local storage pokemon null");
            listePokemon = new Array();

            //if (myApp.isAndroid()) {
            //    url = "/android_asset/www/";
            //}

            //var poke1 = new Pokemon(0, "Buried Alive", "001Bulbasaur.png");

            //listePokemon.push(poke1);

            $.ajax({
                async: false,
                url: "/android_asset/www/pokemon-db/pokedex.json",
                dataType: 'json',
                success: function (pokemon) {
                    console.log(pokemon.length);
                    for (var i = 0; i < pokemon.length; i++) {
                        var poke = new Pokemon(parseInt(pokemon[i].id), pokemon[i].ename, pokemon[i].id + pokemon[i].ename + ".png");
                        listePokemon.push(poke);
                    }
                }
            });

            localStorage['pokemon'] = JSON.stringify(listePokemon);

            console.log(listePokemon);
        }
    }

    this.getListePokemon = function () {
        return listePokemon;
    }

    this.ajouterPokemon = function (pokemon) {
        console.log(pokemon);
        listePokemon.push(pokemon);
        localStorage['pokemon'] = JSON.stringify(listePokemon);
    }

    this.getPokemonParId = function (id) {

        for (var indicePokemon in listePokemon) {
            pokemon = listePokemon[indicePokemon];
            if (pokemon.id == id) return pokemon;
        }
    }

    this.getPokemonParNom = function (nom) {

        for (var indicePokemon in listePokemon) {
            pokemon = listePokemon[indicePokemon];
            if (pokemon.nom == nom) return pokemon;
        }
    }

    initialiser();

}