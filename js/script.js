const areas = [
  // Europa - rozszerzona o wybrzeża
  { minLat: 70.0, maxLat: 71.7, minLng: 20.0, maxLng: 31.0 },  // północna Skandynawia z wybrzeżami
  { minLat: 64.5, maxLat: 70.0, minLng: 10.0, maxLng: 36.0 },  // środkowa Skandynawia z fiordami
  { minLat: 62.0, maxLat: 64.5, minLng: 5.0, maxLng: 52.0 },   // południowa Skandynawia
  { minLat: 54.0, maxLat: 62.0, minLng: 3.0, maxLng: 52.0 },   // Europa Północna z wybrzeżami
  { minLat: 51.5, maxLat: 58.6, minLng: -10.8, maxLng: 0 },   // Wyspy Brytyjskie
  { minLat: 47.0, maxLat: 54.0, minLng: -8.0, maxLng: 52.0 },  // Europa Środkowa
  { minLat: 41.0, maxLat: 47.0, minLng: -9.3, maxLng: 52.0 },  // Europa Południowa z Półwyspem Iberyjskim
  { minLat: 35.0, maxLat: 41.0, minLng: -9.7, maxLng: 52.0 }, // Europa Południowa z wyspami

  // Afryka - kompletne wybrzeża
  { minLat: 29.0, maxLat: 38.0, minLng: -10.5, maxLng: 60.2 },   // Afryka Północna z wybrzeżami
  { minLat: 14.0, maxLat: 29.0, minLng: -17.6, maxLng: 60.2 },   // Sahara z obszarami przybrzeżnymi
  { minLat: 4.0, maxLat: 14.0, minLng: -17.6, maxLng: 51.7 },    // Sahel
  { minLat: -12.0, maxLat: 4.0, minLng: 8.4, maxLng: 47.9 },     // Afryka Środkowa
  { minLat: -22.0, maxLat: -12.0, minLng: 11.6, maxLng: 40.8 },  // Afryka Południowa północ
  { minLat: -25.8, maxLat: -12.3, minLng: 43.5, maxLng: 50.7 },  // Madagaskar
  { minLat: -35.0, maxLat: -22.0, minLng: 14.0, maxLng: 35.7 },  // Afryka Południowa

  // Azja - kompletne wybrzeża
  { minLat: 74.0, maxLat: 77.0, minLng: 54.7, maxLng: 69.2 },   // Północno-zachodni archipelag
  { minLat: 74.0, maxLat: 81.3, minLng: 85.5, maxLng: 114.2 },   // Północno-środkowy archipelag
  { minLat: 74.0, maxLat: 76.2, minLng: 136.6, maxLng: 151.1 },   // Północno-wschodni archipelag
  { minLat: 69.5, maxLat: 74.0, minLng: 51, maxLng: 160 },   // Syberia północno-zachodnia
  { minLat: 64.0, maxLat: 69.5, minLng: 36.0, maxLng: 180.0 },    // Syberia zachodnia
  { minLat: 59.0, maxLat: 64.0, minLng: 40.0, maxLng: 180.0 },   // Syberia środkowa
  { minLat: 54.0, maxLat: 59.0, minLng: 38.0, maxLng: 142.8 },   // Syberia południowa
  { minLat: 50.1, maxLat: 59.0, minLng: 155.6, maxLng: 165.0 },   // Wschodni cypel
  { minLat: 49.0, maxLat: 54.0, minLng: 42.0, maxLng: 144.3 },   // południowa Syberia i Mongolia
  { minLat: 39.0, maxLat: 49.0, minLng: 46.0, maxLng: 145.5 },   // Azja Środkowa
  { minLat: 24.0, maxLat: 39.0, minLng: 53.0, maxLng: 122.5 },   // Azja Południowo-Zachodnia
  { minLat: 19.0, maxLat: 24.0, minLng: 67.5, maxLng: 122.1 },    // subkontynent indyjski północ
  { minLat: 6.0, maxLat: 19.0, minLng: 73.1, maxLng: 85.1 },     // subkontynent indyjski południe
  { minLat: 31.0, maxLat: 39.0, minLng: 124.8, maxLng: 141.7 },  // Korea i Japonia

  // Azja Południowo-Wschodnia - wszystkie archipelagi
  { minLat: 4.5, maxLat: 19.0, minLng: 93.0, maxLng: 110.7 },    // Półwysep Malajski
  { minLat: 4.5, maxLat: 19.0, minLng: 114.0, maxLng: 126.9 },    // Filipiny
  { minLat: -11.5, maxLat: 4.5, minLng: 95.0, maxLng: 138.0 },   // Indonezja 
  { minLat: -11.0, maxLat: -1.8, minLng: 138.0, maxLng: 154.0 },  // Nowa Gwinea i okolice

  // Australia i Oceania - wszystkie wyspy
  { minLat: -19.1, maxLat: -11.0, minLng: 121.2, maxLng: 146.5 }, // Australia północna
  { minLat: -35.0, maxLat: -19.1, minLng: 113.0, maxLng: 153.8 }, // Australia środkowa
  { minLat: -39.0, maxLat: -35.0, minLng: 136.5, maxLng: 151.0 }, // Australia południowa
  { minLat: -44.0, maxLat: -39.0, minLng: 144.5, maxLng: 148.5 }, // Tasmania
  { minLat: -47.5, maxLat: -34.0, minLng: 166.3, maxLng: 178.8 }, // Nowa Zelandia

  // Wyspy Oceanii - rozszerzone
  { minLat: -16.0, maxLat: -4.0, minLng: 154.0, maxLng: 172.0 },  // Wyspy Salomona i Vanuatu
  { minLat: -22.7, maxLat: -16.0, minLng: 163.0, maxLng: 169.9 }, // Nowa Kaledonia i Fidżi
  { minLat: -19.5, maxLat: -8.0, minLng: 177.1, maxLng: 180.0 },  // Tuvalu i Kiribati
  { minLat: -21.7, maxLat: -5.0, minLng: -180.0, maxLng: -157.0 }, // Hawaje
  { minLat: 18.8, maxLat: 22.0, minLng: -160.6, maxLng: -154.6 }, // Honolulu

  // Arktyka - rozszerzona
  { minLat: 76.5, maxLat: 80.5, minLng: 10.4, maxLng: 33.5 },   // Spitsbergen z wodami przybrzeżnymi
  { minLat: 79.0, maxLat: 83.7, minLng: -97.3, maxLng: -11.5 }, // Grenlandia północna z fiordami
  { minLat: 74.0, maxLat: 79.0, minLng: -122.5, maxLng: -16.9 },// Grenlandia środkowa
  { minLat: 68.1, maxLat: 74.0, minLng: -56.3, maxLng: -20.1 },// Grenlandia Srodkowo-południowa
  { minLat: 59.7, maxLat: 68.1, minLng: -53.7, maxLng: -32.2 },// Grenlandia południowa
  { minLat: 63.4, maxLat: 66.5, minLng: -24.5, maxLng: -13.5 },// Islandia

  // Alaska - z archipelagami
  { minLat: 59.5, maxLat: 64.0, minLng: -167.0, maxLng: -138.6 }, // Alaska środkowa
  { minLat: 54.5, maxLat: 59.5, minLng: -162.0, maxLng: -150.1 }, // Alaska południowa z fiordami

  // Ameryka Północna - z wybrzeżami
  { minLat: 72.0, maxLat: 74.0, minLng: -126.2, maxLng: -74.8 }, // Archipelagi Kanady
  { minLat: 64.0, maxLat: 72.0, minLng: -180.0, maxLng: -62.6 }, // Kanada północna z archipelagami i Alaską północną
  { minLat: 54.0, maxLat: 64.0, minLng: -138.6, maxLng: -61.4 }, // Kanada środkowa z zatokami
  { minLat: 42.5, maxLat: 54.0, minLng: -128.0, maxLng: -53.8 }, // Kanada południowa i północ USA
  { minLat: 37.0, maxLat: 42.5, minLng: -124.6, maxLng: -69.5 }, // zachodnie USA z wybrzeżem
  { minLat: 32.0, maxLat: 37.0, minLng: -122.1, maxLng: -75.3 }, // południowo-zachodnie USA
  { minLat: 28.4, maxLat: 32.0, minLng: -96.6, maxLng: -80.4 }, // południowe USA
  { minLat: 24.5, maxLat: 28.4, minLng: -82.9, maxLng: -80.0 }, // Miami
  { minLat: 24.5, maxLat: 32.0, minLng: -117.0, maxLng: -96.6 }, // Meksyk północny
  { minLat: 17.4, maxLat: 24.5, minLng: -107.0, maxLng: -61.7 }, // Meksyk środkowy z wyspami
  { minLat: 14.5, maxLat: 17.4, minLng: -101.0, maxLng: -83.0 }, // Meksyk południowy
  { minLat: 12.5, maxLat: 17.4, minLng: -62.9, maxLng: -59.3 },   // Ameryka Środkowa Wschodnia
  { minLat: 8.0, maxLat: 14.5, minLng: -92.2, maxLng: -82.0 },   // Ameryka Środkowa Zachodnia

  // Ameryka Południowa - kompletne wybrzeża
  { minLat: 6.3, maxLat: 12.5, minLng: -82.0, maxLng: -58.0 },    // północna część z wybrzeżami
  { minLat: -14.7, maxLat: 6.3, minLng: -81.0, maxLng: -50.8 },   // północno-zachodnia
  { minLat: -14.7, maxLat: -1.2, minLng: -50.8, maxLng: -34.8 },  // Brazylia wschód
  { minLat: -17.5, maxLat: -14.7, minLng: -76.0, maxLng: -38.9 }, // zachodnia z Andami
  { minLat: -24.1, maxLat: -17.5, minLng: -70.6, maxLng: -38.9 }, // zachodnia z Andami
  { minLat: -32.0, maxLat: -24.1, minLng: -72.0, maxLng: -46.7 }, // środkowa
  { minLat: -40.0, maxLat: -32.0, minLng: -74.0, maxLng: -52.0 }, // południowa
  { minLat: -55.9, maxLat: -40.0, minLng: -76.0, maxLng: -62.0 }, // Patagonia z fiordami
  { minLat: -52.4, maxLat: -51.2, minLng: -61.1, maxLng: -57.7 }, // Falkland
];

function isPointInAnyArea(lat, lng) {
  return areas.some(area => 
    lat >= area.minLat && 
    lat <= area.maxLat && 
    lng >= area.minLng && 
    lng <= area.maxLng
  );
}

async function los() {
    for (let i = 0; i < 20; i++) {
        const lat = ((Math.random() - 0.4) * 139).toFixed(6);
        const lng = ((Math.random() - 0.5) * 360).toFixed(6);

        if (isPointInAnyArea(lat, lng)) return {lat, lng};
        
    }
    return {lat: 51.75639, lng: 19.45789};
}

function suma(tab) {
    let suma = 0;
    tab.forEach((element) => {
        suma += element;
    });
    return suma;
}

const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

async function getData(lat, lng) {
    var today = new Date();
    today.setDate(today.getDate() - 1);

    var lastYear = new Date(today);
    lastYear.setDate(today.getDate() - 363);

    today = formatDate(today);
    lastYear = formatDate(lastYear);

    try {
        const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lng}&start_date=${lastYear}&end_date=${today}&daily=cloudcover_mean,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,sunrise,sunset`;
        const res = await fetch(url);
        const data = await res.json();
    
        const url2 = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lng}&start_date=${lastYear}&end_date=${today}&hourly=sulphur_dioxide,ammonia,nitrogen_dioxide`;
        const res2 = await fetch(url2);
        const data2 = await res2.json();

        const labels = data.daily.time;
        var labelsAvg = [];
        
        /* ********************* */
        document.body.classList.remove("loading"); // <--- DODANE
        document.getElementById("animationContainer").style.display = 'none';
        document.getElementById("mapWrapper").style.display = 'block';
        document.getElementById("submit").style.display = 'block';
        
        /* ********************* */

        if (data.hourly || data.daily) {
            const tempMin = data.daily.temperature_2m_min;
            const tempMax = data.daily.temperature_2m_max;
            const preci = data.daily.precipitation_sum;
            const cloudCover = data.daily.cloudcover_mean;
            const wind = data.daily.wind_speed_10m_max;
            const sunrise = data.daily.sunrise;
            const sunset = data.daily.sunset;
            var sun = [];
            for (let i = 0; i < sunrise.length; i++) {
                const rise = new Date(sunrise[i]);
                const set = new Date(sunset[i]);
                const diffMs = set - rise;
                const diffHrs = +(diffMs / (1000 * 60 * 60)).toFixed(1);
                sun.push(diffHrs);
            }

            var tempMinAvg = [];
            var tempMaxAvg = [];
            var preciAvg = [];
            var cloudCoverAvg = [];
            var windAvg = [];
            var sunAvg = [];

            // Obliczanie średnich 14-dniowych
            var days = 14;
            for (let i = 0; i < labels.length; i += days) {
                if (i + (days / 2) < labels.length) {
                    labelsAvg.push(labels[i + (days / 2)]);

                    const chunkMin = tempMin.slice(i, i + days);
                    tempMinAvg.push(suma(chunkMin) / chunkMin.length);
                    
                    const chunkMax = tempMax.slice(i, i + days);
                    tempMaxAvg.push(suma(chunkMax) / chunkMax.length);
                    
                    const chunkPreci = preci.slice(i, i + (days * 2));
                    preciAvg.push(suma(chunkPreci));
                    
                    const chunkCloud = cloudCover.slice(i, i + days);
                    cloudCoverAvg.push(suma(chunkCloud) / chunkCloud.length);
                    
                    const chunkWind = wind.slice(i, i + days);
                    windAvg.push(suma(chunkWind) / chunkWind.length);
                    
                    const chunkSun = sun.slice(i, i + days);
                    sunAvg.push(suma(chunkSun) / chunkSun.length);
                }
            }

            // Wykres temperatury i opadów
            var ctx = document.getElementById("tempPreci");
            if (ctx) {
                new Chart(ctx, {
                    data: {
                        labels: labelsAvg,
                        datasets: [
                            {
                                type: 'line',
                                label: 'Maximum temperature (°C)',
                                data: tempMaxAvg,
                                borderColor: 'rgba(255, 0, 0, 1)',
                                borderWidth: 2,
                                fill: false,
                                yAxisID: 'y',
                                pointRadius: 0,
                                tension: 0.2
                            },
                            {
                                type: 'line',
                                label: 'Minimum temperature (°C)',
                                data: tempMinAvg,
                                borderColor: 'rgba(0, 195, 255, 1)',
                                borderWidth: 2,
                                fill: false,
                                yAxisID: 'y',
                                pointRadius: 0,
                                tension: 0.2
                            },
                            {
                                type: 'bar',
                                label: 'Precipitation total',
                                data: preciAvg.flatMap((v, _) => [v, 0]),
                                backgroundColor: 'rgba(0, 0, 255, 1)',
                                borderWidth: 0,
                                yAxisID: 'y1'
                            }
                        ]
                    },
                    options: {
                        maintainAspectRatio: false,
                        responsive: true,
                        scales: {
                            x: { title: { display: true, text: 'Day of the year' }, ticks: {maxTicksLimit: 13}, stacked: true },
                            y: { type: 'linear', position: 'left', title: { display: true, text: 'Temperature (°C)' } },
                            y1: { type: 'linear', position: 'right', title: { display: true, text: 'Precipitation (mm)' }, grid: { drawOnChartArea: false }, stacked: true, min: 0 }
                        }
                    }
                });
            }

            // Wykres zachmurzenia i wiatru
            ctx = document.getElementById("cloudWind");
            if (ctx) {
                new Chart(ctx, {
                    data: {
                        labels: labelsAvg,
                        datasets: [
                            {
                                type: 'line',
                                label: 'Wind speed (km/h)',
                                data: windAvg,
                                borderColor: 'rgba(255, 0, 0, 1)',
                                backgroundColor: 'rgba(255, 0, 0, 0.05)',
                                borderWidth: 2,
                                fill: true,
                                yAxisID: 'y',
                                pointRadius: 0,
                                tension: 0.2
                            },
                            {
                                type: 'line',
                                label: 'Cloud cover (%)',
                                data: cloudCoverAvg,
                                borderColor: 'rgba(112, 112, 112, 1)',
                                backgroundColor: 'rgba(112, 112, 112, 0.05)',
                                borderWidth: 2,
                                fill: true,
                                yAxisID: 'y1',
                                pointRadius: 0,
                                tension: 0.2
                            }
                        ]
                    },
                    options: {
                        maintainAspectRatio: false,
                        responsive: true,
                        scales: {
                            x: { title: { display: true, text: 'Day of the year' }, ticks: {maxTicksLimit: 13} },
                            y: { type: 'linear', position: 'left', title: { display: true, text: 'Wind speed (km/h)' }, min: 0 },
                            y1: { type: 'linear', position: 'right', title: { display: true, text: 'Cloud cover (%)' }, grid: { drawOnChartArea: false }, min: 0, max: 100 }
                        }
                    }
                });
            }

            // Wykres długości dnia
            ctx = document.getElementById("sun");
            if (ctx) {
                new Chart(ctx, {
                    data: {
                        labels: labelsAvg,
                        datasets: [
                            {
                                type: 'line',
                                label: 'Day length (h)',
                                data: sunAvg,
                                borderColor: 'rgba(255, 255, 0, 1)',
                                backgroundColor: 'rgba(255, 255, 0, 0.05)',
                                borderWidth: 2,
                                fill: true,
                                yAxisID: 'y',
                                pointRadius: 0,
                                tension: 0.2
                            }
                        ]
                    },
                    options: {
                        maintainAspectRatio: false,
                        responsive: true,
                        scales: {
                            x: { title: { display: true, text: 'Day of the year' }, ticks: {maxTicksLimit: 13} },
                            y: { type: 'linear', position: 'left', title: { display: true, text: 'Day length (h)' } },
                        }
                    }
                });
            }
        }

        if (data2.hourly || data2.daily) {
            var sulf = data2.hourly.sulphur_dioxide;
            var ammonia = data2.hourly.ammonia;
            var nitro = data2.hourly.nitrogen_dioxide;
            
            var sulfAvg = [];
            var ammoniaAvg = [];
            var nitroAvg = [];

            days *= 24;
            for (let i = 0; i < nitro.length; i += days) {
                if (i + (days / 2) < nitro.length) {
                    var chunk = sulf.slice(i, i + days);
                    sulfAvg.push(suma(chunk) / days);
                    
                    chunk = ammonia.slice(i, i + days);
                    ammoniaAvg.push(suma(chunk) / days);
                    
                    chunk = nitro.slice(i, i + days);
                    nitroAvg.push(suma(chunk) / days);
                }
            }

            ctx = document.getElementById("polution");
            if (ctx) {
                new Chart(ctx, {
                    data: {
                        labels: labelsAvg,
                        datasets: [
                            {
                                type: 'line',
                                label: 'Sulphur dioxide',
                                data: sulfAvg,
                                borderColor: 'rgba(0, 255, 0, 1)',
                                backgroundColor: 'rgba(0, 255, 0, 0.05)',
                                borderWidth: 2,
                                fill: true,
                                pointRadius: 0,
                                tension: 0.2
                            },
                            {
                                type: 'line',
                                label: 'Ammonia',
                                data: ammoniaAvg,
                                borderColor: 'rgba(255, 0, 255, 1)',
                                backgroundColor: 'rgba(255, 0, 255, 0.05)',
                                borderWidth: 2,
                                fill: true,
                                pointRadius: 0,
                                tension: 0.2
                            },
                            {
                                type: 'line',
                                label: 'Nitrogen dioxide',
                                data: nitroAvg,
                                borderColor: 'rgba(255, 140, 0, 1)',
                                backgroundColor: 'rgba(255, 140, 0, 0.05)',
                                borderWidth: 2,
                                fill: true,
                                pointRadius: 0,
                                tension: 0.2
                            }
                        ]
                    },
                    options: {
                        maintainAspectRatio: false,
                        responsive: true,
                        scales: {
                            x: { title: { display: true, text: 'Day of the year' }, ticks: {maxTicksLimit: 13} },
                            y: { type: 'linear', position: 'left', title: { display: true, text: 'Amount μg/m³' }, min: 0 }
                        }
                    }
                });
            }
        }
    } catch (err) {
        console.error('Błąd podczas pobierania danych:', err);
    }
}

// Inicjalizacja mapy po załadowaniu DOM
document.addEventListener('DOMContentLoaded', async function() {
    if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
        localStorage.removeItem("total_score");
        localStorage.removeItem("round");
    }
    
    let userMarker = null;
    let positionMarker = null;
    let line = null;
    const map = L.map('map').setView([35.0, 0.0], 2);

    let total_score = Number(localStorage.getItem("total_score")) || 0;
    let round = Number(localStorage.getItem("round")) || 0;
    const Roundd = document.getElementById("round");
    const next = document.getElementById("nextRound");
    
    next.addEventListener('click', function(e) {
        e.preventDefault();
        location.reload();
    });
    
    const mapToggle = document.getElementById("mapToggle");
    // const mapWrapper = document.getElementById("mapWrapper");

    mapToggle.addEventListener("change", () => {
        setTimeout(() => {
            map.invalidateSize();
        }, 300);
    });

    // Dodanie kafelków mapy
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    var latC;
    var lngC;

    // Pobierz losową lokalizację na początku
    var {lat, lng} = await los();

    // Dodanie obsługi kliknięcia na mapę
    map.on('click', function(e) {
        latC = e.latlng.lat;
        lngC = e.latlng.lng;

        // Normalizacja współrzędnych
        while (latC < -90) { latC += 180; }
        while (latC > 90) { latC -= 180; }
        while (lngC < -180) { lngC += 360; }
        while (lngC > 180) { lngC -= 360; }

        if (userMarker) { 
            map.removeLayer(userMarker); 
        }
        userMarker = L.marker([latC, lngC]).addTo(map);

        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        submitBtn.style.cursor = "pointer";
    });

    submitBtn = document.getElementById("submit");
    
    submitBtn.addEventListener('click', function(e) {
        function distance(lat1, lng1, lat2, lng2) {
            const R = 6371;
            const toRad = deg => deg * Math.PI / 180;

            const dLat = toRad(lat2 - lat1);
            const dLng = toRad(lng2 - lng1);

            const d = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
            const c = 2 * Math.atan2(Math.sqrt(d), Math.sqrt(1 - d));
            return R * c;
        }

        function scoreGaussian(d) {
            const sigma = 2000;
            const score = 1000 * Math.exp(-(d ** 2) / (2 * sigma ** 2));
            return d > 9000 ? 0 : score;
        }
        
        if (!userMarker) return;

        // Usuń poprzedni positionMarker jeśli istnieje
        if (positionMarker) { 
            map.removeLayer(positionMarker); 
        }
        
        // Dodaj znacznik poprawnej lokalizacji
        const myIcon = L.icon({
            iconUrl: 'png/znacznik.png',  // Twój plik .png/.jpg/.svg
            iconSize: [20, 32],        // rozmiar ikony w px
            iconAnchor: [10, 32],      // punkt na ikonie odpowiadający współrzędnym
            popupAnchor: [0, 0]         // punkt dla popup (opcjonalnie)
        });

        positionMarker = L.marker([Number(lat), Number(lng)], {
            icon: myIcon
        }).addTo(map);

        // Usuń poprzednią linię jeśli istnieje
        if (line) {
            map.removeLayer(line);
        }
        
        // Dodaj linię łączącą guess z poprawną lokalizacją
        line = L.polyline([
            [latC, lngC],
            [Number(lat), Number(lng)]
        ], { color: 'red', weight: 2 }).addTo(map);

        const d = distance(lat, lng, latC, lngC);

        console.log("Correct:", lat, lng);
        console.log("Guess:", latC, lngC);
        console.log("Distance:", d);
        console.log("Score:", scoreGaussian(d));

        const popup = document.getElementById("popUp");
        const dist = document.getElementById("distance");
        const scoreEl = document.getElementById("score");
        const totalScoreEl = document.getElementById("total");

        const roundScore = scoreGaussian(d);
        total_score += roundScore;
        localStorage.setItem("total_score", total_score);

        round++;
        if (Roundd) Roundd.innerHTML = `${round.toFixed(0)}`;
        if (totalScoreEl) totalScoreEl.innerHTML = `${total_score.toFixed(0)} points`;
        
        if (round === 5) {
            localStorage.removeItem("round");
            localStorage.removeItem("total_score");
            
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.5";
            submitBtn.style.cursor = "not-allowed";

            next.textContent = "Summary";
            next.replaceWith(next.cloneNode(true)); 
            const newNext = document.getElementById("nextRound");

            newNext.addEventListener('click', function() {
                const summaryPopup = document.getElementById("summaryPopUp");
                const totalScoreEl = document.getElementById("totalSummary");

                if (totalScoreEl) totalScoreEl.innerHTML = `${total_score.toFixed(0)}`;
                if (summaryPopup) summaryPopup.style.display = "block";

                round = 0;
                total_score = 0;
                const closeSummary = document.getElementById("closeSummary");
                if (closeSummary) {
                    closeSummary.addEventListener("click", function() {
                        window.location.href = "index.html";
                    });
                }
            });
        } else {
            localStorage.setItem("round", round);
        }
        
        if (popup) popup.style.display = "block";
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.5";
        submitBtn.style.cursor = "not-allowed";
        if (dist) dist.innerHTML = `${d.toFixed(0)} km`;
        if (scoreEl) scoreEl.innerHTML = `${roundScore.toFixed(0)} points`;

        // Wyłącz dalsze kliknięcia na mapie po submisie
        map.off('click');
    });

    // Załaduj dane wykresów
    document.body.classList.add("loading"); // <--- DODANE
    getData(lat, lng);

    const footerYear = document.querySelector('.footer-year');

    const handleCurrentYear = () => {
        const year = (new Date).getFullYear();
        if (footerYear) {
            footerYear.innerText = year;
        }
    }
     
    handleCurrentYear();
});