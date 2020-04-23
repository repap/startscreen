import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { ApiResponse, createInitialApiResponseData, fetchApi } from '../../util/api';

interface WeatherState {
  data: ApiResponse,
};

const initialState: WeatherState = {
  data: createInitialApiResponseData(),
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    fetchSuccess: (state: WeatherState, action: PayloadAction<object>) => {
      state.data.data = action.payload
    },
    fetchError: (state: WeatherState, action: PayloadAction<Error>) => {
      state.data.error = action.payload
    },
    setLoading: (state: WeatherState, action: PayloadAction<boolean>) => {
      state.data.loading = action.payload
    },
  }
});

// public actions
// export const {} = weatherSlice.actions;

// private actions
const { fetchSuccess, fetchError, setLoading } = weatherSlice.actions;

const getCityHelper = (city: string) => !!city ? `city=${city}` : ''

export const loadWeatherData = (city: string = ''): AppThunk => fetchApi(
  `/api/weather?${getCityHelper(city)}`,
  setLoading, fetchError, fetchSuccess,
);

export const getWeatherData = (state: RootState) => state.weather.data;

export default weatherSlice.reducer;
