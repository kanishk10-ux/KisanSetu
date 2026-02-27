const stateToCoords = {
    "Punjab": { lat: 30.7333, lon: 76.7794 },
    "Haryana": { lat: 30.7333, lon: 76.7794 },
    "Uttar Pradesh": { lat: 26.8467, lon: 80.9462 },
    "Rajasthan": { lat: 26.9124, lon: 75.7873 },
    "Maharashtra": { lat: 19.0760, lon: 72.8777 },
    "Madhya Pradesh": { lat: 23.2599, lon: 77.4126 },
    "Bihar": { lat: 25.5941, lon: 85.1376 },
    "Gujarat": { lat: 23.0225, lon: 72.5714 },
    "Tamil Nadu": { lat: 13.0827, lon: 80.2707 },
    "Karnataka": { lat: 12.9716, lon: 77.5946 },
    "West Bengal": { lat: 22.5726, lon: 88.3639 },
    "Telangana": { lat: 17.3850, lon: 78.4867 },
    "Kerala": { lat: 8.5241, lon: 76.9366 },
    "Odisha": { lat: 20.2961, lon: 85.8245 }
};
async function getAdvice() {

    const state = document.getElementById("state").value;
    const landSize = document.getElementById("landSize").value;

    if (state === "" || landSize === "") {
        alert("Please select state and land size");
        return;
    }

    const response = await fetch("http://localhost:3000/get-advice", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            state: state,
            landSize: Number(landSize)
        })
    });

    const data = await response.json();
    const city = stateToCoords[state];
    if (city) {
        getWeather(state);
    } document.getElementById("result").innerHTML = `
            <h1>Category: ${data.category}</h1>
            <p><b>Scheme:</b> ${data.governmentScheme}</p>
            <p><b>Recommended Crop:</b> ${data.recommendedCrop}</p>
            <p><b>Tip:</b> ${data.expertTip}</p>
        `;
}
async function getWeather(state) {

    const coords = stateToCoords[state];

    if (!coords) {
        document.getElementById("weatherBox").innerHTML = "Weather unavailable";
        return;
    }

    const { lat, lon } = coords;

    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    );

    const data = await response.json();

    document.getElementById("weatherBox").innerHTML = `
        <div class="weather-card">
            <h3>${state}</h3>
            <p>🌡️ Temp: ${data.current_weather.temperature}°C</p>
            <p>💨 Wind: ${data.current_weather.windspeed} km/h</p>
            <p>🧭 Direction: ${data.current_weather.winddirection}°</p>
        </div>
    `;
}