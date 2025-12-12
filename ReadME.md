# 🌦 Weather Information Web App

A clean, responsive weather application that lets users search any city and view live weather details (temperature, conditions, humidity, wind speed, pressure). Built with vanilla JavaScript and styled with Tailwind CSS. Data is fetched from the OpenWeather REST API.

---

## Features

- City-based live weather search
- Real-time API fetching using `fetch` + `async/await`
- Loading animation and graceful error handling for invalid inputs
- Mobile-first responsive UI with Tailwind CSS
- Modern glass-style cards and subtle animations

---

## Tech Stack

- HTML5
- Tailwind CSS
- JavaScript (ES6+)
- OpenWeather REST API

Tools: VS Code, Git, GitHub, Browser DevTools

---

## Folder Structure

weather-app/
├─ index.html
├─ script.js
├─ styles.css (or styles.scss)
├─ assets/
└─ README.md

yaml
Copy code

---

## Setup & Run (local)

1. Clone:

```bash
git clone https://github.com/<your-username>/weather-api-app.git
cd weather-api-app
(Optional) Install a local static server or use VS Code Live Server.

Open index.html in the browser (or run the live server).

Add your OpenWeather API key in script.js:

js
Copy code
const API_KEY = "YOUR_OPENWEATHER_API_KEY";
Usage
Type a city name and press Enter or click Search.

Loading state displays while the API request runs.

On success: city name, current temperature, "feels like", description, humidity, wind speed, and pressure are shown.

On failure: a friendly error message is displayed.

What I learned
Integrating third-party REST APIs with fetch and async/await

UX for asynchronous data (loading/error states)

Utility-first styling with Tailwind CSS

Small performance and accessibility improvements

Future Improvements
5-day forecast + hourly breakdown

Geolocation-based default city

Dark/light theme toggle

Deploy to GitHub Pages or Netlify and attach live demo link
```
