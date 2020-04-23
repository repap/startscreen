import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface ApiResponse {
  data: object | null,
  error: object | null,
}

interface WeatherState {
  weather: ApiResponse,
}

const initialState: WeatherState = {
  weather: {
    data: null,
    error: null,
  },
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<ApiResponse>) => {
      state.weather = action.payload;
    },
  }
});

// public
// export const {} = weatherSlice.actions;

// private
const { addData } = weatherSlice.actions;

const getCityHelper = (city: string) => !!city ? `city=${city}` : ''

export const loadWeatherData = (city: string = ''): AppThunk => async (dispatch) => {
  const response: ApiResponse = await fetch(`/api/weather?${getCityHelper(city)}`)
    .then(res => res.json())
    .then( data => ({ error: null, data }))
    .catch(err => {
      console.error(err)
      return { data: null, error: err };
    });

  
  dispatch(addData(response));
};

// TODO: add weather selector as soon as structure is defined
export const getWeatherData = (state: RootState) => state.weather.weather;

export default weatherSlice.reducer;
