import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, useColorScheme } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { Provider } from 'react-redux';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import configureStore from './src/redux/configureStore';
import { getCurrentWeatherByCoordinates } from './src/api/weather/openWeatherMap';

const store = configureStore();

const App = () => {
	const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};

	useEffect(() => {
		Geolocation.getCurrentPosition(
			position => {
				console.log(position);
				const { coords } = position;
				const { latitude, longitude } = coords;
				getCurrentWeatherByCoordinates(latitude, longitude).then(weatherResponse => {
					console.log('getCurrentWeatherByCoordinates', weatherResponse);
				});
			},
			error => {
				// See error code charts below.
				console.log(error.code, error.message);
			},
			{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
		);
	}, []);

	return (
		<Provider store={store.store}>
			<SafeAreaView style={backgroundStyle}>
				<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
				<ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}></ScrollView>
			</SafeAreaView>
		</Provider>
	);
};

export default App;
