import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { ApiResponse, createInitialApiResponseData, fetchApi } from '../../util/api';
import roundTempValues from './helper/roundTempValues';

interface WeatherState {
  apiData: WeatherApiResponse,
};

export interface WeatherData {
  updated: number,
  id: string,
  description: string,
  temp: number,
  tempMin: number,
  tempMax: number,
  city: string,
};

interface WeatherApiResponse extends ApiResponse {
  data: WeatherData | null,
};

const initialState: WeatherState = {
  apiData: createInitialApiResponseData(),
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    fetchSuccess: (state: WeatherState, action: PayloadAction<WeatherData>) => {
      state.apiData.data = roundTempValues(action.payload)
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
