import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import configureStore from './src/redux/configureStore';
import HomeScreen from './src/screens/home';

const store = configureStore();

const App = () => {
	return (
		<SafeAreaProvider>
			<Provider store={store.store}>
				<PersistGate loading={null} persistor={store.persistor} />
				<HomeScreen />
			</Provider>
		</SafeAreaProvider>
	);
};

export default App;
