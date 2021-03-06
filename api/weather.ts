import axios from 'axios';
import mapWeatherIdToWeatherType from './helper/mapWeatherIdToWeatherType';
import { WeatherApiResponse, WeatherErrorResponse } from './types/weatherTypes';

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

const fetchWeatherData = (city: string, country: string) => 
  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&lang=de&units=metric&appid=${WEATHER_API_KEY}`);

/*
dt                  ->  Time of data calculation, unix, UTC
weather.id          ->  Weather condition id
                        https://openweathermap.org/weather-conditions
weather.description ->  Weather condition within the group. You can get the output in your language.
                        https://openweathermap.org/current#multi
main.temp           ->  Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
main.temp_min       ->  Minimum temperature at the moment. 
                        This is deviation from current temp that is possible for large cities and megalopolises 
                        geographically expanded (use these parameter optionally). 
                        Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
main.temp_max       ->  Maximum temperature at the moment. 
                        This is deviation from current temp that is possible for large cities and megalopolises 
                        geographically expanded (use these parameter optionally). 
                        Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
*/
const createWeatherType = (data: any): WeatherApiResponse => ({
  updated: new Date(data.dt * 1000).toUTCString(),
  type: mapWeatherIdToWeatherType(data.weather.length ? data.weather[0].id : null),
  description: data.weather.length ? data.weather[0].description : '',
  temp: data.main.temp,
  tempMin: data.main.temp_min,
  tempMax: data.main.temp_max,
  city: data.name,
})

const createError = (error: any): WeatherErrorResponse => ({
  message: error.message,
  name: error.name,
  data: error.response.data,
  status: error.response.status,
  statusText: error.response.statusText,
})

// TODO: Add error handling
export default async (req: any, res: any) => {
  const { city = '', country = '' } = req.query
  try {
    const { data } = await fetchWeatherData(city, country);
    res.json({ data: createWeatherType(data) });
  } catch(error) {
    res.json({ error: createError(error) })
  }
}
