import conditions from "./conditions.json";
import { useState, useEffect } from "react";
import { getWeatherByCoords } from "../../api/Weather";
import "./weather.css";

type BinaryBoolean = 0 | 1;

interface weatherResponse {
  current: {
    temp_c: number;
    is_day: BinaryBoolean;
    condition: {
      text: string;
    };
  };
  location: {
    name: string;
  };
}

export function WeatherWidget() {
  const weatherConditions = conditions as Record<string, string>;
  const [weather, setWeather] = useState<weatherResponse>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      const TBILISI_LOCATION = {
        longitude: 44.783333,
        latitude: 41.716667,
      };

      try {
        setLoading(true);
        const position: GeolocationPosition = await new Promise(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          }
        );

        const { coords } = position;

        const response = await getWeatherByCoords(
          coords.latitude,
          coords.longitude
        );

        const data = await response.json();
        setWeather(data);
      } catch {
        const response = await getWeatherByCoords(
          TBILISI_LOCATION.latitude,
          TBILISI_LOCATION.longitude
        );

        const data = await response.json();
        setWeather(data);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const text = weather?.current.condition.text;
  const isDay = weather?.current.is_day;
  const timeOfDay = !!isDay ? "day" : "night";
  const temp = `${weather?.current.temp_c}º`;
  const condition = `${text}__${timeOfDay}`;
  const url = `../assets/${weatherConditions[condition]}.svg`;

  if (loading)
    return (
      <div className="weather">
        Looking for weather in your location...
        <img src="../assets/Sunny.svg" alt="" className="spinner" />
      </div>
    );
  return (
    <div className="weather">
      <img src={url} alt="" className="weather__icon" />
      <div className="weather__temp">{temp}</div>
      <div className="weather__city">{weather?.location.name}</div>
    </div>
  );
}
