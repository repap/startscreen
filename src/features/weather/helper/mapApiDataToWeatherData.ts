import { WeatherApiResponse } from '../weatherSlice';
export default (data: WeatherApiResponse): WeatherApiResponse => ({
  updated: data.updated,
  type: data.type,
  description: data.description,
  temp: Math.round(data.temp),
  tempMin: Math.round(data.tempMin),
  tempMax: Math.round(data.tempMax),
  city: data.city,
});
