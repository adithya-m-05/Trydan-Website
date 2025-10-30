// --- LOCAL DATA SIMULATOR ---
// Set this to true to use local dummy data, false to connect to HiveMQ
const USE_LOCAL_DATA = true;

// --- Chart & Map Configuration ---
const MAX_DATA_POINTS = 50;
Chart.defaults.color = 'var(--text-color)';
Chart.defaults.borderColor = '#666';

function createChart(ctx, label) {
    return new Chart(ctx, {
        type: 'line',
        data: { labels: [], datasets: [{ label: label, data: [], borderColor: '#00bfff', borderWidth: 2, fill: false, tension: 0.4, pointRadius: 0 }] },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, ticks: { color: '#a0a0a0' } },
                x: { ticks: { color: '#a0a0a0' } }
            },
            plugins: { legend: { display: false } },
            animation: { duration: 0 }
        }
    });
}

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach(dataset => dataset.data.push(data));
    if (chart.data.labels.length > MAX_DATA_POINTS) {
        chart.data.labels.shift();
        chart.data.datasets.forEach(dataset => dataset.data.shift());
    }
    chart.update();
}

// UI update logic
function updateUI(data) {
    const now = new Date(data.timestamp * 1000).toLocaleTimeString().split(" ")[0];
    addData(rpmChart, now, data.rpm);
    addData(speedChart, now, data.speed);
    document.getElementById('gear-indicator').innerText = data.gear;
    const brakeButton = document.getElementById('brake-button');
    const isBraking = data.brake > 0.1;
    brakeButton.innerText = isBraking ? 'ON' : 'OFF';
    brakeButton.classList.toggle('on', isBraking);
    const newLatLng = [data.gps.lat, data.gps.lon];
    if(data.gps.lat !== 0) {
        kartMarker.setLatLng(newLatLng);
        map.panTo(newLatLng, { animate: true, duration: 0.1 });
    }
}

// --- Initial UI Setup ---
const rpmChart = createChart(document.getElementById('rpmChart').getContext('2d'), 'RPM');
const speedChart = createChart(document.getElementById('speedChart').getContext('2d'), 'Speed');

const map = L.map('map', { zoomControl: false }).setView([12.9716, 77.5946], 17);
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; Stadia Maps &copy; OpenMapTiles &copy; OpenStreetMap'
}).addTo(map);
let kartMarker = L.marker([12.9716, 77.5946]).addTo(map);

setTimeout(() => { map.invalidateSize(); }, 100);


if (USE_LOCAL_DATA) {
    // --- Local Data Generation Mode with Smoother Movement ---
    console.log("Using local dummy data generator with smooth path at 10Hz.");

    const path = [
        [12.9716, 77.5946], [12.9710, 77.5948], [12.9705, 77.5940],
        [12.9712, 77.5935], [12.9720, 77.5933], [12.9725, 77.5942],
        [12.9720, 77.5950], [12.9716, 77.5946]
    ];
    let pathIndex = 0;
    let step = 0;
    const stepsBetweenPoints = 10; // More steps = smoother movement

    L.polyline(path, { color: '#555', weight: 3 }).addTo(map);

    setInterval(() => {
        const startPoint = path[pathIndex];
        const endPoint = path[(pathIndex + 1) % path.length];
        
        // Calculate the intermediate position (interpolation)
        const progress = step / stepsBetweenPoints;
        const lat = startPoint[0] + (endPoint[0] - startPoint[0]) * progress;
        const lon = startPoint[1] + (endPoint[1] - startPoint[1]) * progress;

        const dummyTelemetry = {
            timestamp: Date.now() / 1000,
            gps: { lat: lat, lon: lon },
            speed: randomInRange(45, 55, 1),
            rpm: randomInRange(5000, 6500, 0),
            brake: Math.random() < 0.05 ? randomInRange(0.5, 1.0, 2) : 0.0,
            gear: randomInRange(3, 5, 0)
        };
        updateUI(dummyTelemetry);

        // Move to the next step or next point on the path
        step++;
        if (step > stepsBetweenPoints) {
            step = 0;
            pathIndex = (pathIndex + 1) % path.length;
        }

    }, 100); // Run every 100ms (10Hz)

    function randomInRange(min, max, decimals = 2) {
        const value = Math.random() * (max - min) + min;
        return Number(value.toFixed(decimals));
    }

} else {
    // --- HiveMQ Connection Mode ---
    console.log("Connecting to HiveMQ...");
    const BROKER_URL = "f7c0766fe5b74bf2985c1be12a350177.s1.eu.hivemq.cloud";
    const BROKER_PORT = 8884;
    const USERNAME = "teamtrydan";
    const PASSWORD = "Trydan25";
    const TOPIC_TELEMETRY = "kart/telemetry/teamXkart01";

    const client = mqtt.connect(`wss://${BROKER_URL}:${BROKER_PORT}/mqtt`, { 
        username: USERNAME, 
        password: PASSWORD 
    });

    client.on('connect', () => {
        console.log('Connected to HiveMQ Broker!');
        client.subscribe(TOPIC_TELEMETRY, (err) => {
            if (!err) console.log(`Subscribed to topic: ${TOPIC_TELEMETRY}`);
        });
    });

    client.on('message', (topic, message) => {
        if (topic === TOPIC_TELEMETRY) {
            const data = JSON.parse(message.toString());
            updateUI(data);
        }
    });
}

