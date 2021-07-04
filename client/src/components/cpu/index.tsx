import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Icon } from 'react-native-elements';

const TEMPERATURE_ZONES = {
	low: 30,
	medium: 50,
	high: 70,
};

const TEMPERATURE_ZONE_BACKGROUND_COLORS = {
	low: '#5C946E',
	medium: '#E59400',
	high: '#C01025',
};

const TEMPERATURE_ZONE_FOREGROUND_COLORS = {
	low: 'white',
	medium: 'black',
	high: 'white',
};

type CPUProps = {
	temperature: number;
};

const getBackgroundColor = (temperature: number) => {
	if (temperature >= TEMPERATURE_ZONES.high) {
		return TEMPERATURE_ZONE_BACKGROUND_COLORS.high;
	}

	if (temperature >= TEMPERATURE_ZONES.medium) {
		return TEMPERATURE_ZONE_BACKGROUND_COLORS.medium;
	}

	return TEMPERATURE_ZONE_BACKGROUND_COLORS.low;
};

const getForegroundColor = (temperature: number) => {
	if (temperature >= TEMPERATURE_ZONES.high) {
		return TEMPERATURE_ZONE_FOREGROUND_COLORS.high;
	}

	if (temperature >= TEMPERATURE_ZONES.medium) {
		return TEMPERATURE_ZONE_FOREGROUND_COLORS.medium;
	}

	return TEMPERATURE_ZONE_FOREGROUND_COLORS.low;
};

const CPU = (props: CPUProps) => {
	const { temperature } = props;
	const backgroundColor = getBackgroundColor(temperature);
	const textColor = getForegroundColor(temperature);

	return (
		<Card containerStyle={StyleSheet.flatten([styles.cardContainerStyle, { backgroundColor }])}>
			<Text style={StyleSheet.flatten([styles.titleStyle, { color: textColor }])}>
				CPU Temperature
			</Text>
			<View style={StyleSheet.flatten([styles.row, { justifyContent: 'center' }])}>
				<Icon type="font-awesome-5" name="temperature-low" color={textColor} />
				<Text style={StyleSheet.flatten([styles.temperatureTextStyle, { color: textColor }])}>
					{temperature} °
				</Text>
			</View>
		</Card>
	);
};

const styles = StyleSheet.create({
	cardContainerStyle: {
		borderRadius: 10,
	},
	titleStyle: {
		textAlign: 'center',
		fontSize: 22,
		marginBottom: 5,
	},
	row: {
		flexDirection: 'row',
	},
	temperatureTextStyle: {
		fontSize: 25,
		paddingLeft: 5,
	},
});

export default CPU;
