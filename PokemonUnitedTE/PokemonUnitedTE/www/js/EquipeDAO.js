var EquipeDAO = function () {

    //var equipe1 = new Equipe(0, "Equipe 1", "Groudon", "Mew", "Darkrai", "Uber", "Legendary Team");

    listeEquipe = null;

    initialiser = function () {
        if (!listeEquipe && localStorage['equipe']) {
            listeEquipe = new Array();
            listeAnonyme = JSON.parse(localStorage['equipe']);
            for (var indiceAnonyme in listeAnonyme) {
                equipeAnonyme = listeAnonyme[indiceAnonyme];
                equipe = new Equipe(equipeAnonyme.id,
                    equipeAnonyme.nom,
                    equipeAnonyme.pokemon1,
                    equipeAnonyme.pokemon2,
                    equipeAnonyme.pokemon3,
                    equipeAnonyme.categorie,
                    equipeAnonyme.description);

                listeEquipe.push(equipe);
            }
        }
        if (localStorage['equipe'] == null) {
            console.log("local storage null");
            listeEquipe = new Array();

            var equipe1 = new Equipe(0, "Equipe 1", "Groudon", "Mew", "Darkrai", "Uber", "Legendary Team");

            listeEquipe.push(equipe1);

            localStorage['equipe'] = JSON.stringify(listeEquipe);
        }
    }

    this.getListeEquipe = function () {
        return listeEquipe;
    }

    trouverNouvelId = function () {
        maximum = 0;
        for (var indiceEquipe in listeEquipe) {
            equipe = listeEquipe[indiceEquipe];
            if (equipe.id > maximum)
                maximum = equipe.id;
        }
        return maximum + 1;
    }

    this.ajouterEquipe = function (equipe) {
        equipe.id = trouverNouvelId();
        listeEquipe.push(equipe);
        localStorage['equipe'] = JSON.stringify(listeEquipe);
    }

    this.modifierEquipe = function (equipe) {
        listeEquipe[equipe.id] = equipe;
        localStorage['equipe'] = JSON.stringify(listeEquipe);
    }
    this.supprimerEquipe = function (equipe) {
        console.log(equipe);
        if (equipe.id > -1) {
            console.log(equipe.id);
            listeEquipe.splice(equipe.id, 1);
        }
        localStorage['equipe'] = JSON.stringify(listeEquipe);
    }

    this.getEquipeParId = function (id) {

        for (var indiceEquipe in listeEquipe) {
            equipe = listeEquipe[indiceEquipe];
            if (equipe.id == id) return equipe;
        }
    }

    initialiser();

}