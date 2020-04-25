import {WeatherData} from '../weatherSlice';
export default (data: WeatherData):WeatherData => ({
  updated: data.updated,
  id: data.id,
  description: data.description,
  temp: Math.round(data.temp),
  tempMin: Math.round(data.tempMin),
  tempMax: Math.round(data.tempMax),
  city: data.city,
});
