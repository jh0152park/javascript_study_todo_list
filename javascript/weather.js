const API_KEY = "52191ecb30d99211bf8810256cc81f1f";
const WEATHER = document.querySelector("#weather_icon");

const ICONS = {
  Thunderstorm: "fas fa-bolt",
  Drizzle: "fas fa-cloud-rain",
  Rain: "fas fa-cloud-showers-heavy",
  Snow: "fas fa-snowflake",
  Atmosphere: "fas fa-smog",
  Clear: "fas fa-sun",
  Clouds: "fas fa-cloud",
};

function showErrorMessage() {
  const message =
    "Can not bring geographic position due to permission, please try again after checked permission condition.";
  alert(message);
}

function createIcon(classes) {
  const class1 = classes.split(" ")[0];
  const class2 = classes.split(" ")[1];
  const icon = document.createElement("i");

  icon.classList.add(class1, class2);
  return icon;
}

function updateGeographicPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

  let icon = "";
  let city = "";
  let weather = "";
  let country = "";
  let temperature = "";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      city = data.name;
      weather = data.weather[0].main;
      country = data.sys.country;
      temperature = data.main.temp;
      icon = ICONS[weather];

      WEATHER.appendChild(createIcon(icon));

      console.log(city);
      console.log(weather);
      console.log(country);
      console.log(temperature);
      console.log(icon);
    });
}

navigator.geolocation.getCurrentPosition(
  updateGeographicPosition,
  showErrorMessage
);
