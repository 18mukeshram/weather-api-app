// ====== CONFIG ======
const API_KEY = "d77bf44bb93c27c6e473c83375dc9fe4";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// ====== DOM ELEMENTS ======
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const statusMessage = document.getElementById("statusMessage");
const weatherCard = document.getElementById("weatherCard");
const loadingState = document.getElementById("loadingState");

const cityNameEl = document.getElementById("cityName");
const dateTextEl = document.getElementById("dateText");
const weatherMainEl = document.getElementById("weatherMain");
const temperatureEl = document.getElementById("temperature");
const feelsLikeEl = document.getElementById("feelsLike");
const weatherIconEl = document.getElementById("weatherIcon");
const weatherDescriptionEl = document.getElementById("weatherDescription");
const humidityEl = document.getElementById("humidity");
const windSpeedEl = document.getElementById("windSpeed");
const pressureEl = document.getElementById("pressure");

// ====== HELPERS ======
function showStatus(message, isError = false) {
  if (!message) {
    statusMessage.classList.add("hidden");
    statusMessage.textContent = "";
    return;
  }
  statusMessage.textContent = message;
  statusMessage.classList.remove("hidden");

  if (isError) {
    statusMessage.classList.add("text-red-300");
    statusMessage.classList.remove("text-slate-200");
  } else {
    statusMessage.classList.add("text-slate-200");
    statusMessage.classList.remove("text-red-300");
  }
}

function setLoading(isLoading) {
  if (isLoading) {
    loadingState.classList.remove("hidden");
    weatherCard.classList.add("hidden");
    searchBtn.disabled = true;
    searchBtn.classList.add("opacity-70", "cursor-not-allowed");
  } else {
    loadingState.classList.add("hidden");
    searchBtn.disabled = false;
    searchBtn.classList.remove("opacity-70", "cursor-not-allowed");
  }
}

function formatDate(timestamp, timezoneShift) {
  // timestamp is in seconds; timezoneShift in seconds too
  const localTime = (timestamp + timezoneShift) * 1000;
  const date = new Date(localTime);
  return date.toLocaleString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ====== CORE FUNCTION ======
async function fetchWeather(city) {
  if (!city) {
    showStatus("Please enter a city name.", true);
    weatherCard.classList.add("hidden");
    return;
  }

  showStatus(""); // clear previous message
  setLoading(true); // start loading

  try {
    const url = `${BASE_URL}?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("City not found. Please check the spelling.");
      } else {
        throw new Error("Unable to fetch data. Please try again.");
      }
    }

    const data = await response.json();
    updateUI(data);
  } catch (error) {
    console.error(error);
    showStatus(error.message || "Something went wrong.", true);
    weatherCard.classList.add("hidden");
  } finally {
    setLoading(false); // stop loading whether success or error
  }
}

// ====== UPDATE UI ======
function updateUI(data) {
  // Basic data
  const {
    name,
    dt,
    timezone,
    main: { temp, feels_like, humidity, pressure },
    weather,
    wind: { speed },
  } = data;

  const weatherInfo = weather[0];

  cityNameEl.textContent = name;
  dateTextEl.textContent = formatDate(dt, timezone);

  temperatureEl.textContent = `${Math.round(temp)}°C`;
  feelsLikeEl.textContent = `Feels like ${Math.round(feels_like)}°C`;

  weatherMainEl.textContent = weatherInfo.main;
  weatherDescriptionEl.textContent = weatherInfo.description;

  const iconCode = weatherInfo.icon; // e.g., "10d"
  weatherIconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIconEl.alt = weatherInfo.main;

  humidityEl.textContent = `${humidity}%`;
  windSpeedEl.textContent = `${speed} m/s`;
  pressureEl.textContent = `${pressure} hPa`;

  weatherCard.classList.remove("hidden");
}

// ====== EVENT LISTENERS ======
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  fetchWeather(city);
});

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    fetchWeather(city);
  }
});
