import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadWeatherData, getWeatherData,
} from '../weatherSlice';

const Weather: React.SFC = () => {
  const dispatch = useDispatch();
  const { data, error, loading } = useSelector(getWeatherData);

  useEffect(() => {
    if (!data) {
      dispatch(loadWeatherData());
    }
  }, [data, dispatch])

  if (loading) {
    return (<div>Weather Loading</div>);
  }

  if (error) {
    return (<div>Weather Error</div>);
  }
  
  if (data) {
    return (<div>Weather with Data</div>);
  }
  
  return null;
}

export default Weather;
