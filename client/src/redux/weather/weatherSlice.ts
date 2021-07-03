import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../configureStore';

interface WeatherItem {
	coord: {
		lon: number;
		lat: number;
	};
	weather: [
		{
			id: number;
			main: string;
			description: string;
			icon: string;
		},
	];
	base: string;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
	};
	visibility: number;
	wind: {
		speed: number;
		deg: number;
		gust: number;
	};
	clouds: {
		all: number;
	};
	dt: number;
	sys: {
		type: number;
		id: number;
		country: string;
		sunrise: number;
		sunset: number;
	};
	timezone: number;
	id: number;
	name: string;
	cod: number;
}

export interface WeatherState {
	data: WeatherItem[];
}

const initialState: WeatherState = {
	data: [],
};

export const weatherSlice = createSlice({
	name: 'weather',
	initialState,
	reducers: {
		add: (state, action: PayloadAction<WeatherItem>) => {
			state.data.push(action.payload);
		},
	},
});

export const selectData = (state: RootState) => state.weather.data;

// Action creators are generated for each case reducer function
export const { add } = weatherSlice.actions;

export default weatherSlice.reducer;
