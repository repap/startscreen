import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { ApiResponse, createInitialApiResponseData, fetchApi } from '../../util/api';
import mapApiDataToWeatherData from './helper/mapApiDataToWeatherData';
import { WeatherApiResponse } from '../../../api/types/weatherTypes';

export interface WeatherData extends ApiResponse {
  data: WeatherApiResponse | null,
};

export type LoadWeatherDataOptions = {
  city?: string,
  country?: string,
};

type WeatherState = {
  apiData: WeatherData,
};

const initialState: WeatherState = {
  apiData: createInitialApiResponseData(),
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    fetchSuccess: (state: WeatherState, action: PayloadAction<WeatherApiResponse>) => {
      state.apiData.data = mapApiDataToWeatherData(action.payload)
    },
    fetchError: (state: WeatherState, action: PayloadAction<any>) => {
      state.apiData.error = { ...action.payload }
    },
    setLoading: (state: WeatherState, action: PayloadAction<boolean>) => {
      state.apiData.loading = action.payload
    },
  }
});

// public actions
// export const {} = weatherSlice.actions;

// private actions
const { fetchSuccess, fetchError, setLoading } = weatherSlice.actions;

const getCityHelper = (options: LoadWeatherDataOptions): string => (
    !!options.city ? `city=${options.city}&country=${options.country}` : ''
);

export const loadWeatherData = (options: LoadWeatherDataOptions): AppThunk => fetchApi(
  `/api/weather?${getCityHelper(options)}`,
  setLoading, fetchError, fetchSuccess,
);

export const getWeatherData = (state: RootState) => state.weather.apiData;

export default weatherSlice.reducer;
