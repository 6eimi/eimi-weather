const long = document.getElementById("longitude");
const lat = document.getElementById("latitude");

const buttonToDisplayWeatherData = document.getElementById("dataDisplayer");

buttonToDisplayWeatherData.addEventListener("click", async () => {
    try {
        const data = await dataFetcher(long.value, lat.value);
        console.log(data);
        displayWeather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
});

async function dataFetcher(long, lat) {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m&daily=temperature_2m_max&precipitation_sum&wind_speed_10m_max&forecast_days=2`
        );
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error parsing weather data:", error);
        throw error;
    }
}

function displayWeather(data) {

    document.getElementById("temperature").textContent = "";
    document.getElementById("wind-speed").textContent = "";
    const tableBody = document.querySelector("#weather-table tbody");
    tableBody.innerHTML = "";

    const currentTemperature = data.hourly.temperature_2m[0];
    const currentWindSpeed = "No value";

    document.getElementById("temperature").textContent = `Temperature: ${currentTemperature}°C`;
    document.getElementById("wind-speed").textContent = `Wind Speed: ${currentWindSpeed} m/s`;

    for (let i = 0; i < data.hourly.time.length; i++) {
        const dateTime = data.hourly.time[i];
        const temperature = data.hourly.temperature_2m[i];
        const windSpeed = "No value";

        const date = new Date(dateTime);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();

        const row = tableBody.insertRow();
        row.insertCell(0).textContent = formattedDate;
        row.insertCell(1).textContent = formattedTime;
        row.insertCell(2).textContent = `${temperature}°C`;
        row.insertCell(3).textContent = `${windSpeed} m/s`;
    }
}

