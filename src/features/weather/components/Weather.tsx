import React from 'react';
import WeatherIcon from './WeatherIcon';
import { WeatherApiResponse } from '../../../../api/types/weatherTypes';
import withWeatherData from './withWeatherApi';

const Weather: React.FC<WeatherApiResponse> = ({
  type, city, temp,
}) => (
  <div>
    <h2 style={{ marginBottom: 0 }}>
      {city}, {temp}° <WeatherIcon type={type} />
    </h2>
  </div>
);

export default withWeatherData(Weather);
