import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// TODO: not working
// import HomeScreen from './HomeScreen';
import i18n from './i18n/i18n';
import Settings from './Settings';
import { FlatList, SafeAreaView, SectionList, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import styles from './Styles';
import { Home } from './Home';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

function HomeScreen() {
	const [languageFromCache, setLanguageFromCache] = useState('');
	const [isLoading, setLoading] = useState(true);
	const [categoryData, setCategoryData] = useState([]);
	const [pokemonsData, setPokemonsData] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [pokemonImages, setPokemonImages]: any = useState([]);
	const sectionData: any = [];
	const subsectionMap: any = [];
	let subsectionData: any = [];
	
	const getPokemonTypes = async () => {
		try {
			setLoading(true);
			const response = await fetch('https://pokeapi.co/api/v2/type/');
			const json = await response.json();
			// json.results.forEach(async (element: any) => {
			json.results.forEach((element: any) => {
				const regex = new RegExp('\\/\\d+');
				const elementId = (element.url.match(regex)).toString().slice(1);

				// await getPokemonsByCategoryId(elementId);
				// getPokemonsByCategoryId(elementId);
				// console.log(subsectionData);
				
				let elementName = '';
				// if (languageFromCache === 'es') {
				// 	const spanishName = element.names.find((elem: any) => {
				// 		let nameToReturn = '';
				// 		if(elem.language.name === 'es') {
				// 			nameToReturn = elem.name;
				// 		}
				// 		return nameToReturn;
				// 	})
				// 	elementName = spanishName?.name;
				// } else {
					elementName = element.name;
				// }
 				sectionData.push({
					id: elementId,
					title: elementName, 
					// data: subsectionData
					// data: ['hola','hey','hello','hi','holiwi','saludos','good morning','good night','bye']
					data: []
				});
 			});
			setCategoryData(json && json.results ? sectionData : []);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	const openItemsOfSelectedCategory = async (categoryId: number) => {
		setCategoryData(categoryData);
		const element: any = categoryData.find((elem: any) => elem.id === categoryId);
		const newData = await getPokemonsByCategoryId(element);

		console.log(pokemonImages);
		setCategoryData(categoryData);
	}

	const getPokemonsByCategoryId = async (category: any) => {
		try {
			subsectionData = [];
			let dataIds: number[] = [];

			const response = await fetch('https://pokeapi.co/api/v2/type/' + category.id);
			const json = await response.json();
			json.pokemon.forEach((element: any, index: any) => {
				if(index < 10) {
					const regex = new RegExp('\\/\\d+');
					const elementId = (element.pokemon.url.match(regex)).toString().slice(1);
					dataIds.push(elementId);
					if (json.pokemon.length !== 0 && subsectionData.length <= 10) {
						subsectionData.push(element.pokemon);
					}
				}
			});
			console.log('dataids ', dataIds);
			dataIds.forEach(async (id) => {
				const pokemonDetailResponse = await fetch('https://pokeapi.co/api/v2/pokemon/' + id);
				const detailJson = await pokemonDetailResponse.json();
				pokemonImages.push(detailJson.sprites?.other?.home?.front_default);
			});
			setPokemonImages(pokemonImages);

			subsectionData?.forEach((pokemon: any) => {
				category?.data.push(pokemon.name);
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

	// useEffect(() => {
	// 	console.log(categoryData);
	// 	categoryData.forEach((elem: any) => {
			
	// 	});
	// });

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
					onPress={() => {setSelectedCategory(section.id); openItemsOfSelectedCategory(section.id);}}
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
	// return (
	// 	<>
	// 		<StatusBar />
	// 		<SafeAreaView>
	// 			<Home />
	// 		</SafeAreaView>
	// 	</>
	// );
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