import "./style.css";
import setFavicon from "./modules/logo";
import cloudSun from "./assets/icons/weather-icons/cloud-sun.svg";
import windSoak from "./assets/icons/highlight-icons/windsock.svg";
import uv from "./assets/icons/highlight-icons/white-balance-sunny.svg";
import humidity from "./assets/icons/highlight-icons/water-outline.svg"
import visibility from "./assets/icons/highlight-icons/eye-outline.svg"
import thermometer from "./assets/icons/highlight-icons/thermometer.svg"

const weatherIcon = document.querySelector("#weather-icon");
weatherIcon.src = cloudSun;

const windSoakIcon = document.querySelector("#windsock-icon");
windSoakIcon.src = windSoak;

const uvIcon = document.querySelector("#uv-icon");
uvIcon.src = uv;

const humidityIcon = document.querySelector("#humidity-icon");
humidityIcon.src = humidity;

const visibilityIcon = document.querySelector("#visibility-icon");
visibilityIcon.src = visibility;

const thermometerIcon = document.querySelector("#thermometer-icon");
thermometerIcon.src = thermometer;

const weatherIconCards = document.querySelectorAll(".weather-icon-card");
weatherIconCards.forEach((icon) => {
    icon.src = cloudSun
})