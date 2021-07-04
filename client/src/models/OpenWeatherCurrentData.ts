import { CurrentWeatherItem } from '../redux/weather/weatherSlice';

const BASE_URL = 'https://openweathermap.org';

class OpenWeatherCurrentData implements CurrentWeatherItem {
	units: string;
	coord: { lon: number; lat: number };
	weather: [{ id: number; main: string; description: string; icon: string }];
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
	wind: { speed: number; deg: number; gust: number };
	clouds: { all: number };
	dt: number;
	sys: { type: number; id: number; country: string; sunrise: number; sunset: number };
	timezone: number;
	id: number;
	name: string;
	cod: number;

	constructor(props: CurrentWeatherItem) {
		this.units = props.units;
		this.coord = props.coord;
		this.weather = props.weather;
		this.base = props.base;
		this.main = props.main;
		this.visibility = props.visibility;
		this.wind = props.wind;
		this.clouds = props.clouds;
		this.dt = props.dt;
		this.sys = props.sys;
		this.timezone = props.timezone;
		this.id = props.id;
		this.name = props.name;
		this.cod = props.cod;
	}

	get iconURL() {
		const { weather } = this;
		if (!weather.length) {
			return '';
		}

		const [firstItem] = weather;
		const { icon } = firstItem;
		return `${BASE_URL}/img/wn/${icon}@2x.png`;
	}

	get title() {
		const { weather } = this;
		if (!weather.length) {
			return '';
		}

		const [firstItem] = weather;
		const { main } = firstItem;
		return main;
	}
}

export default OpenWeatherCurrentData;
