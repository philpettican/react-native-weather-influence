const BASE_URL = 'https://api.openweathermap.org';
const API_KEY = '24fcc1002aacf8b258b1af31c65393be';
const UNITS = 'metric';

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

	return responseJson;
};
