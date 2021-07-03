import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import reducers from './reducers';
import { WeatherState } from './weather/weatherSlice';

export interface RootState {
	weather: WeatherState;
}

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
};

const middlewares = [
	...getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	}),
];

if (__DEV__ && !process.env.JEST_WORKER_ID) {
	const { logger } = require('redux-logger');
	middlewares.push(logger);

	const createDebugger = require('redux-flipper').default;
	middlewares.push(createDebugger());
}

const persistedReducer = persistReducer(persistConfig, reducers);

export default (initialState = {}) => {
	const store = configureStore({
		preloadedState: initialState,
		reducer: persistedReducer,
		middleware: middlewares,
	});
	const persistor = persistStore(store);
	return {
		store,
		persistor,
	};
};
