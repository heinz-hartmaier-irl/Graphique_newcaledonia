 // Création de la carte
 var map = L.map('map').setView([0, 0], 2); // Initialiser la carte avec un centre et un niveau de zoom par défaut

 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
 }).addTo(map);

 // Fonction pour créer une bulle sur la carte
 function createBubble(lat, lon, count, province) {
   // Arrondir la taille des bulles et définir une taille minimale
   var size = Math.max(Math.round(Math.sqrt(count) * 5), 10);

   var bubbleIcon = L.divIcon({
     className: 'bubble',
     html: `<div style="background:rgba(0, 123, 255, 0.5); border-radius: 50%; width:${size}px; height:${size}px;"></div>`,
     iconSize: [size, size]
   });

   var marker = L.marker([lat, lon], { icon: bubbleIcon }).addTo(map);

   // Ajouter un tooltip pour afficher les informations de la bulle
   var tooltipContent = `${province}: ${count}`;
   marker.bindTooltip(tooltipContent, {
     permanent: false,
     direction: 'top',
     offset: L.point(0, -10)
   });

   marker.on('click', function() {
    displayChartsForProvince(province);
  });
}
 


 // Calculer les totaux
 const totauxParProvince = donneesBarometre.reduce(nbParProvince, {});

 // Afficher les bulles sur la carte
 var bounds = L.latLngBounds();
 for (let [province, count] of Object.entries(totauxParProvince)) {
   const location = provinces[province];
   if (location) {
     createBubble(location.lat, location.lon, count, province); // Ajuster la taille des bulles
     bounds.extend([location.lat, location.lon]);
   } else {
     console.error('Lieu non trouvé dans la table :', province);
   }
 }

 map.fitBounds(bounds); // Ajuster la vue de la carte pour inclure toutes les bulles

 function displayChartsForProvince(province) {
  const filteredData = donneesBarometre.filter(d => d["ig2"] === province);

  // Donut chart data
  const genderData = filteredData.reduce(nbParGenre, {"Hommes": 0, "Femmes": 0})
  const donutOptions = {
    series: Object.values(genderData),
    chart: {
      type: 'donut'
    },
    labels: Object.keys(genderData),
    title: {
      text: `La répartition des gens en Pronvince ${province}`
    }
  };
  document.querySelector("#chart1").innerHTML = "";
  const donutChart = new ApexCharts(document.querySelector("#chart1"), donutOptions);
  donutChart.render();

  // Bar chart data
  

  const barOptions = {
    series: [{
      name: 'BMI',
      data: []
    }],
    chart: {
      type: 'bar'
    },
    xaxis: {
      categories: []
    },
    title: {
      text: `L'IMC en Province ${province}`
    }
  };
  let imc = donneesBarometre.reduce(nbParImc(province), {});
  barOptions.series[0].data = Object.values(imc);
  barOptions.xaxis.categories = Object.keys(imc);
  document.querySelector("#chart2").innerHTML = "";
  const barChart = new ApexCharts(document.querySelector("#chart2"), barOptions);
  barChart.render();
}