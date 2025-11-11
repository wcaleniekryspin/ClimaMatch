// PRZENOSIMY WSZYSTKIE FUNKCJE NA POCZĄTEK PLIKU
// aby były zdefiniowane przed ich użyciem

async function los() {
    for (let i = 0; i < 50; i++) {
        const lat = ((Math.random() - 0.5) * 170).toFixed(6);
        const lng = ((Math.random() - 0.5) * 360).toFixed(6);
        
        const url3 = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=jsonv2`;
        console.log(url3);
        try {
            const res = await fetch(url3);
            const data = await res.json();

            if (!('error' in data)) {
                console.log("TRUE", lat, lng);
                return {lat, lng};
            }
            console.log("FALSE", lat, lng);
        } catch (error) {
            console.error("Error fetching location:", error);
        }
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