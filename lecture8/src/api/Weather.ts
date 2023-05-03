export function getWeatherByCoords (latitude: number, longitude: number) : Promise<Response> {
    const API_KEY = "83e5e9c8d32f4ce984b134333231604";
    const WEATHER_URL = "http://api.weatherapi.com/v1/current.json";
    return  fetch(
        `${WEATHER_URL}?key=${API_KEY}&q=${latitude},${longitude}&aqi=no`
      );
}