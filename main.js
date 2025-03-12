document.addEventListener('DOMContentLoaded', async function() {
    const loadingIndicator = document.getElementById('loading');
    const langOptions = document.querySelectorAll(".lang-option");
    const selectedLang = document.getElementById("selectedLang");

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
            const response = await fetch('https://edm-prod1.azerishiq.az/api/resources/v2/chargings');
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
