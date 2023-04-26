const conditions = require("./conditions.json");
import "./weather.css";
//@ts-ignore
function importAll(r) {
  return r.keys().map(r);
}

//@ts-ignore
const images = importAll(
  //@ts-ignore
  require.context("../assets", false, /\.(png|jpe?g|svg)$/)
);

async function getWeather(): Promise<Response> {
  const API_KEY = "83e5e9c8d32f4ce984b134333231604";
  const WEATHER_URL = "http://api.weatherapi.com/v1/current.json";

  const getWeatherForUserLocation = async (position: GeolocationPosition) => {
    const coords = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
    if (!localStorage.getItem("geo")) {
      localStorage.setItem("geo", JSON.stringify(coords));
    }
    return fetch(
      `${WEATHER_URL}?key=${API_KEY}&q=${coords.latitude},${coords.longitude}&aqi=no`
    );
  };
  const getWeatherForDefaultLocation = async () => {
    const TBILISI_LOCATION = {
      longitude: 44.783333,
      latitude: 41.716667,
    };
    return fetch(
      `${WEATHER_URL}?key=${API_KEY}&q=${TBILISI_LOCATION.latitude},${TBILISI_LOCATION.longitude}&aqi=no`
    );
  };
  if (localStorage.getItem("geo")) {
    const coords = JSON.parse(localStorage.getItem("geo"));
    return fetch(
      `${WEATHER_URL}?key=${API_KEY}&q=${coords.latitude},${coords.longitude}&aqi=no`
    );
  }
  return new Promise((resolve, reject) => {
    navigator.geolocation.watchPosition(
      async (position: GeolocationPosition) => {
        const weatherData = await getWeatherForUserLocation(position);
        resolve(weatherData);
      },
      async (error: GeolocationPositionError) => {
        const weatherData = await getWeatherForDefaultLocation();
        resolve(weatherData);
      }
    );
  });
}

export async function WeatherWidget() {
  const widgetWrapper = document.createElement("div");

  const city = document.createElement("div");
  city.classList.add("weather__city");

  const icon = document.createElement("img");
  icon.classList.add("weather__icon");
  const temp = document.createElement("div");
  const weatherResponse = await getWeather();
  const weather = await weatherResponse.json();
  const text = weather.current.condition.text;
  const isDay = weather.current.is_day;
  const timeOfDay = !!isDay ? "day" : "night";
  const condition = `${text}__${timeOfDay}`;
  const url = `../assets/${conditions[condition]}.svg`;

  widgetWrapper.classList.add("weather");
  city.innerHTML = weather.location.name;

  icon.src = url;
  temp.innerHTML = `${weather.current.temp_c}º`;
  temp.classList.add("weather__temp");
  widgetWrapper.append(icon, temp, city);
  return widgetWrapper;
}
