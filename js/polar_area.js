// *****************************************************************************
// *******************************  Graphique 1  *******************************
// *****************************************************************************
let options = {
  series: [],
  chart: {
      height: 600,
      type: 'polarArea'
  },
  stroke: {
      colors: ['#fff']
  },
  fill: {
      opacity: 0.8
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

let education = donneesBarometre.reduce(nbParEducation, {});
options.series = Object.values(education);
options.labels = Object.keys(education);

var chart1 = new ApexCharts(document.querySelector("#education"), options);
chart1.render();

// *****************************************************************************
// *******************************  Graphique 2  *******************************
// *****************************************************************************
let line = {
  series: [{
      name: 'Revenue',
      data: []
  }],
  chart: {
      height: 350,
      type: 'line',
      zoom: {
          enabled: false
      }
  },
  dataLabels: {
      enabled: false
  },
  stroke: {
      curve: 'straight'
  },
  title: {
      text: 'Le salaire moyen',
      align: 'left'
  },
  grid: {
      row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
      }
  },
  xaxis: {
      categories: []
  }
};

let revenue = donneesBarometre.reduce(nbParRevenue, {});
line.series[0].data = Object.values(revenue);
line.xaxis.categories = Object.keys(revenue);

var chart2 = new ApexCharts(document.querySelector("#revenue"), line);
chart2.render();
