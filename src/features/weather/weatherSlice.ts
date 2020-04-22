import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';

interface WeatherState {
}

const initialState: WeatherState = {
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
});

// export const {} = weatherSlice.actions;

export const loadWeatherData = (): AppThunk => dispatch => {
  // TODO: add weather data loader
};

// TODO: add weather selector as soon as structure is defined
// export const getWeatherData = (state: RootState) => state.weather.data;

export default weatherSlice.reducer;
