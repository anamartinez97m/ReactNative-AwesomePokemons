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

import {
	Colors
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// const DATA = [
// 	{
// 	  title: "Main dishes",
// 	  data: ["Pizza", "Burger", "Risotto"]
// 	},
// 	{
// 	  title: "Sides",
// 	  data: ["French Fries", "Onion Rings", "Fried Shrimps"]
// 	},
// 	{
// 	  title: "Drinks",
// 	  data: ["Water", "Coke", "Beer"]
// 	},
// 	{
// 	  title: "Desserts",
// 	  data: ["Cheese Cake", "Ice Cream"]
// 	}
// ];

function HomeScreen() {
	// const getPokemonTypes = async () => {
	// 	try {
	// 		const response = await fetch('https://pokeapi.co/api/v2/type/');
	// 		const json = await response.json();
	// 		console.log('json: ', json);
	// 		return json.results;
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };
	// console.log('pokemontypes', getPokemonTypes);

	// const getPokemonTypes = () => {
	// 	return fetch('https://pokeapi.co/api/v2/type/')
	// 	  	.then((response) => response.json())
	// 	  	.then((json) => {
	// 			console.log('json: ', json);
	// 			return json.results;
	// 	  	})
	// 	  	.catch((error) => {
	// 			console.error(error);
	// 	  	});
	// };
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	const sectionData: { title: string; data: []; }[] = [];

	const getPokemonTypes = async () => {
		try {
			const response = await fetch('https://pokeapi.co/api/v2/type/');
			const json = await response.json();
			// console.log(json.results);
			// console.log(json.results.length)
			json.results.forEach((element: any) => {
				sectionData.push({title: element.name, data: []});				
			});
			console.log('sectionData: ', sectionData);
			setData(json.results);
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
		  <Text style={styles.title}>{title}</Text>
		</View>
	);

	return (
	  	<View style={styles.container}>
			<SectionList
				sections={sectionData}
				keyExtractor={(index) => index}
				renderItem={({ item }) => <Item title={item} />}
				renderSectionHeader={({ section: { title } }) => (
					<Text style={styles.header}>{title}</Text>
				)}
			/>
			{/* <FlatList
				data={data}
				keyExtractor={({ id }, index) => id}
				renderItem={({ item }) => (
					<Text>{item.name}</Text>
				)}
        	/> */}
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
	header: {
		fontSize: 30,
	},
	title: {
		fontSize: 18
	}
});

export default App;
