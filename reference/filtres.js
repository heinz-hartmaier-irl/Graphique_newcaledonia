/****************************************************
 * Filtres
 ****************************************************/
function hommes(elt) { if (elt["cs1"] == "Homme") return elt; }
function femmes(elt) { if (elt["cs1"] == "Femme") return elt; }

// permet de passer des paramètres aux filtres (ici -> annee)
function parAnne(annee) {
    return function (elt) {
        if (elt["annee"] == annee) return elt;
    }
}

function parRaison(raison) {
    return function (elt) {
        return elt["al18"] && elt["al18"].includes(raison);
    };
}

function parEducation(education) {
    return function (elt) {
        return elt["cs7"] && elt["cs7"].includes(education);
    };
}
