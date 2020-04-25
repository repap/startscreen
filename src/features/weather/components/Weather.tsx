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
        <h2>Weather with Data</h2>
        <ul>
          <li>city: {data.city}</li>
          <li>description: {data.description}</li>
          <li>id: {data.id}</li>
          <li>temp: {data.temp}</li>
          <li>tempMax: {data.tempMax}</li>
          <li>tempMin: {data.tempMin}</li>
          <li>updated: {new Date(data.updated).toLocaleString()}</li>
        </ul>
      </div>
    );
  }
  
  return null;
}

export default Weather;
