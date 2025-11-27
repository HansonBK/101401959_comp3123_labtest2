// src/App.js
import React, { useState } from "react";
import "./App.css";
import { getWeatherByCity } from "./weatherApi";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await getWeatherByCity(city.trim());
      setWeather(data);
    } catch (err) {
      setError(err.message || "City not found or API error");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const iconCode = weather?.weather?.[0]?.icon;
  const iconUrl = iconCode
    ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    : null;

  return (
    <div className="app">
      <div className="weather-card">
        <header className="weather-header">
          <div>
            <h1 className="app-title">Weather Forecast</h1>
            <p className="app-subtitle">Check current weather by city</p>
          </div>

          <div className="search-container">
            <input
              type="text"
              placeholder="Enter city name (e.g. Toronto)"
              className="search-input"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <button className="search-button" onClick={handleSearch}>
              Search
            </button>
          </div>
        </header>

        {error && <p className="error-text">{error}</p>}
        {loading && <p className="loading-text">Loading...</p>}

        <main className="weather-main">
          <div className="weather-left">
            <p className="weather-day">Today</p>

            <p className="weather-location">
              {weather
                ? `${weather.name}, ${weather.sys.country}`
                : "Search a city to begin"}
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <p className="weather-temp">
                {weather ? `${Math.round(weather.main.temp)}°C` : "--°C"}
              </p>

              {iconUrl && (
                <img
                  src={iconUrl}
                  alt={weather.weather[0].description}
                  className="weather-icon"
                />
              )}
            </div>

            <p className="weather-desc">
              {weather ? weather.weather[0].description : "—"}
            </p>
          </div>

          <div className="weather-right">
            <p className="weather-label">Details</p>
            <div className="weather-details">
              <div className="detail-row">
                <span>Humidity</span>
                <span>
                  {weather ? `${weather.main.humidity}%` : "--"}
                </span>
              </div>
              <div className="detail-row">
                <span>Wind</span>
                <span>
                  {weather ? `${weather.wind.speed} m/s` : "--"}
                </span>
              </div>
              <div className="detail-row">
                <span>Pressure</span>
                <span>
                  {weather ? `${weather.main.pressure} hPa` : "--"}
                </span>
              </div>
              <div className="detail-row">
                <span>Feels like</span>
                <span>
                  {weather
                    ? `${Math.round(weather.main.feels_like)}°C`
                    : "--"}
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
