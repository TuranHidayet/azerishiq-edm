document.addEventListener('DOMContentLoaded', async function() {
    const loadingIndicator = document.getElementById('loading');
    const langOptions = document.querySelectorAll(".lang-option");
    const selectedLang = document.getElementById("selectedLang");

    url1 = 'https://edm-prod1.azerishiq.az/api/resources/v2/chargings';
    // url2 = 'http://127.0.0.1:5501/EDM/chargers.json';

    function initLanguage() {
        const savedLang = localStorage.getItem("selectedLang") || "AZ";
        selectedLang.textContent = savedLang;
        langOptions.forEach(option => {
            option.addEventListener("click", function () {
                const lang = this.getAttribute("data-lang").toUpperCase();
                selectedLang.textContent = lang;
                localStorage.setItem("selectedLang", lang);
                changeLanguage(lang);
            });
        });
    }

    async function loadDataFromAPI() {
        try {
            loadingIndicator.style.display = 'block';
            const response = await fetch(url1, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                }
              });
            
            if (!response.ok) throw new Error(`Şəbəkədə xata: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('API xətası:', error);
            loadingIndicator.textContent = `API xətası: ${error.message}`;
            return { data: [] };
        } finally {
            loadingIndicator.style.display = 'none';
        }
    }

    function createMap() {
        const map = new ol.Map({
            target: 'map',
            layers: [new ol.layer.Tile({ source: new ol.source.OSM() })],
            view: new ol.View({
                center: ol.proj.fromLonLat([49.85, 40.40]),
                zoom: 12
            })
        });
        return map;
    }

    function setupClusters(vectorSource, map) {
        const clusterSource = new ol.source.Cluster({ distance: 40, source: vectorSource });
        const clusterLayer = new ol.layer.Vector({
            source: clusterSource,
            style: function(feature) {
                const size = feature.get('features').length;
                return new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: Math.min(Math.max(10, size * 5), 30),
                        fill: new ol.style.Fill({ color: size > 1 ? 'rgba(241, 128, 23, 0.8)' : 'rgba(0, 176, 80, 0.8)' }),
                        stroke: new ol.style.Stroke({ color: '#fff', width: 2 })
                    }),
                    text: new ol.style.Text({ text: size.toString(), fill: new ol.style.Fill({ color: '#fff' }), font: 'bold 12px Arial' })
                });
            }
        });
        map.addLayer(clusterLayer);
    }

    function setupPopup(map) {
        const container = document.getElementById('popup');
        const content = document.getElementById('popup-content');
        const overlay = new ol.Overlay({ element: container, autoPan: { animation: { duration: 250 } } });
        map.addOverlay(overlay);

        map.on('click', function(evt) {
            const feature = map.forEachFeatureAtPixel(evt.pixel, f => f);
            if (feature) {
                const features = feature.get('features');
                if (features.length === 1) {
                    showPopup(features[0], evt.coordinate);
                } else {
                    map.getView().animate({ zoom: map.getView().getZoom() + 2, duration: 250, center: evt.coordinate });
                }
            } else {
                overlay.setPosition(undefined);
            }
        });

        document.getElementById('popup-closer').onclick = function() {
            overlay.setPosition(undefined);
            return false;
        };

        function showPopup(feature, coordinate) {
            content.innerHTML = `
                <h3>${feature.get('name')}</h3>
                <p><strong>Adres:</strong> ${feature.get('address')}</p>
                <p><strong>Giriş:</strong> ${feature.get('accessDescription')}</p>
                <p><strong>Bağlantı sayı:</strong> ${feature.get('connectorsCount')}</p>
                ${feature.get('providerDescription') ? `<p><strong>Şirkət:</strong> ${feature.get('providerDescription')}</p>` : ''}
            `;
            overlay.setPosition(coordinate);
        }
    }

    function setupChart() {
        new ApexCharts(document.querySelector("#chart"), {
            series: [44, 55, 13],
            chart: { width: '100%', type: 'pie' },
            labels: ['Quraşdırılır', 'Hazır', 'İstifadədə'],
            colors: ['#FFBB33', '#00C851', '#E55934'],
            responsive: [{ breakpoint: 480, options: { chart: { width: '100%' } } }],
            legend: { position: 'bottom', horizontalAlign: 'center' }
        }).render();
    }

    initLanguage();
    const map = createMap();
    const vectorSource = new ol.source.Vector();
    setupClusters(vectorSource, map);
    setupPopup(map);
    setupChart();

    const apiData = await loadDataFromAPI();
    if (apiData?.data?.length) {
        apiData.data.forEach(location => {
            if (location.latitude && location.longitude) {
                vectorSource.addFeature(new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.fromLonLat([location.longitude, location.latitude])),
                    ...location,
                    connectorsCount: location.connectors?.length || 0
                }));
            }
        });
        if (vectorSource.getFeatures().length) {
            map.getView().fit(vectorSource.getExtent(), { padding: [50, 50, 50, 50], maxZoom: 14 });
        }
    }
});

function handleClick(element) {
    let img = element.querySelector(".icon-loc");

    if (img) {
      img.style.opacity = "0";
      setTimeout(() => {
        img.style.opacity = "1";
      }, 700);
    }
  }

  const fetchData = async () => {
    const targetUrl = "http://127.0.0.1:5501/EDM/chargers.json";

    try {
      const response = await fetch(targetUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const data = await response.json();

      // `data.data` istifadə edirik
      return Array.isArray(data.data) ? data.data : []; // Əgər `data.data` array deyilsə, boş array qaytarırıq
    } catch (error) {
      console.error("Data yüklənərkən xətaya düşdü:", error);
      return []; // Hər hansı bir xətada boş array qaytarırıq
    }
  };

  // Əsas funksiya - Cədvəl renderləmə
  const renderTable = async () => {
    const stations = await fetchData(); // Asinxron olaraq məlumatı alırıq

    console.log("Stations Array:", stations); // Burada da stations-u yoxlayaq

    const tbody = document.getElementById("station-table-body");
    tbody.innerHTML = ""; // Təhlükəsizlik üçün əvvəlki dataları təmizləyirik

    // Əgər stations array-dirsə, `forEach` ilə işləyirik
    if (Array.isArray(stations)) {
      stations.forEach((station, index) => {
        const connectorCount = station.connectors.length;

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>Ağ şəhər-1 YS <br><span class="district">${station.name}</span></td>
          <td>${station.address}</td>
          <td>${station.accessDescription}</td>
          <td>${connectorCount}</td>
          <td class="status-cell">
            <img class="icon-loc" src="./images/iconlocation.png" alt="" data-index="${index}">
          </td>
        `;

        const img = row.querySelector(".icon-loc");
        img.addEventListener("click", () => {
          Click(index, stations);
        });

        tbody.appendChild(row);
      });
    } else {
      console.error("Stations, array formatında deyil.");
    }
  };
  renderTable();

  // Click function to display station details in a popup
const Click = (index, stations) => {
const station = stations[index];

let popup = document.getElementById('station-popup');
if (!popup) {
popup = document.createElement('div');
popup.id = 'station-popup';
document.body.appendChild(popup);
}

// Create a backdrop element for catching outside clicks
let backdrop = document.getElementById('popup-backdrop');
if (!backdrop) {
backdrop = document.createElement('div');
backdrop.id = 'popup-backdrop';
document.body.appendChild(backdrop);
}

// Build the popup content
let connectorDetails = '';
station.connectors.forEach((connector, i) => {
connectorDetails += `
  <div class="connector-item">
    <p><strong>Connector ${i+1}</strong></p>
    <p>Güc: ${connector.power} kW</p>
    <p>Tarif: ${connector.price} AZN/kWh</p>
  </div>
`;
});

// Set the HTML content of the popup
popup.innerHTML = `
<div class="popup-content">
  <span class="close-btn">&times;</span>
  <h3>${station.name}</h3>
  <p><strong>Ünvan:</strong> ${station.address}</p>
  <h4>Connector Məlumatları:</h4>
  <div class="connectors-container">
    ${connectorDetails}
  </div>
</div>
`;

// Style the backdrop
backdrop.style.position = 'fixed';
backdrop.style.left = '0';
backdrop.style.top = '0';
backdrop.style.width = '100%';
backdrop.style.height = '100%';
backdrop.style.backgroundColor = 'rgba(0,0,0,0.5)';
backdrop.style.zIndex = '999';
backdrop.style.display = 'block';

// Add CSS to the popup
popup.style.position = 'fixed';
popup.style.left = '50%';
popup.style.top = '50%';
popup.style.transform = 'translate(-50%, -50%)';
popup.style.backgroundColor = 'white';
popup.style.padding = '20px';
popup.style.borderRadius = '8px';
popup.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
popup.style.zIndex = '1000';
popup.style.maxWidth = '500px';
popup.style.width = '90%';
popup.style.display = 'block';

// Style the close button
const closeBtn = popup.querySelector('.close-btn');
closeBtn.style.position = 'absolute';
closeBtn.style.right = '15px';
closeBtn.style.top = '10px';
closeBtn.style.cursor = 'pointer';
closeBtn.style.fontSize = '24px';

// Style connector items
const connectorItems = popup.querySelectorAll('.connector-item');
connectorItems.forEach(item => {
item.style.padding = '10px';
item.style.margin = '10px 0';
item.style.backgroundColor = '#f5f5f5';
item.style.borderRadius = '5px';
});

// Close popup function
const closePopup = () => {
popup.style.display = 'none';
backdrop.style.display = 'none';
};

// Add close functionality to the close button
closeBtn.addEventListener('click', closePopup);

// Close when clicking on the backdrop (outside the popup)
backdrop.addEventListener('click', closePopup);

// Prevent clicks inside the popup from closing it
popup.addEventListener('click', (event) => {
event.stopPropagation();
});
};

// Add this CSS to your page
const addPopupStyles = () => {
const style = document.createElement('style');
style.textContent = `
#station-popup {
  display: none;
  font-family: Arial, sans-serif;
}
#popup-backdrop {
  display: none;
}
.popup-content h3 {
  margin-top: 0;
  padding-right: 30px;
  color: #2c3e50;
}
.connectors-container {
  max-height: 300px;
  overflow-y: auto;
}
.connector-item {
  background-color: #f5f5f5;
  border-left: 3px solid #3498db;
}
`;
document.head.appendChild(style);
};
