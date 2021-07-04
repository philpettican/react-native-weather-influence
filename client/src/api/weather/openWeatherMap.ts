import { CurrentWeatherItem } from '../../redux/weather/weatherSlice';

const BASE_URL = 'https://api.openweathermap.org';
const API_KEY = '24fcc1002aacf8b258b1af31c65393be';
const UNITS = 'metric';

export interface CurrentWeatherResponse {
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

class WeatherMapError extends Error {
	code;

	constructor(message: string, code: string) {
		super(message);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, WeatherMapError);
		}

		this.name = 'WeatherMapError';
		this.code = code;
	}
}

export const getCurrentWeatherByCoordinates = async (lat: number, long: number) => {
	const response = await fetch(
		`${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=${UNITS}`,
	);
	const responseJson = await response.json();

	if (!response.ok) {
		throw new WeatherMapError(responseJson.message, responseJson.cod);
	}

	responseJson.units = UNITS;

	return responseJson as CurrentWeatherItem;
};
