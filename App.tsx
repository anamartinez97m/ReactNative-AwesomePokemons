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
	const sectionData: any = [];

	const getPokemonTypes = async () => {
		try {
			const response = await fetch('https://pokeapi.co/api/v2/type/');
			const json = await response.json();
			json.results.forEach((element: any) => {
				const regex = new RegExp('\\/\\d+');
				const elementId = (element.url.match(regex)).toString().slice(1);
 				sectionData.push({
					id: elementId,
					title: element.name, 
					data: ['hola','hey','hello','hi','holiwi','saludos','good morning','good night','bye']
				});
 			});
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
			<Text style={[styles.title, textColor]}>{item}</Text>
		</TouchableOpacity>
	);

	const HeaderItem: React.FunctionComponent<any> = ({ section, onPress, backgroundColor, textColor }) => (
		<TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
			<Text style={[styles.header, textColor]}>{section.title.toUpperCase()}</Text>
		</TouchableOpacity>
	);

	const renderItem = ({ item }: any) => {
		const backgroundColor = item === selected ? "#6e3b6e" : "#fff";
		const color = item === selected ? 'white' : 'black';
	
		return (
		  	<Item
				item={item}
				onPress={() => setSelected(item)}
				backgroundColor={{ backgroundColor }}
				textColor={{ color }}
		  	/>
		);
	};

	const renderHeader = ({ section }: any) => {
		const backgroundColor = section.id === selected ? "#6e3b6e" : "#fff";
		const color = section.id === selected ? 'white' : 'black';
	
		return (
			<>
				<HeaderItem
					section={section}
					onPress={() => setSelected(section.id)}
					backgroundColor={{ backgroundColor }}
					textColor={{ color }}
				/>
				<FlatList
					horizontal
					data={section.data}
					renderItem={renderItem}
					showsHorizontalScrollIndicator={false}
				/>
			</>
		);
	};

	return (
	  	<View style={styles.container}>
			<SectionList
				sections={data}
				keyExtractor={(index) => index}
				renderSectionHeader={renderHeader}
				renderItem={({ item, section }) => {
					return null;
				}}
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
					tabBarActiveTintColor: 'purple',
					tabBarInactiveTintColor: 'gray',
					})
				}
			>
				<Tab.Screen name="Homee" component={HomeScreen} />
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
        marginVertical: 8,
		marginRight: 4
    },
	header: {
		fontSize: 24,
		marginVertical: 8
	},
    title: {
        fontSize: 18,
        color: 'black'
    }
});

export default App;
