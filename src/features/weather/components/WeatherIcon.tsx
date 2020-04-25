import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun, faBolt, faCloudRain, faCloudShowersHeavy, faSnowflake, faCloud, faSmog, faGhost,
} from '@fortawesome/free-solid-svg-icons';
import { WeatherType } from '../../../../api/types/weatherTypes';

type WeatherIcon = {
  type: WeatherType,
};

const getIconByType = (type: WeatherType) => {
  switch (type) {
    case 'Thunderstorm':
      return faBolt;
    case 'Drizzle':
      return faCloudShowersHeavy;
    case 'Rain':
      return faCloudRain;
    case 'Snow':
      return faSnowflake;
    case 'Clear':
      return faSun;
    case 'Clouds':
      return faCloud;
    case 'Atmosphere':
      return faSmog;
    default:
      return faGhost;
  }
};

const WeatherIcon: React.SFC<WeatherIcon> = ({ type }) => (
  <FontAwesomeIcon icon={getIconByType(type)} />
);

export default WeatherIcon;
