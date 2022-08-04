let apiKey = "5764ce29e95921a10969a7f5a4043872";

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

function submitCity(event) {
  event.preventDefault();
  let submittedCity = document.querySelector("#city-input");

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${submittedCity.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  console.log(response);
  let temp = document.querySelector("#temperature");
  temp.innerHTML = `${Math.round(response.data.main.temp)}`;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = `${response.data.weather[0].description}`;
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
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function defineLocation() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let userCity = document.querySelector("#city-form");
userCity.addEventListener("submit", submitCity);

let userLocation = document.querySelector("#button-my-location");
userLocation.addEventListener("click", defineLocation);

function backgroundColor(weather) {
  if ((weather = "clear sky")) {
    let;
  }
}
