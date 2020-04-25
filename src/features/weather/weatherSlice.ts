import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { ApiResponse, createInitialApiResponseData, fetchApi } from '../../util/api';
import mapApiDataToWeatherData from './helper/mapApiDataToWeatherData';
import { WeatherType } from '../../../api/types/weatherTypes';

export type WeatherApiResponse = {
  updated: Date,
  type: WeatherType,
  description: string,
  temp: number,
  tempMin: number,
  tempMax: number,
  city: string,
};

interface WeatherData extends ApiResponse {
  data: WeatherApiResponse | null,
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

const getCityHelper = (
  city: string, country: string
): string => (
    !!city ? `city=${city}&country=${country}` : ''
);

export const loadWeatherData = (
  city: string = '', country: string= ''
): AppThunk => fetchApi(
  `/api/weather?${getCityHelper(city, country)}`,
  setLoading, fetchError, fetchSuccess,
);

export const getWeatherData = (state: RootState) => state.weather.apiData;

export default weatherSlice.reducer;
