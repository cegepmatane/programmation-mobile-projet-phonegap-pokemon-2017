var PokedexVue = function () {
    var P = new Pokedex();

    P.getPokemonByName('eevee') // with Promise
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log('There was an ERROR: ', error);
        });

}