/**
 * author: Ana Martínez Montañez
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
	FlatList,
	Image,
	SafeAreaView,
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
import { createStackNavigator } from '@react-navigation/stack';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
// TODO: not working
// import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import I18n from './i18n/i18n';
import styles from './Styles';
import { UserLogin } from './UserLogin';
import { UserRegistration } from './UserRegistration';
// import BottomTabNavigator from './BottomTabNavigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                // tabBarIcon: ({ focused, color, size }) => {
                    // let iconName = '';
        
                    // if (route.name === 'Home') {
                    // 	iconName = focused ? 'information-circle' : 'information-circle-outline';
                    // } else if (route.name === 'Settings') {
                    // 	iconName = 'list';
                    // }
        
                    // return <Ionicons name='list' size={size} color={color} />;
                // },
                tabBarActiveTintColor: 'purple',
                tabBarInactiveTintColor: 'gray',
                })
            }
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name={I18n.t('settings')} component={SettingsScreen} />
        </Tab.Navigator>
    );
};

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

function UserRegistrationScreen() {
	return (
	  <>
		<StatusBar />
		<SafeAreaView>
		  <UserRegistration />
		</SafeAreaView>
	  </>
	);
}

function UserLogInScreen() {
	return (
	  <>
		<StatusBar />
		<SafeAreaView>
		  <UserLogin />
		</SafeAreaView>
	  </>
	);
  }

const Stack = createStackNavigator();

const App = () => {
	const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Login" component={UserLogInScreen} />
        		<Stack.Screen name="Register" component={UserRegistrationScreen} />
				<Stack.Screen name="TabNavigator" component={BottomTabNavigator} />
      		</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
