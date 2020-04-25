export type WeatherType = (
  'Thunderstorm' | 'Drizzle' | 'Rain' | 'Snow' | 'Clear' | 'Clouds' | 'Atmosphere' | null
);

export type WeatherApiResponse = {
  updated: string,
  type: WeatherType,
  description: string,
  temp: number,
  tempMin: number,
  tempMax: number,
  city: string,
};

export type WeatherErrorResponse = {
  message: string
  name: string
  data: string
  status: number
  statusText: string
}