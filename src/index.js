function currentDay() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let current = document.querySelector("#current-day");
  current.innerHTML = `${day}, ${hours}:${minutes}`;
}
currentDay();

const emojis = {
  "01d": "☀️",
  "01n": "✨",
  "02d": "🌤",
  "02n": "☁️",
  "03d": "⛅️",
  "03n": "☁️",
  "04d": "☁️",
  "04n": "☁️",
  "09d": "🌧",
  "09n": "🌧",
  "10d": "🌦",
  "10n": "🌧",
  "11d": "🌩",
  "11n": "🌩",
  "13d": "❄️",
  "13n": "❄️",
  "50d": "🌫",
  "50n": "🌫",
};

function showTemperature(response) {
  console.log(response);
  let temp = document.querySelector("#temperature");
  temp.innerHTML = `${Math.round(response.data.main.temp)}`;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = `${response.data.weather[0].description}`;
  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.innerHTML = emojis[`${response.data.weather[0].icon}`];
  let feelTemp = document.querySelector("#feel-temp");
  feelTemp.innerHTML = `${Math.round(response.data.main.feels_like)}`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}`;
  let writtenCity = document.querySelector("#users-city");
  writtenCity.innerHTML = `${response.data.name}`;
}

function showLocation(position) {
  let apiKey = "5764ce29e95921a10969a7f5a4043872";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function defineLocation() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

function searchCity(city) {
  let apiKey = "5764ce29e95921a10969a7f5a4043872";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function submitCity(event) {
  event.preventDefault();
  let submittedCity = document.querySelector("#city-input");
  searchCity(submittedCity.value);
}

function showForecast() {
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row g-5">`;
  let days = ["Mon", "Tue", "Wed", "Thu"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col">
        <div class="forecast-icon">🌤</div>
          <div class="text-next-day">
            ${day}
          <div>
          <span class="forecast-temp-max" id="forecast-temp-max">
            22°
          </span>
          <span class="forecast-temp-min" id="forecast-temp-min">
            25°
          </span>
        </div>
      </div>
      </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let userCity = document.querySelector("#city-form");
userCity.addEventListener("submit", submitCity);

let userLocation = document.querySelector("#button-my-location");
userLocation.addEventListener("click", defineLocation);

searchCity("Wroclaw");
showForecast();
