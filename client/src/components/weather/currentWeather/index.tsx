import React from 'react';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Card, Icon } from 'react-native-elements';

type WeatherProps = {
	weatherTitle: string;
	iconURL: string;
	temp: number;
	tempMin: number;
	tempMax: number;
	feelsLike: number;
	locationName: string;
	dateTime: Date;
	containerStyle?: ViewStyle;
	onRefresh?: () => void;
};

const CurrentWeather = (props: WeatherProps) => {
	const {
		weatherTitle,
		iconURL,
		locationName,
		temp,
		dateTime,
		tempMin,
		tempMax,
		feelsLike,
		containerStyle,
		onRefresh,
	} = props;

	return (
		<Card containerStyle={StyleSheet.flatten([styles.cardContainerStyle, containerStyle])}>
			<Text style={styles.titleStyle}>Current Weather</Text>
			<View>
				<View style={[styles.row, { alignItems: 'center' }]}>
					<Icon type="ionicon" name="location" color="white" />
					<Text style={styles.textStyle}>{locationName}</Text>
				</View>
				<Text style={styles.textStyle}>
					{dateTime.toDateString()} {dateTime.toLocaleTimeString()}
				</Text>
			</View>
			<View style={styles.row}>
				<View style={[styles.row, { flex: 1, alignItems: 'center' }]}>
					<Image source={{ uri: iconURL }} style={styles.imageStyle} />
					<Text style={styles.textStyle}>{temp} °</Text>
				</View>
				<View style={{ flex: 1, alignItems: 'flex-end' }}>
					<Text style={styles.textStyle}>{weatherTitle}</Text>
					<Text style={styles.textStyle}>
						{tempMin} ° / {tempMax} °
					</Text>
					<Text style={styles.textStyle}>Feels like {feelsLike} °</Text>
				</View>
			</View>
			{onRefresh && (
				<Icon
					type="material"
					name="refresh"
					color="white"
					style={styles.refreshIconStyle}
					onPress={onRefresh}
				/>
			)}
		</Card>
	);
};

const styles = StyleSheet.create({
	cardContainerStyle: {
		borderRadius: 10,
		backgroundColor: '#2A2D34',
	},
	titleStyle: {
		textAlign: 'center',
		color: 'white',
		fontSize: 23,
	},
	row: {
		flexDirection: 'row',
	},
	textStyle: {
		color: 'white',
	},
	refreshIconStyle: {
		alignItems: 'flex-end',
	},
	imageStyle: {
		width: 35,
		height: 50,
	},
});

export default CurrentWeather;
