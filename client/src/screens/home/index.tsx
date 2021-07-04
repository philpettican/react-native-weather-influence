import React from 'react';
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Geolocation from 'react-native-geolocation-service';
import { useDispatch, useSelector } from 'react-redux';

import { getCurrentWeatherByCoordinates } from '../../api/weather/openWeatherMap';
import CurrentWeather from '../../components/weather/currentWeather';
import { selectLatestWeather, add } from '../../redux/weather/weatherSlice';
import { useMountEffect } from '../../hooks';
import OpenWeatherCurrentData from '../../models/OpenWeatherCurrentData';

const HomeScreen = () => {
	const isDarkMode = useColorScheme() === 'dark';

	const dispatch = useDispatch();

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
		flex: 1,
	};

	const latestWeather = useSelector(selectLatestWeather);
	console.log('latestWeather', latestWeather);
	const openWeatherCurrentData = latestWeather ? new OpenWeatherCurrentData(latestWeather) : null;

	const getCurrentPositionAndSaveLocally = () => {
		Geolocation.getCurrentPosition(
			position => {
				console.log(position);
				const { coords } = position;
				const { latitude, longitude } = coords;
				getCurrentWeatherByCoordinates(latitude, longitude).then(currentWeatherResponse => {
					console.log('getCurrentWeatherByCoordinates', currentWeatherResponse);
					dispatch(add(currentWeatherResponse));
				});
			},
			error => {
				// See error code charts below.
				console.log(error.code, error.message);
			},
			{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
		);
	};

	useMountEffect(() => {
		getCurrentPositionAndSaveLocally();
	});

	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
			<View style={styles.headerContainerStyle}>
				<Text style={styles.headerTextStyle}>Weather Influence</Text>
			</View>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={backgroundStyle}
				contentContainerStyle={styles.contentContainerStyle}
			>
				{openWeatherCurrentData && (
					<CurrentWeather
						weatherTitle={openWeatherCurrentData.title}
						iconURL={openWeatherCurrentData.iconURL}
						locationName={openWeatherCurrentData.name}
						temp={Math.round(openWeatherCurrentData.main.temp)}
						dateTime={new Date(openWeatherCurrentData.dt * 1000)}
						tempMin={Math.round(openWeatherCurrentData.main.temp_min)}
						tempMax={Math.round(openWeatherCurrentData.main.temp_max)}
						feelsLike={Math.round(openWeatherCurrentData.main.feels_like)}
						onRefresh={getCurrentPositionAndSaveLocally}
					/>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	headerContainerStyle: {
		borderBottomWidth: 1,
		borderBottomColor: 'black',
		marginBottom: 5,
	},
	headerTextStyle: {
		fontSize: 24,
		textAlign: 'center',
		borderBottomWidth: 10,
		borderBottomColor: 'black',
	},
	contentContainerStyle: {
		flex: 1,
	},
});

export default HomeScreen;
