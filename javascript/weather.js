const API_KEY = "52191ecb30d99211bf8810256cc81f1f";

let LATITUDE = "";
let LONGITUDE = "";
let UPDATE = false;

const WEATHER = document.querySelector("#weather_icon");
const WEATHER_BOX = document.querySelector("#weather_box");
const WEATHER_MAIN = WEATHER_BOX.querySelector(".main");
const TEMPERATURE = WEATHER_BOX.querySelector(".temp");
const LOCATION = WEATHER_BOX.querySelector(".locate");

const ICONS = {
    Thunderstorm: "fas fa-bolt",
    Drizzle: "fas fa-cloud-rain",
    Rain: "fas fa-cloud-showers-heavy",
    Snow: "fas fa-snowflake",
    Atmosphere: "fas fa-smog",
    Clear: "fas fa-sun",
    Clouds: "fas fa-cloud",
};

function updateCurrentGeographic(lat, lon) {
    LATITUDE = lat;
    LONGITUDE = lon;
    UPDATE = true;
}

function showErrorMessage() {
    const message = "Can not bring geographic position due to permission, please try again after checked permission condition.";
    alert(message);
}

function createIcon(classes) {
    const class1 = classes.split(" ")[0];
    const class2 = classes.split(" ")[1];
    const icon = document.createElement("i");

    icon.classList.add(class1, class2);
    icon.id = "icon";
    return icon;
}

function updateWeatherIcon(icon) {
    WEATHER.firstElementChild.remove();
    WEATHER.appendChild(createIcon(icon));
}

function updateMainWeather(weather) {
    WEATHER_MAIN.innerText = weather;
    WEATHER_MAIN.style.fontSize = "15px";
}

function updateCurrentTemperature(minTemp, maxtemp, curTemp) {
    minTemp = Math.round(minTemp);
    maxtemp = Math.round(maxtemp);
    curTemp = Math.round(curTemp);
    TEMPERATURE.innerText = `Min:${minTemp}℃ / Max:${maxtemp}℃ / Cur:${curTemp}℃`;
    TEMPERATURE.style.fontSize = "12px";
}

function updateCurrentLocation(city, state) {
    LOCATION.innerText = `${city} of ${state}`;
    LOCATION.style.fontSize = "12px";
}

function updateGeographicPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

    let icon = "";
    let city = "";
    let weather = "";
    let state = "";
    let min_temp = "";
    let max_temp = "";
    let cur_temp = "";

    updateCurrentGeographic(latitude, longitude);
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            city = data.name;
            weather = data.weather[0].main;
            state = data.sys.country;
            cur_temp = data.main.temp;
            min_temp = data.main.temp_min;
            max_temp = data.main.temp_max;
            icon = ICONS[weather];

            console.log(data);
            console.log(weather);
            console.log(icon);

            WEATHER.appendChild(createIcon(icon));
            updateMainWeather(weather);
            updateCurrentLocation(city, state);
            updateCurrentTemperature(min_temp, max_temp, cur_temp);
        });
}

function updateCurrentWeather() {
    if (!UPDATE) {
        console.log("Can not update weather information due to did not updated geographic information yet.");
        return false;
    }

    console.log("run update current weather information function");

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=metric`;
    let icon = "";
    let city = "";
    let weather = "";
    let state = "";
    let min_temp = "";
    let max_temp = "";
    let cur_temp = "";

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            city = data.name;
            weather = data.weather[0].main;
            state = data.sys.country;
            cur_temp = data.main.temp;
            min_temp = data.main.temp_min;
            max_temp = data.main.temp_max;
            icon = ICONS[weather];

            updateWeatherIcon(icon);
            updateMainWeather(weather);
            updateCurrentLocation(city, state);
            updateCurrentTemperature(min_temp, max_temp, cur_temp);
        });
}

function waitInitialUpdateGeographicInformation() {
    console.log("run waitInitialUpdateGeographicInformation function");
    setInterval(updateCurrentWeather, 5 * 60 * 1000);
}

navigator.geolocation.getCurrentPosition(updateGeographicPosition, showErrorMessage);
setTimeout(waitInitialUpdateGeographicInformation, 5 * 60 * 1000);
