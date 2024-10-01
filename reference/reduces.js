/****************************************************
 * Reduces 
 ****************************************************/

function nbParGenre(accumulateur, donneesBarometre){
    if (donneesBarometre["cs1"] == "Homme" && donneesBarometre["bmi"] > 30) {
        accumulateur["Hommes"]++;
    } else if (donneesBarometre["cs1"] == "Femme" && donneesBarometre["bmi"] > 30) {
        accumulateur["Femmes"]++;
    }
    return accumulateur;
}

function nbParRaisons(accumulateur, donneesBarometre) {
    let raisons = donneesBarometre["al18"];
    if (raisons && Array.isArray(raisons) && donneesBarometre["bmi"] > 30) {
        raisons.forEach(raison => {
            if (!accumulateur[raison]) accumulateur[raison] = 0;
            accumulateur[raison]++;
        });
    }
    
    return accumulateur;
}

function nbParRessentit(accumulateur, donneesBarometre) {
    let ressentit = donneesBarometre["es2"];
    if (ressentit && donneesBarometre["bmi"] > 30) {
        if (!accumulateur[ressentit]) {
            accumulateur[ressentit] = 0;
        }
        accumulateur[ressentit]++;
    }
    return accumulateur;
}

function nbParEducation(accumulateur, donneesBarometre) {
    let education = donneesBarometre["cs7"];
    if (education && donneesBarometre["bmi"] > 30) {
        if (!accumulateur[education]) {
            accumulateur[education] = 0;
        }
        accumulateur[education]++;
    }
    return accumulateur;
}

function nbParRevenue(accumulateur, donneesBarometre) {
    let revenue = donneesBarometre["cs10"];
    if (revenue && donneesBarometre["bmi"] > 30) {
        if (!accumulateur[revenue]) {
            accumulateur[revenue] = 0;
        }
        accumulateur[revenue]++;
    }
    return accumulateur;
}

function nbParMois(accumulateur, dateNaissance) {
    let mois = dateNaissance["mois"];

    if(!accumulateur[mois]) accumulateur[mois]=0;

    accumulateur[mois]++;

    return accumulateur;
}

function nbParSport(accumulateur, donneesBarometre) {
    let sport = donneesBarometre["ap10"];
    if (donneesBarometre["bmi"] > 30) {
      if (!accumulateur[sport]) {
        accumulateur[sport] = 0;
      }
      accumulateur[sport]++;
    }
    return accumulateur;
}

 // Calculer le nombre total de personnes filtrées pour chaque province
 function nbParProvince(accumulateur, donneesBarometre) {
     let province = donneesBarometre["ig2"];
    if (donneesBarometre["bmi"] > 30) {
      if (!accumulateur[province]) {
        accumulateur[province] = 0;
      }
      accumulateur[province]++;
    }
    return accumulateur;
  }
  
  function nbParImc(province) {
    return function(accumulateur, donneesBarometre) {
        let imc = donneesBarometre["bmi"];
        let region = donneesBarometre["ig2"];
        if (imc && donneesBarometre["bmi"] > 30 && region === province) {
            if (!accumulateur[imc]) {
                accumulateur[imc] = 0;
            }
            accumulateur[imc]++;
        }
        return accumulateur;
    }
}
