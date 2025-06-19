// style & assets
import "./style.css";
import setFavicon from "./modules/logo";
import toggleSearchBar from "./modules/search";
import showInfo from "./modules/InfoPopup";
import fetchWeatherData from "./modules/weatherService";
import displayWeather from "./modules/renderWeather";
import { displayWeatherCards } from "./modules/renderCards";
import { icons } from "./modules/icons";

// Highlight and weather icons
import cloudSun from "./assets/icons/weather-icons/cloud-sun.svg";
import windSoak from "./assets/icons/highlight-icons/windsock.svg";
import uv from "./assets/icons/highlight-icons/white-balance-sunny.svg";
import humidity from "./assets/icons/highlight-icons/water-outline.svg";
import visibility from "./assets/icons/highlight-icons/eye-outline.svg";
import thermometer from "./assets/icons/highlight-icons/thermometer.svg";

// ========== GLOBAL STATE ==========
let isWeekCardsDisplayed = true;
let latestWeatherData = null;

// ========== DOM ELEMENTS ==========
const displayModeButton = document.querySelector("#switch-button");
const weeklyButton = document.querySelector("#weeks-mode");
const hourlyButton = document.querySelector("#hours-mode");

const weatherIcon = document.querySelector("#weather-icon");
const windSoakIcon = document.querySelector("#windsock-icon");
const uvIcon = document.querySelector("#uv-icon");
const humidityIcon = document.querySelector("#humidity-icon");
const visibilityIcon = document.querySelector("#visibility-icon");
const thermometerIcon = document.querySelector("#thermometer-icon");
const weatherIconCards = document.querySelectorAll(".weather-icon-card");

// ========== INITIAL SETUP ==========
// Preload weather icons
Object.values(icons).forEach((src) => {
  const img = new Image();
  img.src = src;
});

// Preload highlight icons
const highlightIcons = [cloudSun, windSoak, uv, humidity, visibility, thermometer];
highlightIcons.forEach((src) => {
  const img = new Image();
  img.src = src;
});


setWeatherIcons();
fetchAndDisplayWeather("Algiers", true);
toggleSearchBar();
showInfo();

// ========== EVENT LISTENERS ==========
displayModeButton.addEventListener("click", () => {
  if (!latestWeatherData) return;

  isWeekCardsDisplayed = !isWeekCardsDisplayed;
  updateModeButtons();
  displayWeatherCards(latestWeatherData, isWeekCardsDisplayed);
});

// ========== FUNCTIONS ==========

// Set all initial icons
function setWeatherIcons() {
  weatherIcon.src = cloudSun;
  windSoakIcon.src = windSoak;
  uvIcon.src = uv;
  humidityIcon.src = humidity;
  visibilityIcon.src = visibility;
  thermometerIcon.src = thermometer;

  weatherIconCards.forEach((icon) => {
    icon.src = cloudSun;
  });
}

// Update the UI buttons based on current display mode
function updateModeButtons() {
  weeklyButton.classList.toggle("selected", isWeekCardsDisplayed);
  hourlyButton.classList.toggle("selected", !isWeekCardsDisplayed);
}

// Fetch and render weather info
export default function fetchAndDisplayWeather(location, isWeekMode = true) {
  // Optionally add loading indicator here
  fetchWeatherData(location)
    .then((data) => {
      latestWeatherData = data;
      isWeekCardsDisplayed = isWeekMode;

      displayWeather({
        location: data.resolvedAddress,
        weatherDesc: data.currentConditions.conditions,
        temp: data.currentConditions.temp + "°C",
        date: new Date().toLocaleString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        iconSrc: icons[data.currentConditions.icon],
        windValue: data.currentConditions.windspeed + "km/h",
        uvValue: data.currentConditions.uvindex,
        humidityValue: data.currentConditions.humidity + "%",
        visibilityValue: data.currentConditions.visibility,
        feelsLikeValue: data.currentConditions.temp + "°C",
      });

      updateModeButtons();
      displayWeatherCards(data, isWeekCardsDisplayed);
    })
    .catch((err) => {
      console.error("Error fetching weather:", err);
      // Optionally show an error message in UI
    });
}
