import React from 'react';
import { LoadWeatherDataOptions } from '../weatherSlice';
import useApiLoader from '../../../util/useApiLoader';
import mapApiDataToWeatherData from '../helper/mapApiDataToWeatherData';

const getWeatherApiPath = (options: LoadWeatherDataOptions): string => (
  !!options.city ? `/api/weather?city=${options.city}&country=${options.country}` : ''
);

const withWeatherApi = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<LoadWeatherDataOptions> => (props) => {
  const apiPath = getWeatherApiPath(props)
  const { loading, error, data } = useApiLoader(apiPath)

  if (loading) {
    return (<h2>Loading ...</h2>);
  }

  if (error) {
    return (<i>Wetterdaten konntent nicht geladen werden</i>);
  }

  if (data) {
    return <Component {...mapApiDataToWeatherData(data) as P} />
  }

  return null
}

export default withWeatherApi;
