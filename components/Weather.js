import { fetchData } from "../utils/api.js";
import { state } from "../utils/state.js";
import { elements } from "../utils/dom.js";
import { showAlert } from "../utils/alert.js";

export const setWeather = async (apiKey = state.get("weatherApiKey", "")) => {
  if (!apiKey) return;
  navigator.geolocation.getCurrentPosition(
    async ({ coords: { latitude, longitude } }) => {
      try {
        const { list, city } = await fetchData(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
        );
        let forecastContainer = elements.weather.querySelector(
          "#forecast-container"
        );
        if (!forecastContainer) {
          forecastContainer = document.createElement("div");
          forecastContainer.id = "forecast-container";
          elements.weather.appendChild(forecastContainer);
        }
        forecastContainer.innerHTML = `<h4>${city.name}</h4>`;
        const sections = document.createElement("div");
        sections.className = "weather-sections";
        forecastContainer.appendChild(sections);
        let dayCount = 0,
          lastDate = null;
        for (const day of list) {
          const date = new Date(day.dt * 1000);
          const dateStr = date.toLocaleDateString("en-US");
          if (lastDate === dateStr || dayCount >= 3) continue;
          lastDate = dateStr;
          const dayName = [
            "Today",
            "Tomorrow",
            date.toLocaleDateString("en-US", { weekday: "long" }),
          ][dayCount];
          const {
            main: { temp },
            weather: [{ description, icon }],
          } = day;
          const section = document.createElement("section");
          section.className = "weather-section";
          section.innerHTML = `
            <p class="day">${dayName}</p>
            <p class="temp">${Math.round(temp)}°C</p>
            <p class="weatherinfo">${description.replace(/^\w/, (c) =>
              c.toUpperCase()
            )}</p>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
          `;
          sections.appendChild(section);
          setTimeout(() => section.classList.add("loaded"), dayCount * 100);
          dayCount++;
        }
      } catch (err) {
        console.error("Weather error:", err);
        showAlert("Could not fetch weather data. Check API key or connection.");
      }
    },
    (err) => {
      console.error("Location error:", err);
      showAlert("Could not get location. Allow location access.");
    }
  );
};

export async function initWeather() {
  if (!elements.weather) {
    console.error("Weather element missing");
    return;
  }
  await setWeather();
}
