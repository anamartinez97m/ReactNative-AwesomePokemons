import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import i18n from './i18n/i18n';
import Settings from './Settings';
import { FlatList, SectionList, Text, TouchableOpacity, View } from 'react-native';
import styles from './Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

function HomeScreen() {
	const [languageFromCache, setLanguageFromCache] = useState('');
	const [isLoading, setLoading] = useState(true);
	const [categoryData, setCategoryData] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const sectionData: any = [];
	
	const getPokemonTypes = async () => {
		try {
			setLoading(true);
			const response = await fetch('https://pokeapi.co/api/v2/type/');
			const json = await response.json();
			await Promise.all(json.results.map(async (element: any) => {
				const regex = new RegExp('\\/\\d+');
				const elementId = (element.url.match(regex)).toString().slice(1);
				
 				sectionData.push({
					id: elementId,
					title: element.name, 
					data: await getPokemonsByCategoryId(elementId)
				});
 			}));

			setCategoryData(json && json.results ? sectionData : []);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	const getPokemonsByCategoryId = async (categoryId: any) => {
		try {
			const subsectionData: any = [];
			let dataIds: number[] = [];

			const response = await fetch('https://pokeapi.co/api/v2/type/' + categoryId);
			const json = await response.json();
			json.pokemon.forEach((element: any, index: any) => {
				if(index < 10) {
					const regex = new RegExp('\\/\\d+');
					const elementId = (element.pokemon.url.match(regex)).toString().slice(1);
					dataIds.push(elementId);
					if (json.pokemon.length !== 0 && subsectionData.length <= 10) {
						subsectionData.push(capitalizeFirstLetter(element.pokemon.name));
					}
				}
			});

			return subsectionData;
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		AsyncStorage.getItem('language').then(async (value) => {
			setLanguageFromCache(value ? value : '');
			getPokemonTypes();
		});
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
		const backgroundColor = item === selectedItem ? "#6e3b6e" : "#fff";
		const color = item === selectedItem ? 'white' : 'black';
		return (
		  	<Item
				item={item}
				onPress={() => setSelectedItem(item)}
				backgroundColor={{ backgroundColor }}
				textColor={{ color }}
		  	/>
		);
	};
	
	const renderHeader = ({ section }: any) => {
		const backgroundColor = section.id === selectedCategory ? "#6e3b6e" : "#fff";
		const color = section.id === selectedCategory ? 'white' : 'black';
		return (
			<>
				<HeaderItem
					section={section}
					onPress={() => setSelectedCategory(section.id)}
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
				sections={categoryData}
				keyExtractor={(index) => index}
				renderSectionHeader={renderHeader}
				renderItem={() => {return null;}}
			/>
		</View>
	);
}

function capitalizeFirstLetter(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export const BottomTabNavigator = () => {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = '';
        
                    if (route.name === i18n.t('home')) {
                    	iconName = focused ? 'information-circle' : 'information-circle-outline';
                    } else if (route.name === i18n.t('settings')) {
                    	iconName = 'list';
                    }
        
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'purple',
                tabBarInactiveTintColor: 'gray',
                })
            }
        >
            <Tab.Screen name={i18n.t('home')} component={HomeScreen} />
            <Tab.Screen name={i18n.t('settings')} component={Settings} />
        </Tab.Navigator>
    );
};