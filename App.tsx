/**
 * author: Ana Martínez Montañez
 *
 * @format
 */

import React, { type PropsWithChildren } from 'react';
import {
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from 'react-native';

import {
	Colors
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from './HomeScreen';
// import SettingsScreen from './SettingsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

function HomeScreen() {
	return (
	  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
		<Text>Home!</Text>
	  </View>
	);
  }
  
function SettingsScreen() {
	return (
	  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
		<Text>Settings!</Text>
	  </View>
	);
}

const Tab = createBottomTabNavigator();

const App = () => {
	const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};

	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName = '';
			
						if (route.name === 'Home') {
							iconName = focused ? 'information-circle' : 'information-circle-outline';
						} else if (route.name === 'Settings') {
							iconName = 'list';
						}
			
						return <Ionicons name={iconName} size={size} color={color} />;
					},
					tabBarActiveTintColor: 'tomato',
					tabBarInactiveTintColor: 'gray',
					})}
			>
				<Tab.Screen name="Home" component={HomeScreen} />
				<Tab.Screen name="Settings" component={SettingsScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({

});

export default App;
