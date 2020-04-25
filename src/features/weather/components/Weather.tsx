import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';

import {
  loadWeatherData, getWeatherData,
} from '../weatherSlice';

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
          {data.city}, {data.temp}° <FontAwesomeIcon icon={faSun} />
        </h2>
        (min: {data.tempMin}° / max: {data.tempMax}°)
      </div>
    );
  }
  
  return null;
}

export default Weather;
