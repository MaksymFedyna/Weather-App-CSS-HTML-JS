const apiKey = 'cb5752797bdd86bcaa8848a75dd34d18';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const locationForm = document.querySelector('form');
const image = document.getElementById('weather');
const humidity = document.getElementById('percents');
const humidityPicture = document.getElementById('humidity');
const humidityText = document.getElementById('hummidity-text');
const windPicture = document.getElementById('windPicture');
const windSpeed = document.getElementById('windSpeed');
const windText = document.getElementById('windText');

locationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            if (data.weather[0].description === 'clear sky') {
                image.src = './images/clear.png';
            } else if (data.weather[0].description === 'rain' || data.weather[0].description === 'shower rain') {
                image.src = './images/rain.png';
            } else if (data.weather[0].description === 'scattered clouds' || data.weather[0].description === 'broken clouds' || data.weather[0].description === 'few clouds' || data.weather[0].description === 'overcast clouds') {
                image.src = './images/clouds.png';
            } else if (data.weather[0].description === 'snow') {
                image.src = './images/snow.png';
            } else if (data.weather[0].description === 'mist') {
                image.src = './images/mist.png';
            }

            humidity.textContent = `${data.main.humidity}%`;
            humidityText.textContent = 'Humidity';
            humidityPicture.src = './images/humidity.png';

            windPicture.src = './images/wind.png';
            windText.textContent = 'Wind Speed';
            windSpeed.textContent = `${data.wind.speed} km/h`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}
