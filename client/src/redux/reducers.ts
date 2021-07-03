import { combineReducers } from '@reduxjs/toolkit';

import weather from './weather/weatherSlice';

export default combineReducers({
	weather,
});
