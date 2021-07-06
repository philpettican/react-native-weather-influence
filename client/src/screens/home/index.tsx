import React from 'react';
import {
	Alert,
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
import { Button, Header } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import { getCurrentWeatherByCoordinates } from '../../api/weather/openWeatherMap';
import CurrentWeather from '../../components/weather/currentWeather';
import CPU from '../../components/cpu';
import { selectLatestWeather, add, removeAll } from '../../redux/weather/weatherSlice';
import { useMountEffect } from '../../hooks';
import OpenWeatherCurrentData from '../../models/OpenWeatherCurrentData';

const geoLocationOptions = {
	enableHighAccuracy: true,
	timeout: 15000,
	maximumAge: 10000,
};

const HomeScreen = () => {
	const isDarkMode = useColorScheme() === 'dark';

	const dispatch = useDispatch();

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
		flex: 1,
	};

	const latestWeather = useSelector(selectLatestWeather);
	const openWeatherCurrentData = latestWeather ? new OpenWeatherCurrentData(latestWeather) : null;

	const getCurrentWeatherFromPosition = (position: Geolocation.GeoPosition) => {
		console.log(position);
		const { coords } = position;
		const { latitude, longitude } = coords;
		getCurrentWeatherByCoordinates(latitude, longitude).then(currentWeatherResponse => {
			dispatch(add(currentWeatherResponse));
		});
	};

	const handleCurrentPositionError = (error: Geolocation.GeoError) => {
		console.log(error.code, error.message);
		Alert.alert('Error', error.message);
	};

	const getCurrentPositionAndWeather = () => {
		Geolocation.getCurrentPosition(
			getCurrentWeatherFromPosition,
			handleCurrentPositionError,
			geoLocationOptions,
		);
	};

	useMountEffect(() => {
		getCurrentPositionAndWeather();
	});

	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
			<Header
				centerComponent={<Text style={styles.headerTextStyle}>Weather Influence</Text>}
				containerStyle={styles.headerContainerStyle}
			/>
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
						onRefresh={getCurrentPositionAndWeather}
					/>
				)}
				<CPU temperature={30} />
				<CPU temperature={50} />
				<CPU temperature={70} />
				<View style={styles.row}>
					<Button
						title="Refresh"
						onPress={() => getCurrentPositionAndWeather()}
						containerStyle={styles.actionButtonContainerStyle}
					/>
					<Button
						title="Clear Data"
						onPress={() => dispatch(removeAll())}
						containerStyle={styles.actionButtonContainerStyle}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	headerContainerStyle: {
		borderBottomWidth: 1,
		borderBottomColor: 'black',
		marginBottom: 5,
		backgroundColor: 'white',
	},
	headerTextStyle: {
		fontSize: 24,
		textAlign: 'center',
	},
	contentContainerStyle: {
		flex: 1,
	},
	row: {
		flexDirection: 'row',
	},
	actionButtonContainerStyle: {
		flex: 1,
		padding: 5,
	},
});

export default HomeScreen;
