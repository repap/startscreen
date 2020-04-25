import { WeatherApiResponse } from '../../../../api/types/weatherTypes';

export default (data: any): WeatherApiResponse => ({
  updated: data.updated,
  type: data.type,
  description: data.description,
  temp: Math.round(data.temp),
  tempMin: Math.round(data.tempMin),
  tempMax: Math.round(data.tempMax),
  city: data.city,
});
