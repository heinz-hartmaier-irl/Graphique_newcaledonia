// *****************************************************************************
// *******************************  Graphique 1  *******************************
// *****************************************************************************

var funnel = {
    series: [],
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: true,
        barHeight: '80%',
        isFunnel: true,
      },
    },
    dataLabels: {
      enabled: false,
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val;
      },
      dropShadow: {
        enabled: true,
      },
    },
    title: {
      text: 'Comment se sentent-ils ?',
      align: 'center',
    },
    xaxis: {
      categories: [],
    },
    legend: {
      show: false,
    },
  };
  
  let ressentit = donneesBarometre.reduce(nbParRessentit, {});
  
  funnel.series = [{ name: "Ressentit", data: Object.values(ressentit) }];
  funnel.xaxis.categories = Object.keys(ressentit);
  
  var chart = new ApexCharts(document.querySelector("#ressentit"), funnel);
  chart.render();
  
// *****************************************************************************
// *******************************  Graphique 2  *******************************
// *****************************************************************************

var options = {
  series: [{
    name: 'Sport Data',
    data: []
  }],
  chart: {
    height: 350,
    type: 'bar'
  },
  plotOptions: {
    bar: {
      columnWidth: '50%',
      distributed: true
    }
  },
  dataLabels: {
    enabled: false
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
    text: 'Pratique de sport ?'
  }
};

let sportData = donneesBarometre.reduce(nbParSport, {});

options.series[0].data = Object.values(sportData);
options.xaxis.categories = Object.keys(sportData);

var chartradial = new ApexCharts(document.querySelector("#sport"), options);
chartradial.render();