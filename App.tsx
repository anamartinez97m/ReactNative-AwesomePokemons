/**
 * author: Ana Martínez Montañez
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
	FlatList,
	SectionList,
	SectionListRenderItem,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { HomeScreen } from './HomeScreen';
import { SettingsScreen } from './SettingsScreen';

function HomeScreen() {
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	const sectionData: { title: string; data: string[]; }[] = [{title: 'hola', data: []}];

	const getPokemonTypes = async () => {
		try {
			const response = await fetch('https://pokeapi.co/api/v2/type/');
			const json = await response.json();
			json.results.forEach((element: any) => {
 				sectionData.push({title: element.name, data: []});
 			});
 			console.log('sectionData: ', sectionData);
			setData(json ? json.results : []);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}
	useEffect(() => {
		getPokemonTypes();
	}, []);
	const Item: React.FunctionComponent<any> = ({ title }) => (
		<View style={styles.item}>
		  <Text style={styles.title}>{title.toUpperCase()}</Text>
		</View>
	);
	return (
	  	<View style={styles.container}>
			{/* <SectionList
				sections={sectionData}
				keyExtractor={(index) => index}
				renderItem={({ item }) => <Item title={item} />}
				renderSectionHeader={({ section: { title } }) => (
					<Text style={styles.header}>{title}</Text>
				)}
			/> */}
			<FlatList
				data={data}
				keyExtractor={(item: any) => item.name}
				renderItem={({ item }) => (
					<Item
						title={item.name}
					/>
				)}
        	/>
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
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        paddingBottom: 5,
        marginHorizontal: 16
    },
    item: {
        backgroundColor: '#fff',
        padding: 5,
        marginVertical: 8
    },
    title: {
        fontSize: 18,
        color: 'black'
    }
});

export default App;
