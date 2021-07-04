import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../configureStore';
import { CurrentWeatherResponse } from '../../api/weather/openWeatherMap';

const LOCAL_STORAGE_LIMIT = 100;

export interface CurrentWeatherItem extends CurrentWeatherResponse {
	units: string;
}

export interface WeatherState {
	data: CurrentWeatherItem[];
}

const initialState: WeatherState = {
	data: [],
};

export const weatherSlice = createSlice({
	name: 'weather',
	initialState,
	reducers: {
		add: (state, action: PayloadAction<CurrentWeatherItem>) => {
			if (state.data.length === LOCAL_STORAGE_LIMIT) {
				state.data.shift();
			}

			state.data.push(action.payload);
		},
	},
});

export const selectData = (state: RootState) => state.weather.data;

export const selectLatestWeather = (state: RootState) => {
	const data = selectData(state);
	if (!data.length) {
		return null;
	}

	return data[data.length - 1];
};

// Action creators are generated for each case reducer function
export const { add } = weatherSlice.actions;

export default weatherSlice.reducer;
