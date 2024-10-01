
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
              if (event["target"]["parentNode"]["attributes"]["data:realIndex"]) {
                  let index = event["target"]["parentNode"]["attributes"]["data:realIndex"]["nodeValue"];
                  afficheParRaisons(index);
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

let genres = donneesBarometre.reduce(nbParGenre, {"Hommes": 0, "Femmes": 0});
options["series"] = Object.values(genres);
options["labels"] = Object.keys(genres);

let pie = new ApexCharts(document.querySelector("#pie"), options);
pie.render();

// *****************************************************************************
// *******************************  Graphique 2  *******************************
// *****************************************************************************

function afficheParRaisons(indexGenre) {
  let nomFiltre = Object.keys(genres)[indexGenre].toLowerCase();
  const raisonsFiltrees = donneesBarometre.filter(eval(nomFiltre));
  
  let options2 = {
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
          text: "Répartition par raisons - " + nomFiltre
      }
  };

  let RaisonsData = raisonsFiltrees.reduce(nbParRaisons, {});
  options2.series = [{ name: "Raisons", data: Object.values(RaisonsData) }];
  options2.xaxis.categories = Object.keys(RaisonsData);

  document.querySelector("#raisons").innerHTML = "";

  let parRaisons = new ApexCharts(document.querySelector("#raisons"), options2);
  parRaisons.render();

  document.querySelector("#details_raison").style.display = 'block';

}

// Debugging parceque la vie c'est dur
console.log("Genres:", genres);
console.log("Donnees Barometre:", donneesBarometre);

