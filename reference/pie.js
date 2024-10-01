// *****************************************************************************
// *******************************  Graphique 1  *******************************
// *****************************************************************************

let options = {
    series: [],
    chart: {
    width: 600,
    type: 'donut',
    dropShadow: {
      enabled: true,
      color: '#111',
      top: -1,
      left: 3,
      blur: 3,
      opacity: 0.2
    },
    events: {
        click: function(event, chartContext, config) {
          console.log(event);
            if (event["target"]["parentNode"]["attributes"]["data:realIndex"]) { // pour gérer les cas où les clics ne sont pas au bon endroit
                let index = event["target"]["parentNode"]["attributes"]["data:realIndex"]["nodeValue"];
                //console.log(index);
                afficheParAnnee(index);
            }
        }
      }
  },
  stroke: {
    width: 0,
  },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          total: {
            showAlways: true,
            show: true
          }
        }
      }
    }
  },
  labels: [],
  dataLabels: {
    dropShadow: {
      blur: 3,
      opacity: 1
    }
  },
  fill: {
  type: 'pattern',
    opacity: 1,
    pattern: {
      enabled: true,
      style: ['slantedLines', 'squares', 'horizontalLines', 'circles','slantedLines'],
    },
  },
  states: {
    hover: {
      filter: 'none'
    }
  },
  theme: {
    palette: 'palette1'
  },
  title: {
    text: "Répartition par genres"
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
};

let genres = datesNaissance.reduce(nbParGenre, {"Hommes": 0, "Femmes": 0});

options["series"] = Object.values(genres);
options["labels"] = Object.keys(genres);

let pie = new ApexCharts(document.querySelector("#pie"), options);
pie.render();


// *****************************************************************************
// *******************************  Graphique 2  *******************************
// *****************************************************************************

function afficheParAnnee(indexGenre) {
    //console.log(indexGenre);
    //console.log(Object.keys(genres)[indexGenre]);
    let nomFiltre = Object.keys(genres)[indexGenre].toLowerCase();
    //console.log(nomFiltre);
    let datesFiltrees = datesNaissance.filter(eval(nomFiltre));
    //console.log(datesFiltrees.length);

    let options = {
        series: [],
        chart: {
        width: 600,
        type: 'polarArea',
        events: {
            click: function(event, chartContext, config) {
                if (event["target"]["parentNode"]["attributes"]["data:realIndex"]) {
                    let indexAnnee = event["target"]["parentNode"]["attributes"]["data:realIndex"]["nodeValue"];
                    //console.log(indexAnnee);
                    afficheParMois(indexAnnee,datesFiltrees);
                }
            }
        }
      },
      labels: [],
      fill: {
        opacity: 1
      },
      stroke: {
        width: 1,
        colors: undefined
      },
      yaxis: {
        show: false
      },
      legend: {
        position: 'right'
      },
      plotOptions: {
        polarArea: {
          rings: {
            strokeWidth: 0
          },
          spokes: {
            strokeWidth: 0
          },
        }
      },
      title: {
        text: "Répartition par genres"
      },
      theme: {
        monochrome: {
          enabled: true,
          shadeTo: 'light',
          shadeIntensity: 0.6
        }
      }
    };

    let anneesData = datesFiltrees.reduce(nbParAnnees, {});
    let genre = Object.keys(genres)[indexGenre];

    options["series"] = Object.values(anneesData);
    options["labels"] = Object.keys(anneesData);
    options["title"]["text"] = "Répartition par années - "+ genre;

    document.querySelector("#annee").innerHTML="";
    document.querySelector("#mois").innerHTML="";
    let parAnnees = new ApexCharts(document.querySelector("#annee"), options);
    parAnnees.render();

    console.log(anneesData);
    console.log(datesFiltrees);
    
};

// *****************************************************************************
// *******************************  Graphique 3  *******************************
// *****************************************************************************


function afficheParMois(indexAnnee, datesFiltrees) {
  console.log(indexAnnee);
  let annees = datesFiltrees.reduce(nbParAnnees, {})
  let annee = Object.keys(annees)[indexAnnee];
  let datesFiltresAnnee = datesFiltrees.filter(parAnne(annee));

  var options2 = {
      series: [],
      chart: {
          height: 350,
          type: 'bar',
      },
      plotOptions: {
          bar: {
              columnWidth: '45%',
              distributed: true,
          }
      },
      dataLabels: {
          enabled: false
      },
      legend: {
          show: false
      },
      xaxis: {
          categories: [],
          labels: {
              style: {
                  fontSize: '12px'
              }
          }
      },
      title: {
          text: "Répartition par mois - " + annee
      }
  };

  let mois = datesFiltresAnnee.reduce(nbParMois, {});
  options2.series = [{ data: Object.values(mois) }];
  options2.xaxis.categories = Object.keys(mois).map(moisIndex => mois_tab[moisIndex - 1]);

  document.querySelector("#mois").innerHTML = "";
  
  let parMois = new ApexCharts(document.querySelector("#mois"), options2);
  parMois.render();
};
