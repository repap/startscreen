import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  loadWeatherData, getWeatherData,
} from '../weatherSlice';
import WeatherIcon from './WeatherIcon';

const Weather: React.SFC = () => {
  const dispatch = useDispatch();
  const { data, error, loading } = useSelector(getWeatherData);

  useEffect(() => {
    if (!data) {
      dispatch(loadWeatherData('bremen'));
    }
  }, [data, dispatch])

  if (loading) {
    return (<h2>Weather Loading</h2>);
  }

  if (error) {
    return (<h2>Weather Error</h2>);
  }
  
  if (data) {
    return (
      <div>
        <h2>
          {data.city}, {data.temp}° <WeatherIcon type={data.type} />
        </h2>
        (min: {data.tempMin}° / max: {data.tempMax}°)
      </div>
    );
  }
  
  return null;
}

export default Weather;
