import "./style.css";
import setFavicon from "./modules/logo";
import toggleSearchBar from "./modules/search";
import showInfo from "./modules/InfoPopup";
import fetchWeatherData from "./modules/weatherService";
import displayWeather from "./modules/renderWeather";

import { icons } from "./modules/icons";

import cloudSun from "./assets/icons/weather-icons/cloud-sun.svg";
import windSoak from "./assets/icons/highlight-icons/windsock.svg";
import uv from "./assets/icons/highlight-icons/white-balance-sunny.svg";
import humidity from "./assets/icons/highlight-icons/water-outline.svg";
import visibility from "./assets/icons/highlight-icons/eye-outline.svg";
import thermometer from "./assets/icons/highlight-icons/thermometer.svg";
import { displayWeatherCards } from "./modules/renderCards";

const displayModeButton = document.querySelector("#switch-button");
const weaklyButton = document.querySelector("#weeks-mode");
const hourButton = document.querySelector("#hours-mode");

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
  icon.src = cloudSun;
});

let isWeekCardsDisplayed = true;

toggleSearchBar();
showInfo();

fetchWeatherData("Paris")
  .then((data) => {
    displayWeather({
      location: data.resolvedAddress,
      weatherDesc: data.currentConditions.conditions,
      temp: data.currentConditions.temp + "°C",
      date: `${new Date().toLocaleString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}`,
      iconSrc: icons[data.currentConditions.icon],
      windValue: data.currentConditions.windspeed + "km/h",
      uvValue: data.currentConditions.uvindex,
      humidityValue: data.currentConditions.humidity + "%",
      visibilityValue: data.currentConditions.visibility,
      feelsLikeValue: data.currentConditions.temp + "°C",
    });

    displayWeatherCards(data , isWeekCardsDisplayed)

    displayModeButton.addEventListener("click", () => {
      if (isWeekCardsDisplayed) {
        weaklyButton.classList.remove("selected");
        hourButton.classList.add("selected");
        isWeekCardsDisplayed = false;
        displayWeatherCards(data, isWeekCardsDisplayed);
      } else {
        hourButton.classList.remove("selected");
        weaklyButton.classList.add("selected");
        isWeekCardsDisplayed = true;
        displayWeatherCards(data, isWeekCardsDisplayed);
      }
    });
  })
  .catch((err) => {
    console.error("❌ Error fetching weather:", err);
  });
