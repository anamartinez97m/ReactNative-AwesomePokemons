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
	TouchableOpacity,
	useColorScheme,
	View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// TODO: not working
// import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';

function HomeScreen() {
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [selected, setSelected] = useState(null);
	// const sectionData: { title: string; data: string[]; }[] = [];
	const sectionData: any = [];

	const getPokemonTypes = async () => {
		try {
			const response = await fetch('https://pokeapi.co/api/v2/type/');
			const json = await response.json();
			json.results.forEach((element: any) => {
 				sectionData.push({title: element.name, data: []});
 			});
 			// console.log('sectionData: ', sectionData);
 			console.log('data: ', json.results);
			// setData(json ? json.results : []);
			setData(json && json.results ? sectionData : []);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		getPokemonTypes();
	}, []);

	const Item: React.FunctionComponent<any> = ({ item, onPress, backgroundColor, textColor }) => (
		<TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
			{/* <Text style={[styles.title, textColor]}>{item.name.toUpperCase()}</Text> */}
			<Text style={[styles.title, textColor]}>{item.title}</Text>
		</TouchableOpacity>
	);

	const renderItem = ({ item }: any) => {
		const backgroundColor = item.name === selected ? "#6e3b6e" : "#fff";
		const color = item.name === selected ? 'white' : 'black';
	
		return (
		  <Item
			item={item}
			onPress={() => setSelected(item.name)}
			backgroundColor={{ backgroundColor }}
			textColor={{ color }}
		  />
		);
	  };

	return (
	  	<View style={styles.container}>
			<SectionList
				sections={data}
				keyExtractor={(index) => index}
				renderItem={renderItem}
				renderSectionHeader={({ section: { title } }) => (
					<Text style={styles.header}>{title}</Text>
				)}
			/>
			{/* <FlatList
				data={data}
				keyExtractor={(item: any) => item.name}
				renderItem={ renderItem }
        	/> */}
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
					})
				}
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
		fontSize: 28,
		backgroundColor: "#fff",
		marginVertical: 8
	},
    title: {
        fontSize: 18,
        color: 'black'
    }
});

export default App;
