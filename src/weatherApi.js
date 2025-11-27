

const API_KEY = "4263a2ce70fbb1ee2ac565903e9d9d5a"; 
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function getWeatherByCity(city) {
  if (!city) {
    throw new Error("City name is required");
  }

  const url = `${BASE_URL}?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("City not found or API error");
  }

  const data = await response.json();
  return data;
}
